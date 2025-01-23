import { createReducer } from '@reduxjs/toolkit';
import {
    ADD_CITY_TO_LIST,
    DELETE_CITY_FROM_LIST
} from './../constants'

const initialState = {
    cityList: []
};

const reducer = createReducer(initialState, builder => {
    builder
        .addCase(ADD_CITY_TO_LIST, (state, action) => {
            state.cityList.push({
                id: state.cityList.length,
                text: action.payload
            })
        })
        .addCase(DELETE_CITY_FROM_LIST, (state, action) => {
            state.cityList = state.cityList.filter(item => item.id !== action.payload.id)
        })
        .addDefaultCase(()=> {});
})

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_CITY_TO_LIST:
//             return {
//                 ...state,
//                 cityList: [
//                     ...state.cityList,
//                     {
//                         id: state.cityList.length,
//                         text: action.payload
//                     }
//                 ]
//             };
//         case DELETE_CITY_FROM_LIST:
//             return {
//                 ...state,
//                 cityList: [
//                     ...state.cityList
//                         .filter( item => item.id !== action.payload.id)
//                         .map((item, i) => {return { id: i, text: item.text}})
//                 ]                
//             };
//         default:
//             return state;
//     }
// }

export default reducer;