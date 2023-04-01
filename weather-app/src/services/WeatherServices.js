import { useHttp } from "../hooks/http.hooks";

const useWeatherService = () => {
    const {request, loading, error, clearError} = useHttp();
    const _apiBase = 'https://api.openweathermap.org/data/2.5/';

    const _units = 'units=metric';

    const getWeather = async (lat, lon) => {
        const res = await request(`${_apiBase}weather?lat=${lat}&lon=${lon}&${_apiKey}&${_units}`);
        return _transformWeatherData(res);
    }

    const getWeatherByCityName = async (city) => {
        const res = await request(`${_apiBase}weather?q=${city}&${_apiKey}&${_units}`);        
        return _transformWeatherData(res);
    }

    const getWeatherOneCall = async (lat, lon) => {
        const res = await request(`${_apiBase}onecall?lat=${lat}&lon=${lon}&${_apiKey}&${_units}`);      
        return {
            hourly: _transformWeatherDataToHourly(res.hourly),
            daily : _transformWeatherDataToDaily(res.daily)
        }
    }
    const _transformWeatherData = (weather) => {
        return {            
            city: weather.name,
            country: weather.sys.country,
            lat: weather.coord.lat,
            long: weather.coord.lon,
            temperature: convertTemp(weather.main.temp),
            description: weather.weather[0].main,
            image: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
            wind: weather.wind.speed,
            feelsLike: convertTemp(weather.main.feels_like),
            clouds: weather.clouds.all
            
        }
    }

    const _transformWeatherDataToHourly = (weather) => {
        return weather.map(item => {
            return {
                hours: converTimeStampToHours(item.dt),
                temperature: convertTemp(item.temp),
                description: item.weather[0].main,
                image: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                pressure: item.pressure,
                humidity: item.humidity
            }
        }).slice(0,24);        
    }

    const _transformWeatherDataToDaily = (weather) => {
        return weather.map(item => {
            return {
                date: {
                    dt: item.dt,
                    dayOfWeek: converTimeStampToDayOfWeek(item.dt),
                    date: converTimeStampToDate(item.dt)
                },
                temperature: {
                    day: convertTemp(item.temp.day),
                    night: convertTemp(item.temp.night),                  
                    max: convertTemp(item.temp.max),
                    min: convertTemp(item.temp.min)
                },
                description: item.weather[0].main,
                image: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                pressure: item.pressure,
                humidity: item.humidity
            }
        });        
    }

    const convertTemp = (temp) =>{
        let value = temp > 0 ? `+${Math.round(temp)}` : Math.round(temp);       
        return `${value} °С`;
    }

    const converTimeStampToDayOfWeek = (timestamp) => {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfWeek = days[new Date(timestamp*1000).getDay()]
        return dayOfWeek;
    }

    const converTimeStampToDate = (timestamp) => {
        var date = new Date(timestamp*1000).getDate()
        return date;
    }

    const converTimeStampToHours = (timestamp) => {
        var hours = new Date(timestamp*1000).getHours();
        return hours;
    }

    return {loading, error, clearError, getWeather, getWeatherByCityName, getWeatherOneCall}
}

export default useWeatherService;