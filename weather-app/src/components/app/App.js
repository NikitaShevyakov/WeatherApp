import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import './App.scss';

const MainPage = lazy( () => import('../pages/MainPage'));
const Page404 = lazy( () => import('../pages/404'));
const WeatherInfoPage = lazy( () => import('../pages/WeatherInfoPage'));

const App = () => {  
 
    return (
        <div className="App">  
            <Router>
                <Suspense fallback={<Spinner/>}>
                    <Switch>
                        <Route exact path={"/"}>
                            <MainPage/>
                        </Route>
                        <Route exact path={"/:cityName"}>
                            <WeatherInfoPage/>
                        </Route>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </Suspense>                
            </Router>        
        </div>
    );
  
}

export default App;
