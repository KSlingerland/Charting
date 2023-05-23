import React, { Component } from 'react';
import BarChart from "./common/BarChart";
import RadarChart from "./common/RadarChart";
import LineChart from "./common/LineChart";
import AreaChart from "./common/AreaChart";

export class Chart extends Component {
    static displayName = Chart.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <BarChart data={forecasts} height={500} width={1000}/>
            );
    }

    render() {
        let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Chart.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1>Bar Chart</h1>
                <p>This is a simple example of a bar chart component.</p>

                {contents}
                
                <h1>Radar Chart</h1>
                <p>This is a simple example of a radar chart component.</p>
                <RadarChart
                    data={[
                    { label: 'Category 1', value: 0.5 },
                    { label: 'Category 2', value: 0.3 },
                    { label: 'Category 3', value: 1.0 },
                    { label: 'Category 4', value: 1.0 },
                    { label: 'Category 5', value: 1.0 },
                    ]}
                    width={800}
                    height={300}
                />
                
                <h1>Line Chart</h1>
                <p>This is a simple example of a radar chart component.</p>
                <LineChart
                    data={[
                    { date: new Date('2023-01-01'), value: 10 },
                    { date: new Date('2023-02-01'), value: 15 },
                    { date: new Date('2023-03-01'), value: 8 },
                    { date: new Date('2023-04-01'), value: 12 },
                    { date: new Date('2023-05-01'), value: 6 },
                    ]}
                    width={1000}
                    height={300}
                />
                
                <h1>Area Chart</h1>
                <p>This is a simple example of a area chart component.</p>
                <AreaChart/>

            </div>
            );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: this.groupDataByMonth(data), loading: false });
    }

    groupDataByMonth(data) {
        const groups = {};
        data.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const key = `${year}-${month}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
        });

        const averages = [];
        for (const key in groups) {
            if (groups.hasOwnProperty(key)) {
                const group = groups[key];
                const sum = group.reduce((total, item) => total + item.temperatureC, 0);
                const average = sum / group.length;
                averages.push({
                    label: key,
                    value: average.toFixed(2)
                });
            }
        }
        console.log(averages)
        return averages;
    }
}
