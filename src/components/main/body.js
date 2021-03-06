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
import ProductPrice from "../product/price";
import ProductFreight from "../product/freight";
import Logistics from "../logistics";
import AddressEdit from "../logistics/address_edit";
import AddressDetail from "../logistics/address_detail";
import OrderEditor from "../order/order_edit";
import OrderDetail from "../order/order_detail";
import OrderList from "../order";
import TutorialList from "../tutorial";
import TutorialVideo from "../tutorial/video";
import TutorialProduct from "../tutorial/product";
import TutorialOrder from "../tutorial/order";
import TutorialDeliver from "../tutorial/deliver";


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
                    <AuthorizedRoute exact path='/product/edit' component={ProductEditor}/>
                    <AuthorizedRoute path='/product/edit/:productId' component={ProductEditor}/>
                    <AuthorizedRoute path='/product/detail/:productId' component={ProductDetail}/>
                    <AuthorizedRoute path='/product/grant/:productId/:productName' component={ProductGrant}/>
                    <AuthorizedRoute path='/product/price/:productId' component={ProductPrice}/>
                    <AuthorizedRoute path='/product/freight/:productId' component={ProductFreight}/>
                    <AuthorizedRoute path='/logistics' component={Logistics}/>
                    <AuthorizedRoute exact path='/address/edit' component={AddressEdit}/>
                    <AuthorizedRoute path='/address/edit/:addressId' component={AddressEdit}/>
                    <AuthorizedRoute path='/address/detail/:addressId' component={AddressDetail}/>
                    <AuthorizedRoute path='/order/edit/:productId' component={OrderEditor}/>
                    <AuthorizedRoute path='/order/detail/:orderId' component={OrderDetail}/>
                    <AuthorizedRoute path='/order/list' component={OrderList}/>
                    <AuthorizedRoute path='/tutorial/list' component={TutorialList}/>
                    <AuthorizedRoute path='/tutorial/video' component={TutorialVideo}/>
                    <AuthorizedRoute path='/tutorial/product' component={TutorialProduct}/>
                    <AuthorizedRoute path='/tutorial/order' component={TutorialOrder}/>
                    <AuthorizedRoute path='/tutorial/deliver' component={TutorialDeliver}/>

                </Switch>
            </main>
        )
    }

}