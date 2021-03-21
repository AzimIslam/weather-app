/* Imports Material framework and CSS files */
import 'preact-material-components/TabBar/style.css';
import 'preact-material-components/Typography/style.css';
import {useState, useEffect} from 'preact/hooks';
import Header from '../../components/Header';
import WeeklyTable from '../../components/WeeklyTable';

import HourTable from '../../components/HourTable';
import TabBarPage from '../../components/TabBarPage';



const Weather = ({long, lat}) => {
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [weeklyData, setWeeklyData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);

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

            console.log(data)

            // Formats weekly data
            let tempDays = []
            
            for(let i = 1; i < 7; i++) {
                let dayTemp = Math.round(data['daily'][i]["temp"]["max"]);
                let dayWindSpeed = Math.round(data['daily'][i]['wind_speed'])
                let daySunset = new Date(data['daily'][i]['sunset'] * 1000)
                let daySunrise = new Date(data['daily'][i]['sunrise'] * 1000)
                let dayWeather = data['daily'][i]['weather'][0]['main'];
                tempDays.push([dayTemp, dayWindSpeed, daySunset, daySunrise, dayWeather]);
            }

            // Sets the weeklyData state to the formatted weekly data
            setWeeklyData(tempDays);

            // Formats hourly data
            let tempHours = []

            for (let i = 0; i < 6; i++) {
                let hourObj = new Date(data['hourly'][i]['dt'] * 1000);
                let hour = hourObj.getHours() + ":00";
                let hourCondition = data['hourly'][i]['weather'][0]['main']
                let hourWindSpeed = Math.round(data['hourly'][i]['wind_speed'])
                let hourTemp = Math.round(data['hourly'][i]['temp']);
                tempHours.push([hour, hourCondition, hourWindSpeed, hourTemp]);
            }

            // Sets the hourlyData state to the formatted hourly data
            setHourlyData(tempHours);

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
            <TabBarPage />
        </div>
    );
};

export default Weather;

