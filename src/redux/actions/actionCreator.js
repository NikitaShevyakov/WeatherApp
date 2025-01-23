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
import { createAction } from "@reduxjs/toolkit";

// export const addCity = (payload) => ({
//     type: ADD_CITY_TO_LIST,
//     payload
// });

export const addCity = createAction(ADD_CITY_TO_LIST);

// export const deleteCity = (id, value) => ({
//     type: DELETE_CITY_FROM_LIST,
//     payload: { id, value }
// });

export const deleteCity = createAction(DELETE_CITY_FROM_LIST, (id, value) => { return { payload: {id, value}}});

// export const setWeather = (payload) => ({
//     type: SET_WEATHER,
//     payload
// })

export const setWeather = createAction(SET_WEATHER);

// export const getWeather = (payload) => ({
//     type: GET_WEATHER,
//     payload
// })

export const getWeather = createAction(GET_WEATHER);

// export const getWeatherByCityName = (payload) => ({
//     type: GET_WEATHER_BY_NAME,
//     payload
// })

export const getWeatherByCityName = createAction(GET_WEATHER_BY_NAME);

// export const getWeatherOneCall = (payload) => ({
//     type: GET_WEATHER_ONE_CALL,
//     payload
// })

export const getWeatherOneCall = createAction(GET_WEATHER_ONE_CALL);


// export const setWeatherError = (payload) => ({
//     type: SET_WEATHER_ERROR, 
//     payload
// })

export const setWeatherError = createAction(SET_WEATHER_ERROR);

// export const setLoading = (payload) => ({
//     type: SET_LOADING, 
//     payload
// })

export const setLoading = createAction(SET_LOADING);
