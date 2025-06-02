import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CollapsibleTree.css';

const CollapsibleTreeWrapper = ({ data, options }) => {
  const containerRef = useRef(null);
  const i = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    containerRef.current.innerHTML = '';

    // Ajuste para usar 80% da tela
    const width = window.innerWidth * 0.8;
    const height = options.height;
    const margin = options.margin;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Criação do SVG
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data);
    root.each(node => {
      node.data.fill = getNodeColor(node.data.name, options.nodeColors, options.fill);
    });

    root.x0 = innerHeight / 2;
    root.y0 = 0;

    const treemap = d3.tree()
      .size([innerHeight, innerWidth])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 2)); // espaçamento mais largo

    function update(source) {
      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach(d => {
        d.y = d.depth * (options.linkLength || innerWidth / 4.5); // alonga os galhos
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
        "Environmental",
        "Biodiversity loss",
        "Epidemiological",
        "Transportation networks",
        "Land Use and Land Cover",
        "Climatic anomalies",
        "Occurrence of diseases",
        "Socioeconomic",
        "Poverty",
        "Economic",
        "Population"
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

  return (
    <div 
      ref={containerRef}
      style={{
        width: '80vw',
        height: `${options.height}px`,
        overflow: 'visible',
        margin: '0 auto' // centraliza na tela
      }}
    />
  );
};

export default CollapsibleTreeWrapper;
