import {
    ADD_CITY_TO_LIST,
    DELETE_CITY_FROM_LIST,
    SET_WEATHER,
    SET_WEATHER_ERROR,
    GET_WEATHER,
    GET_WEATHER_BY_NAME,
    GET_WEATHER_ONE_CALL,
    SET_LOADING
} from "../constants";


export const addCity = (payload) => ({
    type: ADD_CITY_TO_LIST,
    payload
});

export const deleteCity = (id, value) => ({
    type: DELETE_CITY_FROM_LIST,
    payload: { id, value }
});

export const setWeather = (payload) => ({
    type: SET_WEATHER,
    payload
})

export const getWeather = (payload) => ({
    type: GET_WEATHER,
    payload
})

export const getWeatherByCityName = (payload) => ({
    type: GET_WEATHER_BY_NAME,
    payload
})

export const getWeatherOneCall = (payload) => ({
    type: GET_WEATHER_ONE_CALL,
    payload
})

export const setWeatherError = (payload) => ({
    type: SET_WEATHER_ERROR, 
    payload
})

export const setLoading = (payload) => ({
    type: SET_LOADING, 
    payload
})

