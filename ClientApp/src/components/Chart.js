import React, { Component } from 'react';
import BarChart from "./common/BarChart";
import RadarChart from "./common/RadarChart";
import LineChart from "./common/LineChart";

export class Chart extends Component {
    static displayName = Chart.name;

    render() {
        return (
            <div>
                <h1>Bar Chart</h1>
                <p>This is a simple example of a bar chart component.</p>
                <BarChart
                    data={[
                    { label: 'A', value: 10 },
                    { label: 'B', value: 20 },
                    { label: 'C', value: 15 },
                    { label: 'D', value: 8 },
                    { label: 'E', value: 12 }
                ]}
                    width={700}
                    height={300}
                />
                
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
                    width={700}
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
                    width={500}
                    height={300}
                />
                
            </div>
            );
    }
}
