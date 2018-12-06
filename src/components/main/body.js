import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../login'
import Register from '../register'
import ResetPassword from "../resetPassword";
import Home from "../home";
import GetKey from "../key";
import ZanShangComponent from "../key/zanshang";
import User from "../user";


export default class Body extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/zanshang' component={ZanShangComponent}/>

                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/reset' component={ResetPassword}/>
                    <Route path='/getKey' component={GetKey}/>
                    <Route path='/user' component={User}/>
                </Switch>
            </main>
        )
    }

}