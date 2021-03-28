// Imports external CSS
import styles from './style.css';

// We import preact hooks useState which stores the results of the API call
import { useState } from 'preact/hooks';

// Imports the Typography, Icon and IconButton component using the Material framework
import Typography from 'preact-material-components/Typography';
import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';
import 'preact-material-components/Typography/style.css';


const header = ({setSunrise, setSunset, setWeather, setCity, setTemp, setWindSpeed, setHourlyData, setWeeklyData, city, temp, weather, windSpeed, sunset, sunrise}) => {
    // This state is initialised so we can store the safety rating for today's current weather
    const [safety, setSafety] = useState("");

    // We create a static array called days which stores the days of the week
    // This will be used later on to identify the weather data specific day by looking at the index
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // We create a new date object to store todays' date
    const dateObj = new Date();
    const month = dateObj.toLocaleString('default', {month: 'long'});

    // Open Weather API key
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";

    // This method is responsible for requesting the GPS location to the user
    const requestGPS = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(makeRequestWrapper);
        }
    }

    // This method is a wrapper for the request GPS method as on line 20
    // a method needs to be passed. So this just directly calls makeRequest()
    const makeRequestWrapper = (pos) => {
        makeRequest(pos.coords.longitude, pos.coords.latitude);
    }

    // This method is responsible for making API requests using the longitude and latitude specified
    const makeRequest = (long, lat) => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            
            // We store the sunset and sunrise time in a Date object so we can convert it from Unix Time to normal time
            var time1 = new Date(data['current']['sunset'] * 1000);
            var time2 = new Date(data['current']['sunrise'] * 1000);

            // We then set the state of sunrise and sunset
            // We have to use the object methods: getHours() and getMinutes() so it can be formatted properly
            // We also use the methods padStart() so we can pad zeros
            setSunset(time1.getHours() + ":" + String(time1.getMinutes()).padStart(2, "0"));
            setSunrise(String(time2.getHours()).padStart(2, "0") + ":" + String(time2.getMinutes()).padStart(2, "0"));

            // We extract the weather, temperature and wind speed from the API call
            // and set the states in the component
            setWeather(data['current']['weather'][0]['main']);
            setTemp(data['current']['temp']);
            setWindSpeed(data['current']['wind_speed']);

            // We initialise an empty array that will store weather data for the next six days
            let tempDays = []
            
            // We loop through the array that contains weather data for individual days
            // that has been provided by the API and store them in temporary variables
            // We then put them in arrays and push them to tempDays making it a two dimensional
            // array
            for(let i = 1; i < 7; i++) {
                let dayTemp = Math.round(data['daily'][i]["temp"]["max"]);
                let dayWindSpeed = Math.round(data['daily'][i]['wind_speed'])
                let daySunset = new Date(data['daily'][i]['sunset'] * 1000)
                let daySunrise = new Date(data['daily'][i]['sunrise'] * 1000)
                let dayWeather = data['daily'][i]['weather'][0]['main'];
                tempDays.push([dayTemp, dayWindSpeed, daySunset, daySunrise, dayWeather]);
            }

            // Sets the weeklyData state to the array we had created before
            setWeeklyData(tempDays);

            // We initialise an empty array that will store weather data for the next five hours
            let tempHours = []

            // We loop through the array that contains weather data for individual hours
            // that has been provided by the API and store them in temporary variables
            // We then put them in arrays and push them to tempHours making it a two dimensional
            // array
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


        // We make an API call to opencagedata by passing our latitude and longitude
        // We do this so we can get the city name via the latitude and longitude
        // If the API call is successful we set the city state
       fetch(`https://api.opencagedata.com/geocode/v1/json?key=3fa2e1ede77540178aeaca6cd287df1e&q=${lat}%2C+${long}&pretty=1&no_annotations=1`)
        .then(response => response.json())
        .then(data2 => {
            if (data2["results"]["0"]["components"]["suburb"] != null){
                data2 = setCity(data2["results"]["0"]["components"]["suburb"])
            }
            else if (data2["results"]["0"]["components"]["city"] != null) {
                data2 = setCity(data2["results"]["0"]["components"]["city"])
            }
            else if (data2["results"]["0"]["components"]["town"] != null) {
                data2 = setCity(data2["results"]["0"]["components"]["town"])
            }
            else if (data2["results"]["0"]["components"]["village"] != null) {
                data2 = setCity(data2["results"]["0"]["components"]["village"])
            }
            else {
                data2 = setCity(data2["results"]["0"]["components"]["postcode"])
            }
        });
    }

    // This functions does an API call and retrieves the postcode latitude and longitude and passes that
	// as a parameter to /weather route
    const searchViaPostcode = () => {
        let postcode = prompt("Enter postcode");
		fetch(`https://api.postcodes.io/postcodes/${postcode}`)
			.then(response => response.json())
			.then(data => {
                makeRequest(data["result"]["longitude"], data["result"]["latitude"])
            }).catch((e) => console.log(e));
		}

    // We intialise a variable that will store the day for today
    let currentDate;

    // The day is extracted by using the getDay() method. This is done by pointing it to the index of the day - 1
    // However this algorithm won't be able to identify Sunday since the index will be -1 when the calculation will be applied
    // To resolve this, we check if the value is equals -1 and store Sunday automatically
    if (dateObj.getDay()-1 == -1) currentDate = "Sunday" + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();
    else currentDate = days[dateObj.getDay()-1] + " " + dateObj.getDate() + " " + month + " " + dateObj.getFullYear();

    // This algorithm is using to determine the safety rating by using today's weather data
    if (weather == "Sunny" || weather == "Clear") setSafety("Good");
    else if (weather == "Rain" || weather == "Snow" || weather == "Thunder" || Number(windSpeed) >= 25 ) setSafety("Poor");
    else setSafety("Moderate");

    // This variable is initalised so we can set the background of the header
    // which is determined by the weather
    let style;

    // These if statements check the weather and set the specific style ID
    // This is done since each style ID in the CSS file changes the background image
    if (weather == "Rain" || weather == "Drizzle") style = styles.rain;
    else if (weather == "Clouds") style = styles.cloudy;
    else if (weather == "Snow") style = styles.snow;
    else if (weather == "Sunny") style = styles.sunny;
    else if (weather == "Thunder") style = styles.thunder;
    else if (weather == "Clear") style = styles.clear

    return (
        // Creates a div and assigns its the ID which is determined by the
        // if statement above
        <div id={style}>
            <div> 
                {/* Displays these two icons that allows you search via postcode and request GPS*/}
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
                {/* Display info such as: 
                    Current Date
                    Temperature
                    Conditions
                    Wind Speed
                    Sunset Time
                    Sunrise Time
                    Safety Score
                */}
                <Typography headline2 id={styles.weatherText}>WEATHER</Typography><Typography headline3 id={styles.cityText}>{city}</Typography>
                <Typography id={styles.date}>{currentDate}</Typography>
                <Typography headline2 id={styles.temp}>{Math.round(temp)}&deg;</Typography>
                <Typography headline4 id={styles.weather}>{weather}</Typography>
                <Typography headline4 id={styles.windSpeed}>Wind Speed: {windSpeed} MPH</Typography>
                <Typography id={styles.sunset}>Sunset time: {sunset}</Typography>
                <Typography id={styles.sunrise}>Sunrise time: {sunrise}</Typography>
                <Typography id={styles.safety} headline6>SAFETY SCORE: { weather == "Sunny"|| weather == "Clear" ? <span id={styles.goodScore}>GOOD</span>: weather == "Rain" || weather == "Snow" || weather == "Thunder" || Number(windSpeed) >= 25 ?  <span id={styles.poorScore}>POOR</span>: <span id={styles.moderateScore}>MODERATE</span>}</Typography>
            </div>
            <Typography id={styles.safetyAdvice} headline6> {
                // This if statement determines the safety score and shows the relevant icon and advice that corresponds to it
                safety == "Good" ? <div><Icon class={styles.iconGreen}>check_circle</Icon><span id={styles.good}>GOOD CONDITIONS, LOW CHANCE OF INJURY</span></div> : 
                safety == "Moderate" ? <div><Icon class={styles.iconCoral}>warning</Icon><span id={styles.moderate}>TAKE CAUTION, MODERATE CHANCE OF INJURY</span></div>: 
                <div><Icon class={styles.iconRed}>error_outline</Icon><span id={styles.poor}>NOT RECOMMENDED, HIGH CHANCE OF INCIDENT</span></div>
            }
            </Typography>
        </div>
    );
}

export default header;