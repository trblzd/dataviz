import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CollapsibleTree.css';

const CollapsibleTreeWrapper = ({ data, options }) => {
  const containerRef = useRef(null);
  const i = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    containerRef.current.innerHTML = '';

    const isMobile = window.innerWidth <= 900; 
    
    const height = options.height;
    const margin = options.margin; 

    let svgWidth;
    let effectiveLinkLength = options.linkLength;
    let centerX;
    
    const estimatedMaxDepth = 4; 
    const estimatedMaxTextWidth = 150; 

    if (isMobile) {
        // MODIFICADO: Garante que o svgWidth seja pelo menos a largura da janela
        // ou o minSvgWidth (1000px), permitindo que o conteúdo transborde e seja rolado.
        svgWidth = Math.max(window.innerWidth, options.minSvgWidth || 1000); 
        
        // MODIFICADO: Aumenta significativamente o centerX para afastar o início da árvore
        // da borda esquerda no mobile.
        centerX = margin.left + 150; // Um valor maior para dar espaço, ajuste se necessário.
    } else {
        // Código para Desktop (sem alterações, pois já funciona)
        svgWidth = window.innerWidth; 
        
        const availableSpaceForTree = svgWidth - margin.left - margin.right;
        
        centerX = margin.left + 80; 
        
        let calculatedLinkLength = (svgWidth - centerX - estimatedMaxTextWidth - 50) / estimatedMaxDepth; 
        
        if (calculatedLinkLength > 0 && calculatedLinkLength < options.linkLength) {
            effectiveLinkLength = Math.max(calculatedLinkLength, 120); 
        } else {
            effectiveLinkLength = options.linkLength; 
        }
    }
    
    const innerWidthForTree = svgWidth - margin.left - margin.right; 
    const innerHeight = height - margin.top - margin.bottom;
    const centerY = height / 2; 

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', svgWidth) 
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    const root = d3.hierarchy(data);
    root.each(node => {
      node.data.fill = getNodeColor(node.data.name, options.nodeColors, options.fill);
    });

    root.x0 = 0;
    root.y0 = 0;

    const treemap = d3.tree()
      .size([innerHeight, innerWidthForTree]) 
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 2));

    function update(source) {
      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      let thirdLevelNodes = nodes.filter(d => d.depth === 2);
      let verticalOffset = 0;

      if (thirdLevelNodes.length > 0) {
        const minX = d3.min(thirdLevelNodes, d => d.x);
        const maxX = d3.max(thirdLevelNodes, d => d.x);
        const centerOfThirdLevel = (minX + maxX) / 2;
        verticalOffset = centerOfThirdLevel;
      }

      nodes.forEach(d => {
        d.y = d.depth * effectiveLinkLength;
        d.x = d.x - verticalOffset; 
      });

      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i.current));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null; 
          }
          update(d);
        });

      nodeEnter.append('circle')
        .attr('r', 10)
        .style('fill', d => d.data.fill || (d._children ? options.fill : '#fff'))
        .style('stroke', d => d.data.fill || options.fill)
        .style('stroke-width', 2);

      const elevatedCategories = [
        "Environmental", "Biodiversity loss", "Epidemiological", "Transportation networks",
        "Land Use and Land Cover", "Climatic anomalies", "Occurrence of diseases",
        "Socioeconomic", "Poverty", "Economic", "Population"
      ];

      nodeEnter.append('text')
        .attr('dy', d => elevatedCategories.includes(d.data.name) ? '0em' : '0em')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .style('font-size', `${options.fontSize}px`)
        .text(d => d.data.name);

      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition()
        .duration(600)
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.exit().transition()
        .duration(600)
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove();

      const link = svg.selectAll('path.link')
        .data(links, d => d.id);

      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      linkEnter.merge(link)
        .transition()
        .duration(600)
        .attr('d', d => diagonal(d, d.parent));

      link.exit().transition()
        .duration(600)
        .attr('d', () => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                      C ${(s.y + d.y) / 2} ${s.x},
                        ${(s.y + d.y) / 2} ${d.x},
                        ${d.y} ${d.x}`;
      }
    }

    function getNodeColor(name, colorMap, defaultColor) {
      if (!name) return defaultColor;
      if (colorMap[name]) return colorMap[name];
      const colorKey = Object.keys(colorMap).find(key => name.includes(key));
      return colorKey ? colorMap[colorKey] : defaultColor;
    }

    update(root); 
  }, [data, options]);

  const isMobileView = window.innerWidth <= 900;
  const overflowXStyle = isMobileView ? 'auto' : 'hidden'; 

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%', 
        height: `${options.height}px`,
        overflowX: overflowXStyle, 
        overflowY: 'hidden',
        margin: '0 auto', 
        display: 'flex',
        alignItems: 'center',
        // justify-content aqui pode causar o corte se o conteúdo for mais largo que o container
        // Remova ou defina para 'flex-start' se o problema persistir após as outras alterações
        // justifyContent: 'center' 
      }}
    />
  );
};

export default CollapsibleTreeWrapper;