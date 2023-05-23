import React, {Component} from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.data;
    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;