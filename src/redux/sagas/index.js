import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { GET_WEATHER, GET_WEATHER_BY_NAME, GET_WEATHER_ONE_CALL } from '../constants';
import { setWeather, setWeatherError, setLoading } from '../actions/actionCreator';
import { getWeather, getWeatherByCityName, getWeatherOneCall } from '../../api/index';

export function* handleWeather(action) {   
    try {
        yield put(setLoading(true));
        let weather = null;    
        switch(action.type){
            case GET_WEATHER: 
                weather = yield call(getWeather, action.payload.lat, action.payload.lon);
                break;
            case GET_WEATHER_BY_NAME:
                weather = yield call(getWeatherByCityName, action.payload);
                break;
            case GET_WEATHER_ONE_CALL:
                weather = yield call(getWeatherByCityName, action.payload);
                let res = yield call(getWeatherOneCall, weather.lat, weather.long);
                weather = {
                    current: weather,
                    days: res.days
                }                
                break;
        }
        yield put(setWeather(weather));
    }
    catch{        
        yield put(setWeatherError('An error occurred while getting the weather'));
    }
    finally{
        yield put(setLoading(false));
    }
}

export function* watchWeatherSaga() {
    yield takeEvery(GET_WEATHER, handleWeather);
    yield takeEvery(GET_WEATHER_BY_NAME, handleWeather);
    yield takeEvery(GET_WEATHER_ONE_CALL, handleWeather);
}

export default function* rootSaga() {
    yield fork(watchWeatherSaga);
}