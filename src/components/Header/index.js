import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';


const header = ({city, temp, weather, windSpeed, sunset, sunrise}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', {month: 'long'});
    const currentDate = days[dateObj.getDay()-1] + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();
    return (
        <div id={styles.header}> 
            <Typography headline2 id={styles.weatherText}>WEATHER</Typography><Typography headline3 id={styles.cityText}>{city}</Typography>
            <Typography id={styles.date}>{currentDate}</Typography>
            <Typography headline2 id={styles.temp}>{Math.round(temp)}&deg;</Typography>
            <Typography headline4 id={styles.weather}>{weather}</Typography>
            <Typography headline4 id={styles.windSpeed}>Wind Speed: {windSpeed} MPH</Typography>
            <Typography id={styles.sunset}>Sunset time: {sunset}</Typography>
            <Typography id={styles.sunrise}>Sunrise time: {sunrise}</Typography>
        </div>
    );
}

export default header;