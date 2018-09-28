import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Service Worker will throw a error is not hosted under https
window.protocol === 'https:' && registerServiceWorker();
