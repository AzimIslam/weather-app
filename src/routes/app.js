import { h } from 'preact';
import { Router } from 'preact-router';

import Home from './Home';
import Weather from './Weather';

const App = () => (
	<div id="app">
		
		<Router>
			<Home path="/"/>
			<Weather path="/weather/:long/:lat" />
		</Router>
	</div>
)

export default App;
