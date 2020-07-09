import React from 'react';

import ForecastDisplay from 'components/ForecastDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import {owm_ajax_forecast} from 'api/OpenWeatherMap.js';
import './Weather.css';


export default class Forecast extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ts: ["na", "na", "na", "na", "na"],
            weatherGroup: ["na", "na", "na", "na", "na"],
            temp: ["na", "na", "na", "na", "na"],
            desc: "N/A",
            city: "",
            code: [-1, -1, -1, -1, -1] /* wether condition code for OWM */
        }
        this.handleformQuery = this.handleformQuery.bind(this);
    }

    render() {
        document.body.className = `weather-bg ${this.state.weatherGroup[0]}`;
        return (
            <div className="forecast">
                <ForecastDisplay city={this.state.city} unit={this.props.unit} weatherGroup={this.state.weatherGroup} temp={this.state.temp} desc={this.state.desc} code={this.state.code} ts={this.state.ts}/>
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleformQuery}/>
            </div>
        );
    }

    componentDidMount() {
        this.getForecast("Ann Arbor", this.props.unit);
    }

    handleformQuery(_city, _unit) {
        if(this.props.unit !== _unit){
            this.props.onUnitMainChange(_unit);
        }
        this.getForecast(_city, _unit);
        //console.log(this.state.ts);
    }

    getForecast(_city, _unit) {
        this.setState({
            city: _city
        }, () => {
            owm_ajax_forecast(_city, _unit).then(
                (forecast) => {
                    //console.log(forecast);
                    this.setState({
                        ts: forecast.weatherlist.map((dayweather) => {
                            const dateObj = new Date(dayweather.ts * 1000);
                            switch(dateObj.getDay()){
                                case 0:
                                    //console.log("Sunday");
                                    return "Sunday";
                                    break;
                                case 1:
                                    //console.log("Monday");
                                    return "Monday";
                                    break;
                                case 2:
                                    //console.log("Tuesday");
                                    return "Tuesday";
                                    break;
                                case 3:
                                    //console.log("Wednesday");
                                    return "Wednesday";
                                    break;
                                case 4:
                                    //console.log("Thursday");
                                    return "Thursday";
                                    break;
                                case 5:
                                    //console.log("Friday");
                                    return "Friday";
                                    break;
                                case 6:
                                    //console.log("Saturday");
                                    return "Saturday";
                                    break;
                                default:
                                    return "na";
                            }
                        }),
                        weatherGroup: forecast.weatherlist.map((dayweather) => {
                            return dayweather.weatherGroup;
                        }),
                        temp: forecast.weatherlist.map((dayweather) => {
                            return dayweather.temp;
                        }),
                        desc: forecast.weatherlist[0].desc,
                        city: forecast.city,
                        code: forecast.weatherlist.map((dayweather) => {
                            return dayweather.code;
                        })
                    });
                }
            ).catch((err) => {
                console.error('Error getting weather forecast', err);
                this.setState({
                    ts: ["na", "na", "na", "na", "na"],
                    weatherGroup: ["na", "na", "na", "na", "na"],
                    temp: ["na", "na", "na", "na", "na"],
                    desc: "N/A",
                    city: "",
                    code: [-1, -1, -1, -1, -1] /* wether condition code for OWM */
                });
            });
        });
    }

}