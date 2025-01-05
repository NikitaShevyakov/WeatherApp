import { Grid2, Box } from '@mui/material';

const WeatherCurrentCard = (props) => {
    const {city, country, image, temperature, description, wind, feelsLike, humidity, pressure} = props;

    const boxProps = {
        width: 1,
        height: 'auto',
        minHeight: 100,
        color:"white",
        borderRadius: 1,
        bgcolor: '#ffffff5e',
        my: 2, //margin top/bottom
        padding: 2,
        boxShadow: 2
    };

    return <Box sx={boxProps} className="weather-current-card">
        <h2 style={{margin:10}}>{city} ({country})</h2>
        <Grid2 container spacing={2} sx={{ fontSize: 24 }}>
            <Grid2 size='grow'>
                <div><img src={image} alt=""/></div>
                <h3>{temperature}</h3>
                <p>{description}</p>
            </Grid2>
            <Grid2 size='grow'>
                <p>Feels like: {feelsLike}</p>
                <p>Humidity: {humidity}%</p>
                <p>Pressure: {pressure}</p>
                <p>Wind: {wind} m/s</p>
            </Grid2>
        </Grid2>
    </Box>
}

export default WeatherCurrentCard;