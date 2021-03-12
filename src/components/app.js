import { h } from 'preact';
import { Router } from 'preact-router';

import Home from './Home';

const App = () => (
	<div id="app">
		
		<Router>
			<Home path="/"/>
			<Weather path="/weather/:longtitude/:latitude" />
		</Router>
	</div>
)

export default App;
