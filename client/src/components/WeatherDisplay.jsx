import React from 'react';


import './WeatherDisplay.css';

export default class WeatherDisplay extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="weather-display container mb-1">
                    <img src={`images/w-${this.props.weatherGroup}.png`}/>
                    <div className="weather-information d-flex flex-row justify-content-between">
                        <div className="temperature text-white">{Number(this.props.temp).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code} owf-lg`}></i></div>
                        <div className="description text-dark align-self-center">Today : {this.props.desc}</div>
                    </div>
            </div>
        );
    }
}