import React, { Component } from 'react';
import { NavBarItem,Tab } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import {Button} from "../login";


export default class Header extends React.Component {

    render() {
        return (
            <div >
                <Tab type="navbar">
                    <NavBarItem label="微商代理助手"></NavBarItem>
                </Tab>
            </div>
        )
    }
}