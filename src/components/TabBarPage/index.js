// Imports external CSS
import styles from './style.css';

// This imports the Typography from Material framework
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

// We import the useState hook so we can change the boldness of the font
// depending on which tab the use clicks
import { useState } from 'preact/hooks'; 


const TabBarPage = ({toggle}) => {
    // We create two states weeklyCss and hourlyCss
    // Initially weekly is made bold because thats the first table that is shown
    const [weeklyCss, setWeeklyCss] = useState({fontWeight: "bolder"})
    const [hourlyCss, setHourlyCss] = useState({});

    // This function makes the weekly font bold and sets the hourly font to normal
    // The prop toggle is a function so we pass true which changes the isWeekly state
    // in the weather route to true
    const toggleWeekly = () => {
        setWeeklyCss({fontWeight: "bolder"});
        setHourlyCss({fontWeight: "normal"});
        toggle(true);
    }

    // This function makes the weekly font normal and sets the hourly font to bold
    // The prop toggle is a function so we pass false which changes the isWeekly state
    // in the weather route to false
    const toggleHourly = () => {
        setWeeklyCss({fontWeight: "normal"});
        setHourlyCss({fontWeight: "bolder"});
        toggle(false);
    }

    return(
        <div className={styles.container}>
            {/* When the 'Weekly' text is clicked it calls the toggleWeekly() function */}
            <Typography onClick={toggleWeekly} style={weeklyCss} body1>Weekly</Typography>
            {/* When the 'Weekly' text is clicked it calls the toggleHourly() function */}
            <Typography onClick={toggleHourly} style={hourlyCss} body1>Hourly</Typography>
        </div>
    );

}

export default TabBarPage;