import { useState, useEffect, useCallback } from 'react';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import SearchPanel from '../../searchPanel/SearchPanel';

import { useSelector, useDispatch } from "react-redux";
import { 
    addCity,
    getWeather,
    getWeatherByCityName,
    setWeatherError
} from '../../../redux/actions/actionCreator';

const WeatherView = () => {
    const [search, setSearch] = useState('');
    const [searchElements, setSearchElements] = useState([]);
    const keyLocalStorage = 'cityList';
    const {cityList} = useSelector(state => state.cityListReducer || []);
    const {weather, loading, error} = useSelector(state => state.weatherReducer || {});
    const dispatch = useDispatch();

    useEffect(() => {       
        navigator.geolocation.getCurrentPosition((position) => {  
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            dispatch(setWeatherError(''));  
            dispatch(getWeather({ lat, lon }));
        });

        (JSON.parse(localStorage.getItem(keyLocalStorage)) ?? [])            
            .map(item => {
                let isContain = cityList.filter((elm) => elm.id == item.id && elm.text == item.text).length;
                if(!isContain){
                    dispatch(addCity(item.text));
                }
            });
    },[]);    
    
    const searchPressed = () => {
        dispatch(setWeatherError(''));  
        setSearchElements([...searchElements, search]);
        dispatch(addCity(search));
        addCityToLocalStorage(search); 
        dispatch(getWeatherByCityName(search));
    };

    const addCityToLocalStorage = (city) => {
        const cityList = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
        localStorage.setItem(keyLocalStorage, JSON.stringify([...cityList, { id: cityList.length, text: city}]));
    }

    const WeatherInfo = useCallback((props) => {
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
    }, [weather])
    const errorMessage = error ? <ErrorMessage errorMsg={error}/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && weather != null ? <WeatherInfo weather={weather}/> : null;

    return (
        <div className="weather-view">      
            <div className='weather-title'>
                <h1>Weather APP</h1> 
            </div>
            <div className="weather-search-box">
                <SearchPanel onChange={(value) => {setSearch(value)}} onSubmit={searchPressed}/>
            </div>
            {errorMessage}
            {spinner}
            {content}                    
        </div>
    );    
}

export default WeatherView;