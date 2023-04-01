import { useState, useEffect } from 'react';
import useWeatherService from '../../../services/WeatherServices';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import SearchPanel from '../../searchPanel/SearchPanel';

const WeatherView = (props) => {
    const [weather, setWeather] = useState({});
    const [search, setSearch] = useState('');
    const [searchElements, setSearchElements] = useState([]);
    const {loading, error, clearError, getWeather, getWeatherByCityName} = useWeatherService();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {  
            clearError();          
            getWeather(position.coords.latitude, position.coords.longitude)
                .then(onLoaded);
        });   
    },[]);    
    
    const onLoaded = (weather) => {
        setWeather(weather);
    }
    
    const searchPressed = () => {
        clearError();
        setSearchElements([...searchElements, search]);
        props.onAddCity(search);
        getWeatherByCityName(search)
            .then(onLoaded);
    };

    const searchPanelOnChange = (value) => {
        setSearch(value);
    }

    const WeatherInfo = (props) => {
        const {weather} = props;
        return (<>
            <div className='weather-info'>
              <div className='weather-info__location'>
                <h2 className='location'>{weather.city}, {weather.country}</h2>
                <h3 className='latAndLong'>Lat: {weather.lat}, Lon: {weather.long}</h3>
              </div>           
              <div className='weather-info__temperature'>
                <h2>{weather.temperature}</h2>         
              </div>
              <div className='weather-info__descr'>
                <img src={weather.image} width="100px" height="100px" alt=""/>
                {weather.description}
              </div>
            </div>       
            <div className='weather-info'>
              <div className='weather-info__pressure'>Pressure:<span>{weather.pressure} hPa</span></div>
              <div className='weather-info__humidity'>Humidity:<span>{weather.humidity} %</span></div>
              <div className='weather-info__wind'>Wind:<span>{weather.wind} km/h</span></div>
            </div>
          </>)
    }    

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <WeatherInfo weather={weather}/> : null;

    return (
        <div className="weather-view">      
            <div className='weather-title'>
                <h1>Weather APP</h1> 
            </div>
            <div className="weather-search-box">
                <SearchPanel onChange={searchPanelOnChange} onSubmit={searchPressed}/>
            </div>
            {errorMessage}
            {spinner}
            {content}                    
        </div>
    );    
}

export default WeatherView;