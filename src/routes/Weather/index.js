/* Imports Material framework and CSS files */
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';
import {useState, componentDidMount} from 'preact/hooks';


const Weather = ({long, lat}) => {
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);

    
    // Makes an API call to OpenWeather check browser console for response
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            var time1 = new Date(data['current']['sunset'] * 1000);
            var time2 = new Date(data['current']['sunrise'] * 1000);
            setSunset(time1.getHours() + ":" + time1.getMinutes());
            setSunrise(time2.getHours() + ":" + time2.getMinutes());
            setWeather(data['current']['weather'][0]['main']);
            setTemp(data['current']['temp']);
            setWindSpeed(data['current']['wind_speed']);
        });
        


    return (
        <div>
            <h1>Longtitude: {long}</h1>
            <h1>Latitude: {lat}</h1>
            <p>{sunset}, {sunrise}, {weather}, {temp}, {windSpeed}</p>
        </div>
    );
};

export default Weather;

