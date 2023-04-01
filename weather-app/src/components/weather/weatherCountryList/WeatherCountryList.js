import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';

import './WeatherCountryList.scss';

const WeatherCountryList = (props) => {   
    const {onDeleteCity} = props; 
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.items)
    });

    return (
        <div className='country-list'>            
            <div className="scrollbar" id="style-1">
                <div className='country-list__items'>
                    {items.map((item) => (
                        <Alert key={item.id} variant='light' className="item">
                            <Link to={`/${item.text.toLowerCase()}`} className="item__name">{item.text}</Link>
                            <CloseButton  onClick={() => onDeleteCity(item.text, item.id)}/>
                        </Alert>
                    ))}
                </div>
            </div>
        </div>
    )    
}

export default WeatherCountryList;