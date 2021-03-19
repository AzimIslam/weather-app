import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

const WeeklyTable = ({data}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
                    <Typography class={styles.windSpeed}body1>{String(day[1])} MPH</Typography>
                </div>
                );
            })
        }
    </div>
}

export default WeeklyTable;