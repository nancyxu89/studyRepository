// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ROOT from "./router";
import registerServiceWorker from "./registerServiceWorker";
// import App from './views/App/App';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<ROOT />, document.getElementById('root'));

registerServiceWorker();
