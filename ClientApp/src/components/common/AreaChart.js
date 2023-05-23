import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const AreaChart = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        // Set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 30, left: 60};
        const width = 1200 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Read the data
        d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
            // When reading the csv, format variables
            (d) => {
                return {date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value};
            }).then((data) => {
            // Append the SVG object to the body of the page
            const svg = d3.select(svgRef.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Add X axis
            const x = d3.scaleTime()
                .domain(d3.extent(data, (d) => d.date))
                .range([0, width]);

            const xAxis = svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => +d.value)])
                .range([height, 0]);

            const yAxis = svg.append('g')
                .call(d3.axisLeft(y));

            // Add a clipPath
            svg.append('defs').append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('x', 0)
                .attr('y', 0);

            // Create the area variable
            const area = svg.append('g')
                .attr('clip-path', 'url(#clip)');

            // Create an area generator
            const areaGenerator = d3.area()
                .x((d) => x(d.date))
                .y0(y(0))
                .y1((d) => y(d.value));

            // Add the area
            area.append('path')
                .datum(data)
                .attr('class', 'myArea')
                .attr('fill', '#69b3a2')
                .attr('fill-opacity', 0.3)
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('d', areaGenerator);

            // Add brushing
            const brush = d3.brushX()
                .extent([[0, 0], [width, height]])
                .on('end', updateChart);

            // Add the brushing
            area.append('g')
                .attr('class', 'brush')
                .call(brush);

            // A function that set idleTimeOut to null
            let idleTimeout;

            function idled() {
                idleTimeout = null;
            }

            // A function that updates the chart for given boundaries
            function updateChart(event) {
                // What are the selected boundaries?
                const extent = event.selection;

                // If no selection, back to initial coordinate. Otherwise, update X axis domain
                if (!extent) {
                    if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                    x.domain([4, 8]);
                } else {
                    x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                    area.select('.brush').call(brush.move, null); // This removes the grey brush area as soon as the selection has been done
                }

                // Update axis and area position
                xAxis.transition().duration(1000).call(d3.axisBottom(x));
                area.select('.myArea')
                    .transition()
                    .duration(1000)
                    .attr('d', areaGenerator);
            }

            // If user double clicks, reinitialize the chart
            svg.on('dblclick', () => {
                x.domain(d3.extent(data, (d) => d.date));
                xAxis.transition().call(d3.axisBottom(x));
                area.select('.myArea')
                    .transition()
                    .attr('d', areaGenerator);
            });
        });
    }, []);

    return <div id="my_dataviz" ref={svgRef}></div>;
};

export default AreaChart;