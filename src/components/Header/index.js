import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import styles from './style.css';


const header = ({city, temp, weather, windSpeed, sunset, sunrise}) => {

    return (
        <div id={styles.header}> 
            <Typography headline2>WEATHER</Typography>
            <Typography headline3>{city}</Typography>
            <Typography headline2>{Math.round(temp)}&deg;</Typography>
            <Typography headline4>{weather}</Typography>
            <Typography headline4>Wind Speed: {windSpeed} MPH</Typography>
        </div>
    );
}

export default header;