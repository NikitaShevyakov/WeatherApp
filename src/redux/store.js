// import { createStore, applyMiddleware, compose } from 'redux';
 import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
//  import reducer from './reducers/index';
import cityListReducer from './reducers/cityList';
import weatherReducer from './reducers/weather';
import rootSaga from './sagas';

 const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = 
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const configureStore = preloadedState => createStore(
//   reducer,
//   preloadedState,
//   composeEnhancers(applyMiddleware(sagaMiddleware)),
// );

// const store = configureStore({});

const store = configureStore({
  reducer: { cityListReducer, weatherReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export default store;