import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, width, height }) => {
        const svgRef = useRef(null);

        useEffect(() => {
                if (!data || data.length === 0) return;

                const svg = d3.select(svgRef.current);

                const margin = { top: 50, right: 50, bottom: 50, left: 50 };
                const chartWidth = width - margin.left - margin.right;
                const chartHeight = height - margin.top - margin.bottom;
                const radius = Math.min(chartWidth, chartHeight) / 2;

                // Remove previous chart elements
                svg.selectAll('*').remove();

                // Create a group for the chart
                const chart = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

                // Define scales
                const angleScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, Math.PI * 2]);

                const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, radius]);
                
                // Draw radar grid
                const gridCircles = chart.selectAll('.grid-circle')
      .data([0.2, 0.4, 0.6, 0.8, 1])
      .enter()
      .append('circle')
      .attr('class', 'grid-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => d * radius)
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .style('stroke-dasharray', '3,3');

                // Draw axes
                const axes = chart.selectAll('.axis')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis');

                axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radiusScale(d.value) * Math.sin(angleScale(i)))
      .attr('y2', (d, i) => -radiusScale(d.value) * Math.cos(angleScale(i)))
      .attr('stroke', 'gray');

                axes.append('text')
      .attr('x', (d, i) => radiusScale(d.value) * Math.sin(angleScale(i)) + 10)
      .attr('y', (d, i) => -radiusScale(d.value) * Math.cos(angleScale(i)) - 10)
      .text(d => d.label)
      .attr('fill', 'black');

                // Draw data area
                const dataArea = chart.append('g')
      .attr('class', 'data-area');

                dataArea.append('path')
      .datum(data)
      .attr('fill', 'rgba(0, 128, 0, 0.5)')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', d3.areaRadial()
        .angle((d, i) => angleScale(i))
        .innerRadius(0)
        .outerRadius((d) => radiusScale(d.value))
        .curve(d3.curveLinearClosed));

                }, [data, width, height]);

        return (
                <svg ref={svgRef} width={width} height={height}></svg>
                );
};

export default RadarChart;

