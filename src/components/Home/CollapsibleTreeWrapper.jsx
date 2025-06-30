import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CollapsibleTree.css';

const CollapsibleTreeWrapper = ({ data, options }) => {
  const containerRef = useRef(null);
  const i = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    containerRef.current.innerHTML = '';

    // Largura do container: 90% da tela, como definido no style do retorno
    const width = window.innerWidth * 0.9; // Use 0.9 para corresponder ao style do div externo
    const height = options.height;
    const margin = options.margin; // { top: 25, right: 100, bottom: 25, left: 100 }
    
    // innerWidth e innerHeight representam a área *real* onde o conteúdo da árvore será desenhado,
    // após subtrair as margens.
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Calcula o ponto central do SVG. A transformação do grupo G fará com que este seja o novo (0,0).
    const centerX = width / 2; // Centro horizontal da área do SVG
    const centerY = height / 2; // Centro vertical da área do SVG

    // Criação do SVG
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      // Corrigido: Mover a origem do grupo 'g' para o centro do SVG
      .attr('transform', `translate(${centerX},${centerY})`);

    const root = d3.hierarchy(data);
    root.each(node => {
      node.data.fill = getNodeColor(node.data.name, options.nodeColors, options.fill);
    });

    // Corrigido: A raiz deve começar em (0,0) em relação à nova origem central do SVG
    root.x0 = 0;
    root.y0 = 0;

    const treemap = d3.tree()
      .size([innerHeight, innerWidth]) // O layout da árvore usará innerHeight e innerWidth
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 2));

    function update(source) {
      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // NOVO/CORRIGIDO: Calcular o offset para centralizar a terceira linha verticalmente
      let thirdLevelNodes = nodes.filter(d => d.depth === 2);
      let verticalOffset = 0;

      if (thirdLevelNodes.length > 0) {
        const minX = d3.min(thirdLevelNodes, d => d.x);
        const maxX = d3.max(thirdLevelNodes, d => d.x);
        const centerOfThirdLevel = (minX + maxX) / 2;
        verticalOffset = centerOfThirdLevel;
      }

      nodes.forEach(d => {
        // d.y é a posição horizontal (profundidade)
        // O valor padrão de options.linkLength (200) será usado
        d.y = d.depth * (options.linkLength || innerWidth / 4);
        
        // Corrigido: d.x é a posição vertical
        // Subtraímos o offset para que o centro da 3ª linha vá para 0 (o centro vertical do SVG)
        d.x = d.x - verticalOffset; 
      });

      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i.current));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        // Corrigido: Transição partindo do centro (0,0)
        .attr('transform', () => `translate(${source.y0},${source.x0})`)
        .on('click', (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null; // Corrigido: garantir que _children seja nulo ao expandir
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
        // Corrigido: Usar d.x e d.y que já foram ajustados
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.exit().transition()
        .duration(600)
        // Corrigido: Usar source.x e source.y para a animação de saída
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove();

      const link = svg.selectAll('path.link')
        .data(links, d => d.id);

      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          // Corrigido: Partir do centro (0,0) para a animação de entrada dos links
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
          // Corrigido: Usar source.x e source.y para a animação de saída dos links
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

    // A árvore deve começar expandida por padrão
    update(root); 

    // A função collapse não é chamada na inicialização, mas é usada no click
    // (Ela já foi removida da chamada inicial nas últimas revisões)
    // A função 'collapse' dentro do 'update' function é para a lógica de clique
    // e está definida como parte do 'onClick' do nó.
    // Certifique-se de que a lógica de d.children = d._children; e d._children = null;
    // está correta no onClick, como ajustado acima.
  }, [data, options]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '90vw', // Mantendo o 90vw que você já usa
        height: `${options.height}px`,
        overflow: 'visible',
        margin: '0 auto', // Centraliza horizontalmente o div do wrapper
        display: 'flex', // Usar flexbox para centralizar o SVG dentro deste div
        justifyContent: 'center', // Centraliza horizontalmente o conteúdo flex (o SVG)
        alignItems: 'center' // Centraliza verticalmente o conteúdo flex (o SVG)
      }}
    />
  );
};

export default CollapsibleTreeWrapper;