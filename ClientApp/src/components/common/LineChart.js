import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';

const LineChart = ({data, width, height}) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);

        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Remove previous chart elements
        svg.selectAll('*').remove();

        // Create a group for the chart
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, chartWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([chartHeight, 0]);

        // Generate line path
        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value));

        // Create line chart path
        const linePath = chart.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Create x-axis
        const xAxis = d3.axisBottom(xScale);

        chart.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(xAxis);

        // Create y-axis
        const yAxis = d3.axisLeft(yScale);

        chart.append('g')
            .call(yAxis);

        // Create zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8])  // Limit zoom scale from 1x to 8x
            .translateExtent([[0, 0], [chartWidth, chartHeight]])  // Limit panning within the chart area
            .on('zoom', zoomed);

        // Apply zoom behavior to the SVG element
        svg.call(zoom);

        // Zoomed function
        function zoomed(event) {
            // Get current zoom transform
            const transform = event.transform;

            // Update scales with the new zoom transform
            const updatedXScale = transform.rescaleX(xScale);

            // Update line path with the new scales
            linePath.attr('d', line.x(d => updatedXScale(d.date)));

            // Update x-axis with the new scale
            chart.select('.x-axis').call(xAxis.scale(updatedXScale));
        }

    }, [data, width, height]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            <g className="x-axis"/>
            <g className="y-axis"/>
        </svg>
    );
};

export default LineChart;