import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Componentify from './Componentify';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Componentify />, document.getElementById('root'));
registerServiceWorker();
