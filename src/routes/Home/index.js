
import Typography from 'preact-material-components/Typography';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Typography/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Button/style.css';

// This imports the CSS stylesheet
import styles from './style.css';

// This allows for routing within the web application 
import { route } from 'preact-router';

// We import this so we can create states in this component
import { useState } from 'preact/hooks';


// In-line CSS - adds space at the top of the button 
const searchBtnCss = { marginTop: "8px" };


// This method is responsible for requesting the GPS location to the user
const requestGPS = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(redirectViaGPS);
	}
}

// Extracts the coordinates from the geolocation API and redirects to /Weather with the longitude and latitude
// as parameters
const redirectViaGPS = (pos) => {
	route(`/weather/${pos.coords.longitude}/${pos.coords.latitude}`);
}

const Home = () => {
	// We create this state, so it keeps tracks of what the user types into the textbox
	const [postcode, setPostcode] = useState('');

	// This functions does an API call and retrieves the postcode latitude and longitude and passes that
	// as a parameter to /weather route
	const searchViaPostcode = () => {
		fetch(`https://api.postcodes.io/postcodes/${postcode}`)
			.then(response => response.json())
			.then(data => route(`/weather/${data["result"]["longitude"]}/${data["result"]["latitude"]}`))
			.catch(() => alert("Please enter a valid postcode"));
		}
	return(
		<div id={styles.homeBody}>
			<div className={styles.container} >
				{/* Weather Title */}
				<Typography headline3 className={styles.weatherText}>WEATHER</Typography>
				{/* This div stores the components for searching via postcode */}
				<div className={styles.formGroup}>
					<TextField onChange={(e) => setPostcode(e.target.value)} className={styles.postcodeInput} label="Postcode" dense></TextField>
					<Button onTap={searchViaPostcode} onClick={searchViaPostcode} raised style={searchBtnCss} className="mdc-theme--primary-bg">Search</Button>
				</div>
				{/* Or Text*/}
				<Typography id={styles.OrText} headline3>OR</Typography>
				{/* This 'Locate Me' button calls our requestGPS method */}
				<Button onTouchStart={requestGPS} onClick ={requestGPS} raised style={{minWidth: "10%", cursor: "pointer"}}>Locate me</Button>
			</div>
	</div>
	);
};

export default Home;
