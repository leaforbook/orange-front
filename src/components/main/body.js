import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../login'
import Register from '../register'


export default class Body extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </main>
        )
    }

}