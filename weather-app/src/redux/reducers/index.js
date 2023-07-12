import {combineReducers} from 'redux';
import cityListReducer from './cityList'
import weatherReducer from './weather'

const reducer = combineReducers({
    cityListReducer,
    weatherReducer,
});

export default reducer;