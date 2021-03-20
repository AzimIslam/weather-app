import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

const HourTable = ({data}) => {
    return <div id={styles.container}>
        {
            data.map((hour, index) => {
                return(
                <div class={styles.row} key={index}>
                    <Typography class={styles.hour}>
                        {index}:00
                    </Typography>
                    <Typography class={styles.temp}>{String(day[0])}&deg;</Typography>
                    <Typography class={styles.windSpeed}>{String(day[1])} MPH</Typography>
                </div>
                );
            })
        }
    </div>
}

export default HourTable;
