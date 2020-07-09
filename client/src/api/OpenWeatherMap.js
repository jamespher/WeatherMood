import axios from 'axios';
const apikey = ''; /* Add your API KEY */

export function getweatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'storm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

function capitalize(city) {
    return city.replace(/\b\w/g, ch => ch.toUpperCase());
}

export function owm_ajax_today(city, unit) {
    const today_baseurl = `http://api.openweathermap.org/data/2.5/weather?appid=${apikey}`;
    const url = today_baseurl + `&q=${city}&units=${unit}`;
    console.log(`Making AJAX request to ${url}`);
    return axios.get(url).then(res => {
        if(res.data.cod && res.data.message) throw new Error(res.data.message);
        return {
            city: capitalize(city),
            unit: unit,
            desc: res.data.weather[0].description,
            temp: res.data.main.temp,
            code: res.data.weather[0].id,
            weatherGroup: getweatherGroup(res.data.weather[0].id)
        };
    });
}

export function owm_ajax_forecast(city, unit) {
    const forecast_baseurl = `http://api.openweathermap.org/data/2.5/forecast?appid=${apikey}`;
    const url = forecast_baseurl + `&q=${city}&units=${unit}`;
    console.log(`Making AJAX request to ${url}`);
    return axios.get(url).then(res => {
        if(res.data.cod && res.data.message) throw new Error(res.data.message);
        
        return {
            city: capitalize(city),
            unit: unit,
            weatherlist: 
            [ /* get 12:00:00 weather for 5 days */
                {
                    ts: res.data.list[7].dt,
                    temp: res.data.list[7].main.temp,
                    desc: res.data.list[7].weather[0].description,
                    code: res.data.list[7].weather[0].id,
                    weatherGroup: getweatherGroup(res.data.list[7].weather[0].id)
                },
                {
                    ts: res.data.list[15].dt,
                    temp: res.data.list[15].main.temp,
                    desc: res.data.list[15].weather[0].description,
                    code: res.data.list[15].weather[0].id,
                    weatherGroup: getweatherGroup(res.data.list[15].weather[0].id)
                },
                {
                    ts: res.data.list[23].dt,
                    temp: res.data.list[23].main.temp,
                    desc: res.data.list[23].weather[0].description,
                    code: res.data.list[23].weather[0].id,
                    weatherGroup: getweatherGroup(res.data.list[23].weather[0].id)
                },
                {
                    ts: res.data.list[31].dt,
                    temp: res.data.list[31].main.temp,
                    desc: res.data.list[31].weather[0].description,
                    code: res.data.list[31].weather[0].id,
                    weatherGroup: getweatherGroup(res.data.list[31].weather[0].id)
                },
                {
                    ts: res.data.list[39].dt,
                    temp: res.data.list[39].main.temp,
                    desc: res.data.list[39].weather[0].description,
                    code: res.data.list[39].weather[0].id,
                    weatherGroup: getweatherGroup(res.data.list[39].weather[0].id)
                }
            ]
        };
    });
}