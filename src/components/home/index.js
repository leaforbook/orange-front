import React, {Component} from 'react';

import {
    Tab,
    TabBarItem,
    Article
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import DaoHangDark from '../../images/daohang-d.png';
import DaoHangLight from '../../images/daohang-l2.png';
import GeRenDark from '../../images/geren-d.png';
import GeRenLight from '../../images/geren-l2.png';
import '../../item.css';


export default class Home extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            daohang: <img src={DaoHangLight}/>,
            geren:<img src={GeRenDark}/>,
        }
    }

    clickDaoHang = (event) => {
        this.setState({daohang: <img src={DaoHangLight}/>});
        this.setState({geren: <img src={GeRenDark}/>});
    }

    clickGeRen = (event) => {
        console.log('ddd');
        this.setState({daohang: <img src={DaoHangDark}/>});
        this.setState({geren: <img src={GeRenLight}/>});
    }

    render() {
        return (
            <div className="main_wrapper">
                <Tab type="tabbar" >
                    <TabBarItem icon={this.state.daohang} label="发现" onClick={(event) => { this.clickDaoHang(); }}>
                        <Article>
                            <h1>Page 1</h1>
                            <section>
                                <h2 className="title">Heading</h2>
                                <section>
                                    <h3>1.1 Title</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute</p>
                                </section>
                            </section>
                        </Article>
                    </TabBarItem>
                    <TabBarItem icon={this.state.geren} label="我" onClick={(event) => { this.clickGeRen(); }}>
                        <Article>
                            <h1>Page 2</h1>
                            <section>
                                <h2 className="title">Heading</h2>
                                <section>
                                    <h3>2.1 Title</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute</p>
                                </section>
                            </section>
                        </Article>
                    </TabBarItem>
                </Tab>
            </div>

        );
    }
}