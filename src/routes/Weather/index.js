/* Imports Material framework and CSS files */
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';



const Weather = ({long, lat}) => {
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";
    // Makes an API call to OpenWeather check browser console for response
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then((response) => {
            console.log(response.json());
        });

    return (
        <div>
            <h1>Longtitude: {long}</h1>
            <h1>Latitude: {lat}</h1>
        </div>
    );
};

export default Weather;