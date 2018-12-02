import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './components/login';
import Register from "./components/register";
import FastClick from 'fastclick';
import {
    Switch,
    HashRouter,
    Route
} from 'react-router-dom';

window.addEventListener('load', () => {
    FastClick.attach(document.body);
});

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];

const App = (props, context) =>
    (
        <HashRouter>
            <Switch>
                {
                    routes.map( route=> (
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
                    ))
                }
            </Switch>
        </HashRouter>
    );

export default App;

ReactDOM.render((<App/>), document.getElementById('root'));



