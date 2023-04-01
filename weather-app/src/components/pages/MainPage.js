import { useState } from 'react';
import WeatherView from '../weather/weatherView/WeatherView';
import WeatherCountryList from '../weather/weatherCountryList/WeatherCountryList';

import './MainPage.scss';

const MainPage = () => {  
  console.log('render');
  const [cityList, setCityList] = useState([]);

  const onAddCity = (value) => {
    setCityList([...cityList, {text: value, id: cityList.length}]);
  }

  const onDeleteCity = (value, i) => {   
    let newArr = cityList.filter(item => item.text !==  value && item.id !== i);
    setCityList(newArr);
  }
 
  return (
    <>
      <WeatherCountryList items={cityList} onDeleteCity={onDeleteCity}/>
      <WeatherView onAddCity={onAddCity}/>
    </>
  );
  
}

export default MainPage;
