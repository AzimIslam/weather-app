/* Imports Material framework and CSS files */
import 'preact-material-components/TabBar/style.css';
import 'preact-material-components/Typography/style.css';
import {h, Component} from 'preact';
import TabBar from 'preact-material-components/TabBar';
import 'preact-material-components/TabBar/style.css';
import styles from './style.css';
import {useState, useEffect} from 'preact/hooks';
import Header from '../../components/Header';
import WeeklyTable from '../../components/WeeklyTable';



const Weather = ({long, lat}) => {
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        // Makes an API call to OpenWeather check browser console for response
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            var time1 = new Date(data['current']['sunset'] * 1000);
            var time2 = new Date(data['current']['sunrise'] * 1000);
            setSunset(time1.getHours() + ":" + String(time1.getMinutes()).padStart(2, "0"));
            setSunrise(String(time2.getHours()).padStart(2, "0") + ":" + String(time2.getMinutes()).padStart(2, "0"));
            setWeather(data['current']['weather'][0]['main']);
            setTemp(data['current']['temp']);
            setWindSpeed(data['current']['wind_speed']);

            // Formats weekly data
            let tempArray = []

            
            for(let i = 1; i < 7; i++) {
                let dayTemp = Math.round(data['daily'][i]["temp"]["max"]);
                let dayWindSpeed = Math.round(data['daily'][i]['wind_speed'])
                let daySunset = new Date(data['daily'][i]['sunset'] * 1000)
                let daySunrise = new Date(data['daily'][i]['sunrise'] * 1000)
                let dayWeather = data['daily'][i]['weather'][0]['main'];
                tempArray.push([dayTemp, dayWindSpeed, daySunset, daySunrise, dayWeather]);
            }

            // Sets the weeklyData state to the formatted weekly data
            setWeeklyData(tempArray);
        });

        fetch(`https://api.postcodes.io/outcodes?lon=${long}&lat=${lat}`)
            .then(response => response.json())
            .then(data => {
                fetch(`https://api.postcodes.io/postcodes?q=${data["result"][0]["outcode"]}`)
                    .then(response2 => response2.json())
                    .then(data2 => setCity(data2["result"][0]["region"]))
            });

        return;
    },[]);


    return (
        <div>
            <Header temp={temp} sunset={sunset} sunrise={sunrise} windSpeed={windSpeed} weather={weather} city={city}/>
            <WeeklyTable data={weeklyData}></WeeklyTable>
        </div>
    );
};

export default Weather;

