import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Dialog from 'preact-material-components/Dialog';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';
import Icon from 'preact-material-components/Icon';
import {useState} from 'preact/hooks';

const WeeklyTable = ({data}) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [dialogueBox, setDialogue] = useState();
    
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
                        <Icon onClick={()=>{ console.log("H")}} className={styles.icon}>
                            info
                        </Icon>      
                    </div>
                );
            })
        }

        </div>
}

export default WeeklyTable;