import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import Page404 from './404';

import WeatherCard from '../components/weather/weatherCard/WeatherCard';
import WeatherCurrentCard from '../components/weather/weatherCurrentCard/WeatherCurrentCard';

import { Container, Grid2, Box} from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { getWeatherOneCall, setWeatherError } from '../redux/actions/actionCreator';

const WeatherInfoPage = () => {
    const {cityName} = useParams();
    const {weather, loading, error} = useSelector(state => state.weatherReducer || {});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setWeatherError(''));
        dispatch(getWeatherOneCall(cityName));
    }, [cityName]);

    const View = (props) => {
        const {weather, days} = props.data;  

        return (
            <Container>   
                <Box sx={{textAlign:"right", textTransform: 'capitalize'}}>
                    <Link to='/' className='btn btn-danger'>go to back</Link>
                </Box>

                <WeatherCurrentCard 
                    image={weather.image}
                    temperature={weather.temperature}
                    description={weather.description}
                    city={weather.city}
                    country={weather.country}
                    feelsLike={weather.feelsLike}
                    humidity={weather.humidity}
                    pressure={weather.pressure}
                    wind={weather.wind}
                />
                
                <Grid2 container spacing={2}>
                    {Array.from(days).map(([key, value]) => {
                        const mapKeys = Array.from(value.list.keys());
                        let day = value.list.get(mapKeys[0]);

                        return <Grid2 size='grow' key={key}>
                            <WeatherCard 
                                image={day.image}
                                temperature={day.temperature}
                                description={day.description}
                                wind={day.wind}
                                dayOfWeek={value.date.dayOfWeekShort}/>
                        </Grid2>
                    })}
                </Grid2>
            </Container> 
        )
    }

    const errorMessage = error ? <Page404/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) && weather.current != null? <View data={{
        weather: weather.current,
        days: weather.days
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