import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const BarChart = ({data, width, height}) => {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        const tooltip = d3.select(tooltipRef.current);

        const margin = {top: 50, right: 50, bottom: 50, left: 50};
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Remove previous chart elements
        svg.selectAll('*').remove();

        // Create a group for the chart
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Define scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([chartHeight, 0]);

        // Draw bars
        const bars = chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.label))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => chartHeight - yScale(d.value))
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                // Show tooltip
                tooltip
                    .style('opacity', 1)
                    .html(`Value: ${d.value}`)
                    .style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY}px`);

                // Change bar color on hover
                d3.select(event.target)
                    .attr('fill', 'orange');
            })
            .on('mouseout', (event, d) => {
                // Hide tooltip
                tooltip.style('opacity', 0);

                // Restore bar color on hover out
                d3.select(event.target)
                    .attr('fill', 'steelblue');
            });


        // Draw x-axis
        const xAxis = d3.axisBottom(xScale);
        chart.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        // Draw y-axis
        const yAxis = d3.axisLeft(yScale);
        chart.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

        // Listen to mousemove event on the SVG container
        svg.on('mousemove', (event) => {
            const [x, y] = d3.pointer(event);

            // Update tooltip position to follow the mouse
            tooltip
                .style('left', `${x}px`)
                .style('top', `${y}px`);
        });

    }, [data, width, height]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
            <div ref={tooltipRef} className="tooltip"></div>
        </div>
    );
};

export default BarChart;