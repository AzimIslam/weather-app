import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';
import { useState } from 'preact/hooks';
import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';

const header = ({city, temp, weather, windSpeed, sunset, sunrise}) => {
    const [safety, setSafety] = useState("");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', {month: 'long'});
    let currentDate;
    if (dateObj.getDay()-1 == -1) currentDate = "Sunday" + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();
    else currentDate = days[dateObj.getDay()-1] + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();

    if (weather == "Sunny") setSafety("Good");
    else if (weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6) setSafety("Poor");
    else setSafety("Moderate");

    return (
        <div id={styles.header}>
            <div> 
                <IconButton id={styles.search}>
                    <IconButton.Icon>search</IconButton.Icon>
                    <IconButton.Icon on >search</IconButton.Icon>
                </IconButton>
                <IconButton id={styles.location}>
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
                <Typography id={styles.safety} headline6>SAFETY SCORE: { weather == "Sunny" ? <span id={styles.goodScore}>GOOD</span>: weather == "Rain" || weather == "Snow" || Number(windSpeed) >= 6 ? <span id={styles.poorScore}>POOR</span>: <span id={styles.moderateScore}>MODERATE</span>}</Typography>
            </div>
            <Typography id={styles.safetyAdvice} headline6>{safety == "Good" ? <span id={styles.good}><Icon class={styles.icon}>check_circle</Icon>PERFECT CONDITIONS, MINIMAL CHANCE OF INJURY</span> : safety == "Moderate" ? <span id={styles.moderate}><Icon class={styles.icon}>warning</Icon>TAKE CAUTION, MODERATE CHANCE OF INJURY</span>: <span id={styles.poor}><Icon class={styles.icon}>error_outline</Icon>NOT RECOMMENDED, HIGH CHANCE OF INCIDENT</span>}</Typography>
        </div>
    );
}

export default header;