import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';
import { useState } from 'preact/hooks';
import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';
import { route } from 'preact-router';

const header = ({setSunrise, setSunset, setWeather, setCity, setTemp, setWindSpeed, setHourlyData, setWeeklyData, city, temp, weather, windSpeed, sunset, sunrise}) => {
    const [safety, setSafety] = useState("");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', {month: 'long'});
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";

    // This method is responsible for requesting the GPS location to the user
    const requestGPS = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(makeRequestWrapper);
        }
    }

    const makeRequestWrapper = (pos) => {
        makeRequest(pos.coords.longitude, pos.coords.latitude);
    }

    // Extracts the coordinates from the geolocation API and redirects to /Weather
    const makeRequest = (long, lat) => {
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

            for (let i = 0; i < 5; i++) {
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


        fetch(`https://api.opencagedata.com/geocode/v1/json?key=3fa2e1ede77540178aeaca6cd287df1e&q=${lat}%2C+${long}&pretty=1&no_annotations=1`)
            .then(response => response.json())
            .then(data2 => {
                data2 = setCity(data2["results"]["0"]["components"]["city"])
            });
    }

    const searchViaPostcode = () => {
        let postcode = prompt("Enter postcode");
		fetch(`https://api.postcodes.io/postcodes/${postcode}`)
			.then(response => response.json())
			.then(data => {
                makeRequest(data["result"]["longitude"], data["result"]["latitude"])
            }).catch((e) => console.log(e));
		}

    let currentDate;
    if (dateObj.getDay()-1 == -1) currentDate = "Sunday" + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();
    else currentDate = days[dateObj.getDay()-1] + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();

    if (weather == "Sunny" || weather == "Clear") setSafety("Good");
    else if (weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6 ) setSafety("Poor");
    else setSafety("Moderate");

    let style;

    if (weather == "Rain" || weather == "Drizzle") style = styles.rain;
    else if (weather == "Clear" || weather == "Clouds") style = styles.cloudy;
    else if (weather == "Snow") style = styles.snow;
    else if (weather == "Sunny") style = styles.sunny;
    else if (weather == "Thunder") style = styles.thunder;

    return (
        <div id={style}>
            <div> 
                <IconButton onClick={searchViaPostcode} id={styles.search}>
                    <IconButton.Icon>search</IconButton.Icon>
                    <IconButton.Icon on >search</IconButton.Icon>
                </IconButton>
                <IconButton onClick={requestGPS} id={styles.location}>
                    <IconButton.Icon>location_on</IconButton.Icon>
                    <IconButton.Icon on >location_on</IconButton.Icon>
                </IconButton>
            </div>
            <div id={styles.headerInfo}>
                <Typography headline2 id={styles.weatherText}>WEATHER</Typography><Typography headline3 id={styles.cityText}>{city}</Typography>
                <Typography id={styles.date}>{currentDate}</Typography>
                <Typography headline2 id={styles.temp}>{Math.round(temp)}&deg;</Typography>
                <Typography headline4 id={styles.weather}>{weather}</Typography>
                <Typography headline4 id={styles.windSpeed}>Wind Speed: {windSpeed} MPH</Typography>
                <Typography id={styles.sunset}>Sunset time: {sunset}</Typography>
                <Typography id={styles.sunrise}>Sunrise time: {sunrise}</Typography>
                <Typography id={styles.safety} headline6>SAFETY SCORE: { weather == "Sunny"|| weather == "Clear" ? <span id={styles.goodScore}>GOOD</span>: weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6 ? <span id={styles.poorScore}>POOR</span>: <span id={styles.moderateScore}>MODERATE</span>}</Typography>
            </div>
            <Typography id={styles.safetyAdvice} headline6> {
                safety == "Good" ? <div><Icon class={styles.iconGreen}>check_circle</Icon><span id={styles.good}>GOOD CONDITIONS, LOW CHANCE OF INJURY</span></div> : 
                safety == "Moderate" ? <div><Icon class={styles.iconCoral}>warning</Icon><span id={styles.moderate}>TAKE CAUTION, MODERATE CHANCE OF INJURY</span></div>: 
                <div><Icon class={styles.iconRed}>error_outline</Icon><span id={styles.poor}>NOT RECOMMENDED, HIGH CHANCE OF INCIDENT</span></div>
            }
            </Typography>
        </div>
    );
}

export default header;