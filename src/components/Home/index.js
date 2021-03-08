/* Imports MaterialUI framework and CSS files */
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


// This method is responsible 
const requestGPS = () => {
	if (navigator.geolocation) {
		prompt(navigator.geolocation.latitude);
	} else {
	navigator.geolocation.getCurrentPosition(function(location) {
		console.log(location.coords.latitude);
		console.log(location.coords.longitude);
		console.log(location.coords.accuracy);
		prompt(location.coords.latitude);
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
