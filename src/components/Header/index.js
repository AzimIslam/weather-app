import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';
import { useState } from 'preact/hooks';

const header = ({city, temp, weather, windSpeed, sunset, sunrise}) => {
    const [safety, setSafety] = useState("");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', {month: 'long'});
    const currentDate = days[dateObj.getDay()-1] + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();

    if (weather == "Sunny") setSafety("Good");
    else if (weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6) setSafety("Poor");
    else setSafety("Moderate");


    return (
        <div id={styles.header}> 
            <Typography headline2 id={styles.weatherText}>WEATHER</Typography><Typography headline3 id={styles.cityText}>{city}</Typography>
            <Typography id={styles.date}>{currentDate}</Typography>
            <Typography headline2 id={styles.temp}>{Math.round(temp)}&deg;</Typography>
            <Typography headline4 id={styles.weather}>{weather}</Typography>
            <Typography headline4 id={styles.windSpeed}>Wind Speed: {windSpeed} MPH</Typography>
            <Typography id={styles.sunset}>Sunset time: {sunset}</Typography>
            <Typography id={styles.sunrise}>Sunrise time: {sunrise}</Typography>
            <Typography id={styles.safety} headline6>SAFETY SCORE: { weather == "Sunny" ? <span id={styles.good}>GOOD</span>: weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6 ? <span id={styles.poor}>POOR</span>: <span id={styles.moderate}>MODERATE</span>}</Typography>
            <Typography id={styles.safetyAdvice} headline6>{safety == "Good" ? <span id={styles.good}>PERFECT CONDITIONS, MINIMAL CHANCE OF INJURY</span> : safety == "Moderate" ? <span id={styles.moderate}>TAKE CAUTION, MODERATE CHANCE OF INJURY</span> : <span id={styles.poor}>NOT RECOMMENDED, HIGH CHANCE OF INCIDENT</span>}</Typography>
        </div>
    );
}

export default header;