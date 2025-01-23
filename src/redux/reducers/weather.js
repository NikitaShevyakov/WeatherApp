import { createReducer } from '@reduxjs/toolkit';

import {
    SET_LOADING,
    SET_WEATHER,
    SET_WEATHER_ERROR
} from './../constants'

const initialState = {
    weather: {},
    loading: false,
    error: ''
};

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_WEATHER: return { ...state, weather: action.payload }
//         case SET_WEATHER_ERROR: return { ...state, error: action.payload };
//         case SET_LOADING: return { ...state, loading: action.payload };
//         default: return state;
//     }
// }

// const reducer = createReducer(initialState, builder => {
//     builder
//         .addCase(SET_WEATHER, (state, action) => { state.weather = action.payload })
//         .addCase(SET_WEATHER_ERROR, (state, action) => { state.error = action.payload })
//         .addCase(SET_LOADING, (state, action) => { state.loading = action.payload })
//         .addDefaultCase(()=>{});
// })

const reducer = createReducer(initialState, {
        [SET_WEATHER]: (state, action) => { state.weather = action.payload },
        [SET_WEATHER_ERROR]: (state, action) => { state.error = action.payload },
        [SET_LOADING]: (state, action) => { state.loading = action.payload },
    },
    [],
    state => state
)

export default reducer;