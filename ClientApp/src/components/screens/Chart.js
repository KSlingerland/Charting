import React, {Component} from 'react';
import RadarChart from "../common/charts/RadarChart";
import LineChart from "../common/charts/LineChart";
import AreaChart from "../common/charts/AreaChart";
import Heatmap from "../common/charts/Heatmap";

export class Chart extends Component {
    static displayName = Chart.name;

    render() {
        return (
            <div>

                <h1>Radar Chart</h1>
                <p>This is a simple example of a radar chart component.</p>
                <RadarChart
                    data={[
                        {label: 'Category 1', value: 0.5},
                        {label: 'Category 2', value: 0.3},
                        {label: 'Category 3', value: 1.0},
                        {label: 'Category 4', value: 1.0},
                        {label: 'Category 5', value: 1.0},
                    ]}
                    width={800}
                    height={300}
                />

                <h1>Line Chart</h1>
                <p>This is a simple example of a radar chart component.</p>
                <LineChart
                    data={[
                        {date: new Date('2023-01-01'), value: 10},
                        {date: new Date('2023-02-01'), value: 15},
                        {date: new Date('2023-03-01'), value: 8},
                        {date: new Date('2023-04-01'), value: 12},
                        {date: new Date('2023-05-01'), value: 6},
                    ]}
                    width={1000}
                    height={300}
                />

                <h1>Area Chart</h1>
                <p>This is a simple example of a area chart component.</p>
                <AreaChart/>

                <h1>Heatmap Example</h1>
                <p>This is a simple example of a area chart component.</p>
                <Heatmap data={[
                    {week: 0, day: 0, value: 0},
                    {week: 0, day: 1, value: 3},
                    {week: 0, day: 2, value: 5},
                ]}/>

            </div>
        );
    }
}
