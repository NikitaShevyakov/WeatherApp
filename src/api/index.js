import request from "./request";

const data = {
    _apiBase: 'https://api.openweathermap.org/data/2.5/',
    _apiKey: 'appid=49cdea4466175e1fa7baefd57215d5c7', //my
    //_apiKey: 'appid=4c084b1a8061eeada6ecba832dd44a9f', // evgeniya
    _units: 'units=metric'
}

export const getWeather = async (lat, lon) => {
    const { _apiBase, _apiKey, _units} = data;
    const res = await request(`${_apiBase}weather?lat=${lat}&lon=${lon}&${_apiKey}&${_units}`);   
    return _transformWeatherData(res);
}

export const getWeatherByCityName = async (city) => {
    const { _apiBase, _apiKey, _units} = data;
    const res = await request(`${_apiBase}weather?q=${city}&${_apiKey}&${_units}`);        
    return _transformWeatherData(res);
}


export const getWeatherOneCall = async (lat, lon) => {
    const { _apiBase, _apiKey, _units} = data;
    const days = await request(`${_apiBase}forecast?lat=${lat}&lon=${lon}&${_apiKey}&${_units}`);

    return {
        days : _transformWeatherDataToDaily(days.list)
    }
}

const _transformWeatherData = (weather) => {
    return {            
        city: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        long: weather.coord.lon,
        temperature: convertTemp(weather.main.temp),
        description: weather.weather[0].main,
        image: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        wind: weather.wind.speed,
        feelsLike: convertTemp(weather.main.feels_like),
        clouds: weather.clouds.all
    }
}

const convertTemp = (temp) =>{
    let value = temp > 0 ? `+${Math.round(temp)}` : Math.round(temp);       
    return `${value} °С`;
}

const _transformWeatherDataToDaily = (weather) => {
    let daily = new Map();

    weather.map(item => {
        let dateOfTheMonth = converTimeStampToDate(item.dt);
        if(daily.has(dateOfTheMonth)){
            let newObj = daily.get(dateOfTheMonth);
            newObj.AddTimeSpan(item);
        } else {
            let obj = new Daily(item);     
            daily.set(obj.date.dayOfMonth, obj);
        }    
    });    
    
    return daily;
}

const converTimeStampToDayOfWeek = (timestamp) => {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[new Date(timestamp*1000).getDay()]
    return dayOfWeek;
}

const converTimeStampToDayOfWeekShort = (timestamp) => {
    var days = ['Sun.','Mon.','Tues.','Wed.','Thurs.','Fri.','Sat.'];
    var dayOfWeek = days[new Date(timestamp*1000).getDay()]
    return dayOfWeek;
}

const converTimeStampToDate = (timestamp) => {
    var date = new Date(timestamp*1000).getDate()
    return date;
}

class Daily{
    list = new Map();

    constructor(data) {
        this.date = {
            dt: data.dt,
            dayOfWeek: converTimeStampToDayOfWeek(data.dt),
            dayOfWeekShort: converTimeStampToDayOfWeekShort(data.dt),
            dayOfMonth: converTimeStampToDate(data.dt)
        };            
        this.AddTimeSpan(data);
    }

    AddTimeSpan(tsItem){
        if(!this.list.size){               // add first item
            let item = this.GetItem(tsItem);
            this.list.set(item.time ,item);
        } else { 
            let item = this.GetItem(tsItem);
            if(!this.list.has(item.time)){      // check if there is an item in the dictionary
                this.list.set(item.time, item); // add item
            }
        }            
    }

    GetItem = (item) => {
        return {
            time: getTime(item.dt),
            temperature: convertTemp(item.main.temp),
            description: item.weather[0].description,
            image: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            wind: item.wind.speed
        };
    }
}

const converTimeStampToAMPM = (timestamp) => {
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours 
        ? hours 
        : ampm == 'am'
            ? 0
            : 12 ; 

    return {
        strTime: `${hours}:${minutes < 10 ? '0'+minutes : minutes} ${ampm}`,
        hours: hours,
        minutes: minutes,
        ampm: ampm
    };
}

const getTime = (timeSpan) => {
    let time = converTimeStampToAMPM(timeSpan);
    let isNight = (time.ampm == 'am' && time.hours >= 0 && time.hours <= 4)
        || (time.ampm == 'pm' && time.hours >= 9 && time.hours <= 12);
    let isMorning = time.ampm == 'am' && time.hours > 4 && time.hours <= 9;
    let isDay = (time.ampm == 'am' && time.hours > 9 && time.hours < 12)
        || (time.ampm == 'pm' && (time.hours == 12 || (time.hours >=1 && time.hours <= 4)));
    let isEvening = (time.ampm == 'pm' && time.hours >= 5 && time.hours < 9);

    return isNight ? 'Night'
        : isMorning ? 'Morning'
        : isDay ? 'Day'
        : isEvening ? 'Evening'
        : '';
}
