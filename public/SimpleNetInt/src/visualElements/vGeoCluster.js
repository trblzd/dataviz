const { mat4, vec4, vec3 } = glMatrix;


class VGeoCluster extends VCluster {
    static total = 0;
    static _pixelTarget;
    static _idTarget;
    static geometryCache = {}

    static MAP_SIZE = 0.4;

    static get width() {
        return gp5.width;
    }

    static get height() {
        return gp5.height;
    }

    static get pixelTarget() {
        if (!this._pixelTarget) {
            this._pixelTarget = gp5.createGraphics(this.width, this.height, gp5.WEBGL);
        }
        return this._pixelTarget;
    }

    static get idTarget() {
        if (!this._idTarget) {
            this._idTarget = gp5.createGraphics(this.width, this.height, gp5.WEBGL);
        }
        return this._idTarget;
    }


    static projectMercator(lon, lat, center = gp5.createVector(), scale = 1) {
        const x = 1 / (2 * Math.PI) * lon * (Math.PI / 180);
        const y = 1 / (2 * Math.PI) * (Math.PI - Math.log(Math.tan(Math.PI / 4 + lat * (Math.PI / 180) / 2)));
        return [scale * (x - center.x), scale * (y - center.y)];
    }

    static getBoundingBox(features) {
        let xMin = Infinity;
        let xMax = -Infinity;
        let yMin = Infinity;
        let yMax = -Infinity;

        function traverse(rings) {
            if (rings.length === 0) return;
            for (let [lon, lat] of rings[0]) {
                const [x, y] = VGeoCluster.projectMercator(lon, lat);
                xMin = Math.min(xMin, x);
                xMax = Math.max(xMax, x);
                yMin = Math.min(yMin, y);
                yMax = Math.max(yMax, y);
                yMax = Math.max(yMax, y);
            }
        }

        for (let feature of features) {
            const geom = feature.geometry;
            if (geom.type === 'Polygon') {
                traverse(geom.coordinates);
            } else if (geom.type === 'MultiPolygon') {
                for (const polygon of geom.coordinates) {
                    traverse(polygon);
                }
            }
        }
        return [xMin, xMax, yMin, yMax];
    }

    static getCentroid(geom, center, scale) {
        let numPoints = 0;
        let xSum = 0;
        let ySum = 0;

        function traverse(rings) {
            if (rings.length === 0) return;
            for (let [lon, lat] of rings[0]) {
                const [x, y] = VGeoCluster.projectMercator(lon, lat, center, scale);
                numPoints++;
                xSum += x;
                ySum += y;
            }
        }

        if (geom.type === 'Polygon') {
            traverse(geom.coordinates);
        } else if (geom.type === 'MultiPolygon') {
            for (const polygon of geom.coordinates) {
                traverse(polygon);
            }
        }
        return gp5.createVector(xSum / numPoints, ySum / numPoints);
    }

    /**
     * Creates a shape from coordinates projected on the mercator projection ans stores it in the pixelTarget buffer
     * @param {*} geom 
     * @param {*} center 
     * @param {*} scale 
     */
    static drawShape(geom, center, scale) {
        function traverse(rings) {
            if (rings.length === 0) return;
            VGeoCluster.pixelTarget.beginShape();
            for (let [lon, lat] of rings[0]) {
                const [x, y] = VGeoCluster.projectMercator(lon, lat, center, scale);
                VGeoCluster.pixelTarget.vertex(x, y);
            }
            VGeoCluster.pixelTarget.endShape();
        }

        if (geom.type === 'Polygon') {
            traverse(geom.coordinates);
        } else if (geom.type === 'MultiPolygon') {
            for (const polygon of geom.coordinates) {
                traverse(polygon);
            }
        }
    }

    static computeCentroids(features, center, scale) {
        const index = {};
        for (const feature of features) {
            const geocode = feature.properties.GEOCODIGO;
            index[geocode] = this.getCentroid(feature.geometry, center, scale);
        }
        return index;
    }


    static loadGeometry(url) {
        //console.log("Loading geometry from", url);
        DOM.showMessage(`Loading geometry from\n${url} ...`);
        if (!this.geometryCache[url]) {
            this.geometryCache[url] = new Promise((resolve) => {
                gp5.loadJSON(url, ({ features }) => {
                    const [xMin, xMax, yMin, yMax] = this.getBoundingBox(features);
                    const center = gp5.createVector((xMin + xMax) / 2, (yMin + yMax) / 2);
                    const scale = VGeoCluster.MAP_SIZE * Math.min(this.width / (xMax - xMin), this.height / (yMax - yMin));
                    const centroidByGeocode = this.computeCentroids(features, center, scale);
                    const geometry = VGeoCluster.pixelTarget.buildGeometry(() => {
                        for (let [i, feature] of features.entries()) {
                            VGeoCluster.pixelTarget.noStroke();
                            VGeoCluster.pixelTarget.fill(
                                0, // ((i + 1) >> 16) & 0xff,
                                ((i + 1) >> 8) & 0xff,
                                ((i + 1) >> 0) & 0xff,
                            );
                            this.drawShape(feature.geometry, center, scale);
                        }
                    });
                    resolve({
                        features,
                        centroidByGeocode,
                        geometry,
                    })
                }, (err) => { console.error(err), DOM.showMessage(`Wrong URL\n${url} ...`); });
            });
        }
        return this.geometryCache[url];
    }

    static idBuffer = new Uint8Array(4)
    static selectedLayerId = 0;
    static selectedFeatureId = 0;


    static detectHitAsync() {
        const gl = this.idTarget.drawingContext;
        const sampleCount = 2;
        const x = Canvas._mouse.x * sampleCount
        const y = (VGeoCluster.height - Canvas._mouse.y) * sampleCount;
        const idPBO = gl.createBuffer();
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, idPBO);
        gl.bufferData(gl.PIXEL_PACK_BUFFER, 4, gl.STREAM_READ);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, 0);

        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        const checkSyncStatus = () => {
            switch (gl.clientWaitSync(sync, 0, 0)) {
                case gl.WAIT_FAILED:
                    return;
                case gl.TIMEOUT_EXPIRED:
                    setTimeout(checkSyncStatus, 5);
                    return;
                default:
                    gl.deleteSync(sync);
                    gl.bindBuffer(gl.PIXEL_PACK_BUFFER, idPBO);
                    gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, this.idBuffer);
                    gl.deleteBuffer(idPBO);
                    this.selectedLayerId = this.idBuffer[0] - 1;
                    this.selectedFeatureId = (this.idBuffer[1] << 8) | this.idBuffer[2];
            }
        };
        checkSyncStatus();
    }

    keyAttributeMean = Infinity;
    keyAttributeStdev = -Infinity;
    nodeByGeocode = {};
    centroidByGeocode = {};
    features = [];
    clusterGeometry = null;
    pixelShader = null;
    idShader = null;

    r1 = 10;
    r2 = 15;
    s1 = 5;
    s2 = 1;

    layerGap = 500;
    rotationX = -0.51;
    rotationY = 0.51;
    cameraDistance = 900;

    // tangent of 1/2 vertical field-of-view
    tanHalfFovY = VGeoCluster.height / 2 / this.cameraDistance;


    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();

    palette = gp5.createImage(1, 1);

    /**
     * ************************** constructor **************************
     * @param {Cluster} cluster The cluster object with nodes and edges
     * @param {Number} posX 
     * @param {Number} posY 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Object} palette Retrieved from the ColorFactory collection of palettes
     * @param {String} keyAttribute The attribute of the cluster 
     * @param {String} cartography The URL of the GeoJSON file 
     */
    constructor(cluster, posX, posY, width, height, palette, keyAttribute, cartography) {
        super(cluster, posX, posY, width, height, palette);

        this.index = VGeoCluster.total++;
        this.keyAttribute = keyAttribute;

        this.computeStatistics();

        gp5.loadShader('./src/shader/shader_color.vert', './src/shader/shader.frag', (shader) => {
            this.pixelShader = shader;
        }, console.error)

        gp5.loadShader('./src/shader/shader_id.vert', './src/shader/shader.frag', (shader) => {
            this.idShader = shader;
        }, console.error);

        // TODO: this will be loaded from JSON
        const geoJsonUrl = './files/Cartographies/' + cartography;

        // TODO: this will be loaded from JSON
        const getColorAt = (index) => {
            const palettes = [
                ['#e7f39b', '#c4fa84', '#a0f87e', '#7feb86', '#66ce93', '#59a0a0', '#535ca5'],
                ['#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5'],
                ['#e79bf3', '#c484fa', '#a07ef8', '#7f86eb', '#6693ce', '#59a0a0', '#53a55c'],
            ];
            // const palette = palettes[this.index];
            // return gp5.color(palette[index % palette.length]);

            const paletteName = ColorFactory.brewerNames[index % ColorFactory.brewerNames.length];
            const palette = ColorFactory.getPalette(paletteName);
            // console.log(paletteName)
            // console.log(palette)
            return gp5.color(palette[index % palette.length]);

            // const colorIndex = index % ColorFactory.baseColors.length;
            // const palette = ColorFactory.generateMonochromaticSwatches(ColorFactory.baseColors[colorIndex], 7);
            // const col = ColorFactory.getColor(palette, index)

            // return gp5.color(col);
        }

        VGeoCluster.loadGeometry(geoJsonUrl).then(data => {
            console.log("GEOMETRY LOADED from", geoJsonUrl);
            DOM.hideMessage()

            // store propreties of this VGeoCluster
            this.features = data.features;
            this.centroidByGeocode = data.centroidByGeocode;
            this.clusterGeometry = data.geometry;

            // Get the list of UF from the attributes. Note: UF is the abbreviation of the states in Brazil.
            // This should be the cluster names in the future 
            let UFs = [];
            for (let i = 0; i < this.features.length; ++i) {
                if (!UFs.includes(this.features[i].properties.UF)) {
                    UFs.push(this.features[i].properties.UF);
                }
            }
            // assign a color palete to each UF
            ColorFactory.makeDictionary(UFs, ColorFactory.brewerNames, "clusters");

            // update the colors of each UF in the map
            this.palette = gp5.createImage(this.features.length, 1);
            this.palette.loadPixels();
            for (let i = 0; i < this.features.length; ++i) {
                let color = ColorFactory.getColorFromDictionary("clusters", this.features[i].properties.UF, 5 + Math.floor(Math.random() * 3)); // entry name, field name, index
                // this.palette.set(i, 0, getColorAt(i).levels);
                this.palette.set(i, 0, gp5.color(color).levels);
            }
            this.palette.updatePixels();

            // Refresh canvas and reposition nodes
            this.updateMatrices();
            this.unprojectMousePosition();
            this.updateVNodePositions();

            // update the canvas with the new drawings
            Canvas.update();

        });

    }

    computeStatistics() {
        let n = 0;
        let total = 0;
        for (const node of this.cluster.nodes) {
            this.nodeByGeocode[node.attributes.attRaw.geocode] = node;
            const attrValue = Number(node.attributes.attRaw[this.keyAttribute]);
            if (Number.isNaN(attrValue)) continue;
            ++n;
            total += attrValue;
        }
        this.keyAttributeMean = total / n;

        let SSD = 0;
        for (const node of this.cluster.nodes) {
            this.nodeByGeocode[node.attributes.attRaw.geocode] = node;
            const attrValue = Number(node.attributes.attRaw[this.keyAttribute]);
            if (Number.isNaN(attrValue)) continue;
            SSD += (attrValue - this.keyAttributeMean) ** 2;
        }
        this.keyAttributeStdev = Math.sqrt(SSD / n);
    }

    colorFor(geocode) {
        if (!this.nodeByGeocode[geocode]) {
            return gp5.color(200);
        }
        const attrValue = Number(this.nodeByGeocode[geocode]?.attributes.attRaw?.[this.keyAttribute]) || 0;
        const start = this.keyAttributeMean - 1.5 * this.keyAttributeStdev;
        const end = this.keyAttributeMean + 1.5 * this.keyAttributeStdev;
        // TODO: this will be loaded from JSON
        const [r1, g1, b1] = [
            [7, 64, 80],
            [255, 198, 196]
        ][this.index];
        const [r2, g2, b2] = [
            [211, 242, 163],
            [103, 32, 68]
        ][this.index];
        return gp5.color(
            gp5.map(attrValue, start, end, r1, r2, true),
            gp5.map(attrValue, start, end, g1, g2, true),
            gp5.map(attrValue, start, end, b1, b2, true),
        );
    }

    computeStatistics() {
        let n = 0;
        let total = 0;
        for (const node of this.cluster.nodes) {
            this.nodeByGeocode[node.attributes.attRaw.geocode] = node;
            const attrValue = Number(node.attributes.attRaw[this.keyAttribute]);
            if (Number.isNaN(attrValue)) continue;
            ++n;
            total += attrValue;
        }
        this.keyAttributeMean = total / n;

        let SSD = 0;
        for (const node of this.cluster.nodes) {
            this.nodeByGeocode[node.attributes.attRaw.geocode] = node;
            const attrValue = Number(node.attributes.attRaw[this.keyAttribute]);
            if (Number.isNaN(attrValue)) continue;
            SSD += (attrValue - this.keyAttributeMean) ** 2;
        }
        this.keyAttributeStdev = Math.sqrt(SSD / n);
    }

    colorFor(geocode) {
        if (!this.nodeByGeocode[geocode]) {
            return gp5.color(200);
        }
        const attrValue = Number(this.nodeByGeocode[geocode]?.attributes.attRaw?.[this.keyAttribute]) || 0;
        const start = this.keyAttributeMean - 1.5 * this.keyAttributeStdev;
        const end = this.keyAttributeMean + 1.5 * this.keyAttributeStdev;
        // TODO: this will be loaded from JSON
        const [r1, g1, b1] = [
            [7, 64, 80],
            [255, 198, 196]
        ][this.index];
        const [r2, g2, b2] = [
            [211, 242, 163],
            [103, 32, 68]
        ][this.index];
        return gp5.color(
            gp5.map(attrValue, start, end, r1, r2, true),
            gp5.map(attrValue, start, end, g1, g2, true),
            gp5.map(attrValue, start, end, b1, b2, true),
        );
    }

    warp(r) {
        if (r < this.r1) return this.s1 * r;
        if (r < this.r2) {
            return this.s1 * r + ((this.s1 - this.s2) * (r - this.r1) * (r - this.r1)) / (2.0 * (this.r1 - this.r2));
        }
        return this.s1 * this.r2 + ((this.s2 - this.s1) * (this.r2 - this.r1)) / 2.0 + this.s2 * (r - this.r2);
    }

    updateMatrices() {
        const flipY = mat4.fromValues(
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        const offset = vec3.fromValues(0, 0, this.layerGap * (this.index - (VGeoCluster.total - 1) / 2));
        const translate = mat4.fromTranslation(mat4.create(), offset);
        const rotateX = mat4.fromXRotation(mat4.create(), this.rotationX);
        const rotateY = mat4.fromYRotation(mat4.create(), this.rotationY);
        const modelMatrix = mat4.create();
        mat4.mul(modelMatrix, translate, flipY);
        mat4.mul(modelMatrix, rotateX, modelMatrix);
        mat4.mul(modelMatrix, rotateY, modelMatrix);
        const viewMatrix = mat4.lookAt(mat4.create(), [0, 0, this.cameraDistance], [0, 0, 0], [0, 1, 0]);
        this.modelViewMatrix = mat4.mul(mat4.create(), viewMatrix, modelMatrix);
        this.projectionMatrix = mat4.perspective(
            mat4.create(),
            2 * Math.atan(this.tanHalfFovY), // vertical FOV
            VGeoCluster.width / VGeoCluster.height, // aspect ratio
            0.1 * 800, // near plane
            10 * 800 // far plane
        );
    }

    get focusRadius() {
        return this.s1 * this.r2;
    }

    /**
     * Update the position of the VNodes and each of its vConnectors based on the current rotation and zoom level
     * *************** TODO This method should be modified and use the TransFactory class.***************
     */
    updateVNodePositions() {
        //This matrix should be stored in the TransFactory class
        const MVP = mat4.create();
        mat4.mul(MVP, this.projectionMatrix, this.modelViewMatrix);

        for (let vNode of this.vNodes) {
            const geocode = vNode.node.attributes.attRaw.geocode;
            if (!this.centroidByGeocode[geocode]) continue;

            const vIn = this.centroidByGeocode[geocode].copy();
            vIn.sub(this.mouseX_object, this.mouseY_object);
            const r = this.warp(vIn.mag());
            vIn.setMag(r);
            vIn.add(this.mouseX_object, this.mouseY_object);
            const position_object = vec4.fromValues(vIn.x, vIn.y, 0, 1);

            const position_NDC = vec4.transformMat4(vec4.create(), position_object, MVP);

            vNode.shouldShowText = r < this.focusRadius && r < this.focusRadius;
            vNode.shouldShowButton = r < this.focusRadius && this.index === VGeoCluster.selectedLayerId;

            vNode.pos = gp5.createVector(position_NDC[0] / position_NDC[3], position_NDC[1] / position_NDC[3], position_NDC[3])
                .mult(VGeoCluster.width / 2, -VGeoCluster.height / 2)
                .add(VGeoCluster.width / 2, VGeoCluster.height / 2);

            // Update the internal connectors
            vNode.updateConnectorsCoords();
        }
    }

    /**
     * Determine mouse coordinates in the map plane (object space) using ray casting.
     * The result is stored in internal properties this.mouseX_object and this.mouseY_object
     */
    unprojectMousePosition() {
        const normal = vec4.fromValues(0, 0, 1, 0); // direction (w=0)
        const center = vec4.fromValues(0, 0, 0, 1); // position (w=1)
        vec4.transformMat4(normal, normal, this.modelViewMatrix);
        vec4.transformMat4(center, center, this.modelViewMatrix);

        const ray = vec4.fromValues(
            Canvas._mouse.x - VGeoCluster.width / 2,
            -(Canvas._mouse.y - VGeoCluster.height / 2),
            -(VGeoCluster.height / 2 / this.tanHalfFovY),
            0
        );
        const signedDistance = vec4.dot(ray, normal);
        if (signedDistance >= 0) {
            // if the ray is directed away from the plane, adjust it slightly to make it directed towards the plane
            vec4.scaleAndAdd(ray, ray, normal, -(signedDistance + 0.1));
        }
        const t = vec4.dot(center, normal) / vec4.dot(ray, normal);
        const pos_camera = vec4.fromValues(ray[0] * t, ray[1] * t, ray[2] * t, 1);
        const modelViewInverse = mat4.invert(mat4.create(), this.modelViewMatrix);
        const pos_object = vec4.transformMat4(vec4.create(), pos_camera, modelViewInverse);
        this.mouseX_object = pos_object[0] / pos_object[3];
        this.mouseY_object = pos_object[1] / pos_object[3];
    }

    /**
     * Receives events from the canvas and updates the VGeoCluster accordingly.
     * This replaces the former handleEvents method in this class.
     * @param {*} data the event sent by the canvas to its observers.
     */
    fromCanvas(data) {
        if (data.event instanceof MouseEvent) {
            this.updateMatrices();
            this.unprojectMousePosition();
            this.updateVNodePositions();
        } else if (data.event instanceof KeyboardEvent) {
            if (data.event.type == "keydown") {
                switch (data.event.key) {
                    case 'ArrowUp':
                        this.rotationX = gp5.constrain(this.rotationX - 0.05, -Math.PI / 2, Math.PI / 2);
                        break;
                    case 'ArrowDown':
                        this.rotationX = gp5.constrain(this.rotationX + 0.05, -Math.PI / 2, Math.PI / 2);
                        break;
                    case 'ArrowLeft':
                        this.rotationY = gp5.constrain(this.rotationY - 0.05, -Math.PI / 2, Math.PI / 2);
                        break;
                    case 'ArrowRight':
                        this.rotationY = gp5.constrain(this.rotationY + 0.05, -Math.PI / 2, Math.PI / 2);
                        break;
                    case '=':
                        this.s1 = gp5.constrain(this.s1 + 1, 1, 50);
                        break;
                    case '-':
                        this.s1 = gp5.constrain(this.s1 - 1, 1, 50);
                        break;
                    case 'k':
                        this.layerGap += 10;
                        break;
                    case 'j':
                        this.layerGap -= 10;
                        break;
                    default:

                }
                this.updateMatrices();
                this.unprojectMousePosition();
                this.updateVNodePositions();
            }
        } else {
            // do something
        }
    }

    renderToBuffer(buffer, shader) {
        buffer.shader(shader);
        shader.setUniform('modelViewMatrix', this.modelViewMatrix);
        shader.setUniform('projectionMatrix', this.projectionMatrix);
        shader.setUniform('mouse', [this.mouseX_object, this.mouseY_object]);
        shader.setUniform('layerId', this.index + 1);
        shader.setUniform('r1', this.r1);
        shader.setUniform('r2', this.r2);
        shader.setUniform('s1', this.s1);
        shader.setUniform('s2', this.s2);
        shader.setUniform('palette', this.palette);
        shader.setUniform('paletteSize', this.palette.width);
        shader.setUniform('selected', VGeoCluster.selectedFeatureId);
        buffer.model(this.clusterGeometry);
    }

    show(renderer) {
        // super.show(renderer);
        // this.handleEvents();
        if (this.clusterGeometry) {
            if (this.pixelShader) {
                VGeoCluster.pixelTarget.texture(this.palette);
                this.renderToBuffer(VGeoCluster.pixelTarget, this.pixelShader);
            }
            if (this.idShader) {
                this.renderToBuffer(VGeoCluster.idTarget, this.idShader);
            }
        }
    }
}