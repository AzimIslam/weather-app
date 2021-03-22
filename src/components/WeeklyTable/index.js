import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Dialog from 'preact-material-components/Dialog';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';

const WeeklyTable = ({data}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const showDialogueBox = () => {
        
    }
    
    return <div id={styles.container} scrollable={true}>
        {
            data.map((day, index) => {
                return(
                    <div class={styles.row} key={index}>
                        <Typography class={styles.day}body1>
                            {
                                day[2].getDay() - 1 == -1 ? "Sunday": days[day[2].getDay() - 1]
                            }
                        </Typography>
                        <IconButton className={styles.icon}>
                            <IconButton.Icon>info</IconButton.Icon>
                            <IconButton.Icon on >info</IconButton.Icon>
                        </IconButton>
                        <Typography class={styles.temp}body1>{String(day[0])}&deg;</Typography>
                    </div>
                );
            })
        }
    </div>
}

export default WeeklyTable;