import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/style.css';
const projectName = 'drum-machine-by-Yan Santos Policar';

(localStorage.getItem('project_name') === null) && localStorage.setItem('project_name', projectName);

ReactDOM.render(<App />, document.getElementById('root'));

