import React from 'react';


import './ForecastDisplay.css';

export default class ForecastDisplay extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="forecast-display container mb-4">
                    <img src={`images/w-${this.props.weatherGroup[0]}.png`}/>
                    <div className="weather-information d-flex flex-row justify-content-between">
                        <div className="temperature text-white">
                            {Number(this.props.temp[0]).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code[0]} owf-lg`}></i>
                        </div>
                        <div className="col-auto"></div>
                        <div className="description text-dark align-self-center">Tomorrow : {this.props.desc}</div>
                    </div>
                    <div className="fivedays-forecast d-flex flex-row justify-content-between">
                        <div className="first-day col-sm-4 col-md-3">
                            {this.props.ts[1]} {Number(this.props.temp[1]).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code[1]} owf-lg`}></i>
                        </div>
                        <div className="second-day col-sm-4 col-md-3">
                            {this.props.ts[2]} {Number(this.props.temp[2]).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code[2]} owf-lg`}></i>
                        </div>
                        <div className="third-day col-sm-4 col-md-3">
                            {this.props.ts[3]} {Number(this.props.temp[3]).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code[3]} owf-lg`}></i>
                        </div>
                        <div className="fourth-day col-sm-4 col-md-3">
                            {this.props.ts[4]} {Number(this.props.temp[4]).toFixed(1)}&ordm; {(this.props.unit === "metric") ? 'C' : 'F'} <i className={`owf owf-${this.props.code[4]} owf-lg`}></i>
                        </div>
                    </div>
            </div>
        );
    }
}