import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Icon from 'preact-material-components/Icon';

const HourTable = ({data}) => {
    return (
        <div className={styles.container} scrollable={true}>
            <div className={styles.row}>
                    <Typography class={styles.time} body1><strong>TIME</strong></Typography>
                    <Typography class={styles.weather} body1><strong>COND</strong></Typography>
                    <Typography class={styles.windSpeed} body1><strong>WIND</strong></Typography>
                    <Typography class={styles.temp} body1><strong>TEMP</strong></Typography>
                    <Typography class={styles.safety} body1><strong>SAFETY</strong></Typography>
            </div>
            {
                data.map((hour, index) => {
                return (
                    <div class={styles.row} key={index}>
                        <Typography class={styles.time} body1>{String(hour[0])}</Typography>
                        <Typography class={styles.weather} body1>{String(hour[1])} </Typography>
                        <Typography class={styles.windSpeed} body1>{String(hour[2])} MPH</Typography>
                        <Typography class={styles.temp} body1>{String(hour[3])}&deg;</Typography>
                        {
                            String(hour[1]) == "Sunny" || String(hour[1]) == "Clear" ? <Icon className={styles.good}>check_circle</Icon>:
                            String(hour[1]) == "Rain" || String(hour[1]) == "Snow" || Number(hour[2]) >= 25 ? <Icon className={styles.poor}>error_outline</Icon>:
                            <Icon className={styles.moderate}>warning</Icon>
                        }
                    </div>
                )
                })
            }
        </div>
    )
}

export default HourTable;