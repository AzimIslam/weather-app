/* Imports Material framework and CSS files */
import Typography from 'preact-material-components/Typography';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Typography/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import styles from './style.css';


// In-line CSS - adds space at the top of the button 
const searchBtnCss = { marginTop: "8px" };
const API_URL = "";
// This method is responsible for requesting the GPS location to the user
const requestGPS = () => {
	if (navigator.geolocation) {
		// TODO: Osman
		navigator.geolocation.getCurrentPosition(() => {
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={}`);
		});
	}
}

const Header = () => (
	<div className={styles.container} >
		<Typography headline3 className={styles.weatherText}>WEATHER</Typography>
		<div className={styles.formGroup}>
			<TextField class={styles.postcodeInput} label="Postcode" dense></TextField>
			<Button onTap={requestGPS} onClick={requestGPS} raised style={searchBtnCss} className="mdc-theme--primary-bg">Search</Button>
		</div>
		<Typography id={styles.OrText} headline3>OR</Typography>
		<Button onTouchStart={requestGPS} onClick ={requestGPS} raised style={{minWidth: "10%", cursor: "pointer"}}>Locate me</Button>
	</div>
);

export default Header;
