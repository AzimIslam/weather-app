import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

const HourTable = ({data}) => {
    return (
        <div>
            <div class={styles.row}>
                <Typography body1>TIME</Typography>
                <Typography body1>CONDITION</Typography>
                <Typography body1>WIND</Typography>
                <Typography body1>TEMP</Typography>
                <Typography body1>SAFETY</Typography>
            </div>
            {
                data.map((hour, index) => {
                return (
                    <div class={styles.row} key={index}>
                        <Typography class={styles.time} body1>{String(hour[0])}</Typography>
                        <Typography class={styles.weather} body1>{String(hour[1])}</Typography>
                        <Typography class={styles.windSpeed} body1>{String(hour[2])}</Typography>
                        <Typography class={styles.temp} body1>{String(hour[3])}</Typography>
                    </div>
                )
                })
            }
        </div>
    )
}

export default HourTable;