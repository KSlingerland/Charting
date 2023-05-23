import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Heatmap = ({data}) => {
    const chartRef = useRef(null);
    const tooltipRef = useRef(null);

    const width = 600;
    const height = 100;
    const cellSize = 15;
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        const tooltip = d3.select(tooltipRef.current);

        if (data && chartRef.current) {
            const svg = d3.select(chartRef.current)
                .attr('width', width)
                .attr('height', height);

            const colorScale = d3.scaleSequential()
                .interpolator(d3.interpolateGreens)
                .domain([0, d3.max(data, d => d.value)]);

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => d.day * cellSize)
                .attr('y', d => d.week * cellSize)
                .attr('width', cellSize)
                .attr('height', cellSize)
                .style('fill', d => colorScale(d.value))
                .on('mouseover', (event, d) => {
                    // Show tooltip
                    tooltip
                        .style('opacity', 1)
                        .html(`Value: ${d.value}`)
                        .style('left', `${event.pageX}px`)
                        .style('top', `${event.pageY}px`);
                })
                .on('mouseout', (event, d) => {
                    // Hide tooltip
                    tooltip.style('opacity', 0);
                });

            svg.selectAll('text')
                .data(weekDays)
                .enter()
                .append('text')
                .text(d => d)
                .attr('x', 0)
                .attr('y', (d, i) => (i + 0.5) * cellSize)
                .attr('dy', '0.35em')
                .style('text-anchor', 'end')
                .style('fill', 'black')
                .style('font-size', '10px');

            svg.selectAll('.month')
                .data([0])
                .enter()
                .append('text')
                .text('Jan')
                .attr('x', -5)
                .attr('y', -5)
                .style('text-anchor', 'end')
                .style('fill', 'black')
                .style('font-size', '10px');

            // Listen to mousemove event on the SVG container
            svg.on('mousemove', (event) => {
                const [x, y] = d3.pointer(event);

                // Update tooltip position to follow the mouse
                tooltip
                    .style('left', `${x + 10}px`)
                    .style('top', `${y - 10}px`);
            });
        }
    }, [data]);

    return (
      <div>
        <svg ref={chartRef} width={width} height={height}></svg>
        <div ref={tooltipRef} className="tooltip"></div>
      </div>
      );
};

export default Heatmap;