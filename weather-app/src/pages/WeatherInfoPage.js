import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import Page404 from './404';

import { useSelector, useDispatch } from "react-redux";
import { getWeatherOneCall, setWeatherError } from '../redux/actions/actionCreator';
import './WeatherInfoPage.scss'

const WeatherInfoPage = () => {
    const {cityName} = useParams();
    const {weather, loading, error} = useSelector(state => state.weatherReducer || {});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setWeatherError(''));
        dispatch(getWeatherOneCall(cityName));
    }, [cityName]);

    const View = (props) => {
        const {weather, hourly, daily} = props.data;
        return (
            <div className='weather-info-single'>   
            <div className='weather-info-single__go-back'>
                <Link to='/' className='btn btn-danger'>go to back</Link>
            </div>         
            <div className='weather-info-single__location'>
                <h2 >{weather.city}, {weather.country}</h2>            
                <div>{weather.temperature}, {weather.description}</div>                
            </div>
            <ul className='weather-info-single__time-items'>
                {hourly.map( item => {
                    return <li key={item.hours} className='time-item'>
                        <div className='time-item__time'>{item.hours}</div>                        
                        <img className='time-item__img' src={item.image} alt=""/>                        
                        <div className='time-item__temp'>{item.temperature}</div>
                    </li>
                })}
            </ul>
            <div className='weather-info-single__additional-info additional-info'>                
                <ul className='additional-info__week week'>
                    {daily.map(item => {
                        return <li key={item.date.dt} className='week__item item'>
                            <div className='item__day'>
                                {item.date.dayOfWeek} {item.date.date}
                            </div>
                            <div className='item__img'>
                                <img src={item.image} width="50px" height="50px" alt=""/>
                            </div>
                            <div className='item__temp-day'>Day: {item.temperature.day}</div>
                            <div className='item__temp-night'>Night: {item.temperature.night}</div>
                        </li>
                    })}
                </ul>
                <ul className='additional-info__other-info'>
                    <li>Feels like: {weather.feelsLike}</li>
                    <li>Humidity {weather.humidity}%</li>
                    <li>Clouds {weather.clouds}%</li>
                    <li>Pressure {weather.pressure} hPa</li>
                    <li>Windspeed {weather.wind} meter/sec</li>
                    <li>UV index: 0.04</li>
                </ul>
            </div>
            
        </div>
        )
    }

    const errorMessage = error ? <Page404/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && weather.current != null? <View data={{
        weather: weather.current,
        hourly: weather.hourly,
        daily: weather.daily
    }}/> : null;
    
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

export default WeatherInfoPage;