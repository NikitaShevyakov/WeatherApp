import WeatherView from '../components/weather/weatherView/WeatherView';
import WeatherCountryList from '../components/weather/weatherCountryList/WeatherCountryList';

import './MainPage.scss';

const MainPage = () => {  
    return (
        <>
            <WeatherCountryList/>
            <WeatherView/>
        </>
    );
  
}

export default MainPage;
