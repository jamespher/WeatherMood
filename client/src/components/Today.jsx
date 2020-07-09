import React from 'react';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
import {owm_ajax_today} from 'api/OpenWeatherMap.js';
import {listPosts, createPost} from 'api/post.js';
import './Weather.css';


export default class Today extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weatherGroup: "na",
            temp: "N/A",
            desc: "N/A",
            city: "",
            code: -1, /* weather condition code for OWM */
            posts: []
        }
        this.handleformQuery = this.handleformQuery.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        document.body.className = `weather-bg ${this.state.weatherGroup}`;
        return (
            <div className="today">
                <WeatherDisplay city={this.state.city} unit={this.props.unit} weatherGroup={this.state.weatherGroup} temp={this.state.temp} desc={this.state.desc} code={this.state.code}/>
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleformQuery}/>
                <PostForm onPost={this.handlePost}/>
                <PostList posts={this.state.posts}/>
            </div>
        );
    }

    componentDidMount() {
        this.getWeather("Ann Arbor", "metric");
        listPosts().then(
            (_posts) => {
                this.setState({
                    posts: _posts
                });
            }
        ).catch(
            (err) => {
                console.error('Error listing posts', err);
                this.setState({
                    posts: []
                });
            }
        );
    }

    handleformQuery(_city, _unit){
        //console.log("handleformQuery:" + _unit);
        if(this.props.unit !== _unit) {
            this.props.onUnitMainChange(_unit);
        }
        this.getWeather(_city, _unit);
    }

    getWeather(_city, _unit) {
        //console.log("getWeather:" +_city);
        this.setState({
            city: _city
        }, () => {
            owm_ajax_today(_city, _unit).then(
                (weatherInfo) => {
                //console.log(weatherInfo);
                this.setState({
                    weatherGroup: weatherInfo.weatherGroup,
                    temp: weatherInfo.temp,
                    desc: weatherInfo.desc,
                    city: weatherInfo.city,
                    code: weatherInfo.code
                });
            }).catch((err) => {
                console.error('Error getting weather today', err);
                this.setState({
                    weatherGroup: "na",
                    temp: "N/A",
                    desc: "N/A",
                    city: "",
                    code: -1 /* weather condition code for OWM */
                });
            })
        });
    }

    handlePost(_mood, _text) {
        createPost(_mood, _text).then(
            () => {
                return listPosts();
            }
        ).then(
            (_posts) => {
                this.setState({
                    posts: _posts
                });
            }
        ).catch(
            (err) => {
                console.error('Error creating posts', err);
            }
        );
    }
}