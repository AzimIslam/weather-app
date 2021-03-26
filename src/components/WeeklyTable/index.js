import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Icon from 'preact-material-components/Icon';

const WeeklyTable = ({data}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const buttonPressed = (windSpeed, cond, sunrise, sunset) => {
        let safety = cond == "Sunny" || cond  == "Clear" ? "Good":
        cond == "Rain" || cond == "Snow" || Number(windSpeed) >= 25 ? "Poor":
        "Moderate"
        alert(`Safety Rating: ${safety}\nWind Speed: ${windSpeed} MPH\nCondition: ${cond}\nSunrise Time: ${sunrise.getHours() + ":" + String(sunrise.getMinutes()).padStart(2, "0")}\nSunset Time: ${sunset.getHours() + ":" + String(sunset.getMinutes()).padStart(2, "0")}`)
    }
    return <div id={styles.container}> 
        {
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