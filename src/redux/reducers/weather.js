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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER: return { ...state, weather: action.payload }
        case SET_WEATHER_ERROR: return { ...state, error: action.payload };
        case SET_LOADING: return { ...state, loading: action.payload };
        default: return state;
    }
}

export default reducer;