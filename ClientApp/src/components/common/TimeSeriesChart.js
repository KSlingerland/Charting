import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TimeSeriesChart = ({
    data,
    width = 500,
    height = 196,
    title,
    yMin,
    yMax,
    format = '.4~s',
    legendValues = [],
    rightFooter,
    selectionHandler,
    series = [],
}) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const margin = { top: 24, right: 0, bottom: 18, left: 50 };
        const legendFontSize = 11;
        const formatAsDate = d3.timeFormat('%-m/%-d');
        const formatAsTime = d3.timeFormat('%-Hh%M');
        const formatAsDateTime = d3.timeFormat('%Y-%m-%d %H:%M:%S');
        const xTickFormatter = (d) =>
      d.getHours() === 0 && d.getMinutes() === 0 ? formatAsDate(d) : formatAsTime(d);
        const yTickFormatter =
      typeof format === 'function' ? format('axis') : d3.format(format);
        const yValueFormatter =
      typeof format === 'function' ? format('value') : d3.format(format);

        const boundaries = {
            left: margin.left,
            right: width - margin.right,
            top: margin.top,
            bottom: height - margin.bottom,
        };

        const axisStyler = (g) => {
            g.selectAll('line')
        .attr('stroke', 'lightgrey')
        .attr('stroke-opacity', 0.7)
        .attr('shape-rendering', 'geometricPrecision');
            if (g.node().classList.contains('y-axis')) {
                g.select('.domain').attr('opacity', 0.0);
            } else {
                g.select('.domain').attr('stroke', 'grey');
            }
        };

        const [yDomain, legendEntries] = prepareData(data);

        const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([boundaries.left, boundaries.right]);

        const xAxis = (scale) => {
            return (g) =>
        g
          .attr('class', 'x-axis')
          .attr('transform', `translate(0, ${boundaries.bottom})`)
          .call(
              d3
              .axisBottom(scale)
              .ticks(8)
              .tickPadding(8)
              .tickSizeInner(boundaries.top - boundaries.bottom)
              .tickSizeOuter(0)
              .tickFormat(xTickFormatter)
              )
          .call(axisStyler);
        };

        const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([boundaries.bottom, boundaries.top])
      .nice();
        
        const yAxis = (scale) => {
            return (g) =>
        g
          .attr('class', 'y-axis')
          .attr('transform', `translate(${boundaries.left}, 0)`)
          .call(
              d3
              .axisLeft(scale)
              .ticks(5)
              .tickPadding(8)
              .tickSizeInner(boundaries.left - boundaries.right)
              .tickSizeOuter(0)
              .tickFormat(yTickFormatter)
              )
          .call(axisStyler);
        };