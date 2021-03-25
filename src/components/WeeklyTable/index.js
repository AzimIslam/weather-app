import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Icon from 'preact-material-components/Icon';
import PopupBox from './../PopupBox/';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

const WeeklyTable = ({data}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    const goToInfo = () => {
        route('/info/1/1/1/1/1/')
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
                        <Icon onClick={goToInfo} className={styles.icon} native>info</Icon> 
                        <PopupBox/>
                    </div>
                );
            })
        }

        </div>
}

export default WeeklyTable;