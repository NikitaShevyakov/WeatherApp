import { Box } from '@mui/material';
import './WeatherCard.scss';

const WeatherCard = (props) => {
    const {dayOfWeek, image, temperature, description, wind} = props;

    const boxesProps = {
        width: 1,
        height: 'auto',
        minHeight: 100,
        color:"white",
        borderRadius: 1,
        bgcolor: '#ffffff5e',
        boxShadow: 2
    };

    return  <Box sx={boxesProps}  display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="weather-card">
        <div className="weather-card__date">{dayOfWeek}</div>
        <div className="weather-card__image"><img src={image} alt=""/></div>
        <div className="weather-card__temperature">{temperature}</div>
        <div className="weather-card__description">{description}</div>
        <div className="weather-card__info">Wind: {wind} m/s</div>
    </Box>
}

export default WeatherCard;