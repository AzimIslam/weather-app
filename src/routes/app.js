// We import preact-router so we can handling routing in this application
// This ensures that any URL path entered is redirected to right page stored 
// in the routes folder
import { Router } from 'preact-router';

// This imports the two main pages: Home & Weather from the folder
import Home from './Home';
import Weather from './Weather';

const App = () => (
	<div id="app">
		{/* We import this so we can use Material icons */}
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
		<Router>
			{/* If the URL path is '/' it redirects you to the home page */}
			<Home path="/"/>

			{/*
			 If the URL path is '/' followed by longitude and latitude it will display a weather page
			 for that location
			*/}
			<Weather path="/weather/:long/:lat" />
		</Router>
	</div>
)

export default App;
