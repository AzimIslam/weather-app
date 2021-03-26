/* We import preact hooks useState and useEffect which will be used to call the API store the values
returned by the API */
import {useState, useEffect} from 'preact/hooks';

// We import the components that we created: Header, WeeklyTable, HourTable and TabBar page
// This is so we can load the components on this page
import Header from '../../components/Header';
import WeeklyTable from '../../components/WeeklyTable';
import HourTable from '../../components/HourTable';
import TabBarPage from '../../components/TabBarPage';



const Weather = ({long, lat}) => {
    // OpenWeatherAPI key
    const API_KEY = "b95e4f874db44d7934ee330883a8cf24";
    
    // We create these states so we can pass them onto the Header components
    // which will display these
    const [sunset, setSunset] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);

    // We create these states so our WeeklyTable and HourlyTable components
    // can retrieve the date from here
    const [weeklyData, setWeeklyData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    

    // This state is used to determine if the weekly table or hourly table is being displayed
    const [isWeekly, setIsWeekly] = useState(true);

    //  A method that sets the state of isWeekly
    const toggleTable = (bool) => {
        setIsWeekly(bool)
    }
    
    useEffect(() => {
        // Makes an API call to OpenWeather by passing the latitude and longitude, as well as the API key
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // We store the sunset and sunrise time in a Date object so we can convert it from Unix Time to normal time
            var time1 = new Date(data['current']['sunset'] * 1000);
            var time2 = new Date(data['current']['sunrise'] * 1000);

            // We then set the state of sunrise and set
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

            // Sets the hourlyData state to the array we had created before
            setHourlyData(tempHours);

        });

        // We make an API call to opencagedata by passing our latitude and longitude
        // We do this so we can get the city name via the latitude and longitude
        // If the API call is successful we set the city state
        fetch(`https://api.opencagedata.com/geocode/v1/json?key=3fa2e1ede77540178aeaca6cd287df1e&q=${lat}%2C+${long}&pretty=1&no_annotations=1`)
        .then(response => response.json())
        .then(data2 => {
            data2 = setCity(data2["results"]["0"]["components"]["city"])
        });

    },[]);

    return (
        <div>
            {
                /* We add the header component and pass sunrise, sunset, weather, city, temp, hourlyData, weeklyData as props
                as well as their setter functions*/
            }
            <Header setSunrise={setSunrise} setSunset={setSunset} setWeather={setWeather} setCity={setCity} setTemp={setTemp} setWindSpeed={setWindSpeed} setHourlyData={setHourlyData} setWeeklyData={setWeeklyData} temp={temp} sunset={sunset} sunrise={sunrise} windSpeed={windSpeed} weather={weather} city={city}/>
            
            {
                // We check that the state of isWeekly - if it is true it will show the weather data for each days
                // However, if it false it will show weather data for each hour
                isWeekly ? <WeeklyTable data={weeklyData}></WeeklyTable> : <HourTable data={hourlyData}></HourTable>
            }

            {/* We add the TabBar page components and pass the function 'toggleTable' as a prop */}
            <TabBarPage toggle={toggleTable} />
        </div>
    );
};

export default Weather;

