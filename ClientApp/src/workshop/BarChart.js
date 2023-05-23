import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const WorkShopBarChart = ({data, width, height}) => {
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
//Add Unit
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
//Add Unit
            .range([chartHeight, 0]);

        // Draw bars
        


        // Draw x-axis
        

        // Draw y-axis
        

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

export default WorkShopBarChart;