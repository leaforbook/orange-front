import React, { Component } from 'react';
import { NavBarItem,Tab } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import {Button} from "../login";
import "../../item.css"


export default class Header extends React.Component {

    constructor(props) {

        super(props);

    }

    turnTO = (path,event) => {
        sessionStorage.setItem("leaforbook-tableIndex",0);
        window.location.href="/home"
    }

    render() {
        return (
            <div >
                <Tab type="navbar" onChange={(event) => { this.turnTO('/'); }}>
                    <NavBarItem label="Home"></NavBarItem>
                </Tab>

            </div>
        )
    }
}