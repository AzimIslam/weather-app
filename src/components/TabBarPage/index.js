import styles from './style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import { useState } from 'preact/hooks'; 


const TabBarPage = ({toggle}) => {
    const [weeklyCss, setWeeklyCss] = useState({fontWeight: "bolder"})
    const [hourlyCss, setHourlyCss] = useState({});

    const toggleWeekly = () => {
        setWeeklyCss({fontWeight: "bolder"});
        setHourlyCss({fontWeight: "normal"});
        toggle();
    }

    const toggleHourly = () => {
        setWeeklyCss({fontWeight: "normal"});
        setHourlyCss({fontWeight: "bolder"});
        toggle();
    }

    return(
        <div className={styles.container}>
            <Typography onClick={toggleWeekly} style={weeklyCss} body1>Weekly</Typography>
            <Typography onClick={toggleHourly} style={hourlyCss} body1>Hourly</Typography>
        </div>
    );

}

export default TabBarPage;