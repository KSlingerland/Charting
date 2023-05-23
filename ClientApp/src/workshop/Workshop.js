import React, {Component} from 'react';
import WorkShopBarChart from "./BarChart";

export class Workshop extends Component {
    static displayName = Workshop.name;

    constructor(props) {
        super(props);
        this.state = {forecasts: [], loading: true};
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <WorkShopBarChart data={forecasts} height={500} width={1000}/>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Workshop.renderForecastsTable(this.state.forecasts);


        return (
            <div>
                {contents}
            </div>
        )
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({forecasts: data, loading: false});
    }
};
