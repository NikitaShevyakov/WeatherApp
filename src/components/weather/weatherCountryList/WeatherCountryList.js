import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';
import { useSelector, useDispatch } from "react-redux";
import { deleteCity } from '../../../redux/actions/actionCreator';

import './WeatherCountryList.scss';

const WeatherCountryList = () => {
    const {cityList} = useSelector(state => state.cityListReducer || []);
    const dispatch = useDispatch();
    
    const onClose = (id) => {
        const key = 'cityList';
        const items = (JSON.parse(localStorage.getItem(key)) ?? [])
            .filter(item => item.id !== id)
            .map((item, i) => {return { id: i, text: item.text}});
   
        localStorage.setItem(key, JSON.stringify([...items]));      
    }

    return (
        <div className='country-list'>            
            <div className="scrollbar" id="style-1">
                <div className='country-list__items'>
                    {cityList?.map((city) => (
                        <Alert key={city.id} variant='light' className="item">
                            <Link to={`/${city.text.toLowerCase()}`} className="item__name">{city.text}</Link>
                            <CloseButton  onClick={() => {
                                dispatch(deleteCity(city.id, city.text));
                                onClose(city.id);
                            }}/>
                        </Alert>
                    ))}
                </div>
            </div>
        </div>
    )    
}

export default WeatherCountryList;