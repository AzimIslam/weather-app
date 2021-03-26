// Imports external CSS
import styles from './style.css';

// This imports the Typography and Icon components from Material framework
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Icon from 'preact-material-components/Icon';

// The WeeklyTable component accepts data as a prop
const WeeklyTable = ({data}) => {
    // We create a static array called days which stores the days of the week
    // This will be used later on to identify the weather data specific day by looking at the index
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // We create this method to calculate the safety rating of a specific day and
    // show a popup box which displays the safety rating, wind speed, condition, sunrise time and
    // sunset time of that specific day
    const buttonPressed = (windSpeed, cond, sunrise, sunset) => {
        let safety = cond == "Sunny" || cond  == "Clear" ? "Good":
        cond == "Rain" || cond == "Snow" || Number(windSpeed) >= 25 ? "Poor":
        "Moderate"
        alert(`Safety Rating: ${safety}\nWind Speed: ${windSpeed} MPH\nCondition: ${cond}\nSunrise Time: ${sunrise.getHours() + ":" + String(sunrise.getMinutes()).padStart(2, "0")}\nSunset Time: ${sunset.getHours() + ":" + String(sunset.getMinutes()).padStart(2, "0")}`)
    }

    return <div id={styles.container}> 
        {
            // We use data.map so we can iterate through the weekly data provided and lay them out in a specific format
            // It also ensures that when we click a popup specific to that day will be shown
            data.map((day, index) => {
                return(
                    <div class={styles.row} key={index}>
                        <Typography class={styles.day}body1>
                            {
                                day[2].getDay() - 1 == -1 ? "Sunday": days[day[2].getDay() - 1]
                            }
                        </Typography>
                        <Typography class={styles.temp}body1>{String(day[0])}&deg;</Typography>
                        <Icon onClick={() => buttonPressed(day[1], day[4], day[2], day[3])} className={styles.icon} native>info</Icon> 
                    </div>
                );
            })
        }

        </div>
}

export default WeeklyTable;