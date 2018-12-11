import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../login'
import Register from '../register'
import ResetPassword from "../resetPassword";
import Home from "../home";
import GetKey from "../key";
import ZanShangComponent from "../key/zanshang";
import User from "../user";
import ModifyPassword from "../modifyPassword";
import AuthorizedRoute from '../route';
import ModifyUserInfo from "../modifyUserInfo";
import ProductList from "../product";
import ProductEditor from "../product/edit";
import ProductDetail from "../product/detail";
import ProductGrant from "../product/grant";


export default class Body extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/reset' component={ResetPassword}/>
                    <Route path='/getKey' component={GetKey}/>


                    <AuthorizedRoute exact path='/' component={Home}/>
                    <AuthorizedRoute path='/home' component={Home}/>
                    <AuthorizedRoute path='/zanshang' component={ZanShangComponent}/>
                    <AuthorizedRoute path='/modify/:userName' component={ModifyPassword}/>
                    <AuthorizedRoute path='/user' component={User}/>
                    <AuthorizedRoute path='/modifyUser/:userName/:realName/:telephone' component={ModifyUserInfo}/>
                    <AuthorizedRoute path='/product/list' component={ProductList}/>
                    <AuthorizedRoute path='/product/edit' component={ProductEditor}/>
                    <AuthorizedRoute path='/product/detail/:productId' component={ProductDetail}/>
                    <AuthorizedRoute path='/product/grant/:productId/:productName' component={ProductGrant}/>

                </Switch>
            </main>
        )
    }

}