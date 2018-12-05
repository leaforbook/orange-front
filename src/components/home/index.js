import React, {Component} from 'react';

import {
    Tab,
    TabBarItem,
    Article
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import DaoHangDark from '../../images/daohang-d.png';
import GeRenDark from '../../images/geren-d.png';
import '../../item.css';


export default class Home extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            daohang: <img src={DaoHangDark}/>,
            geren:<img src={GeRenDark}/>,
        }
    }

    render() {
        return (
            <div className="main_wrapper" >
                <Tab type="tabbar" >
                    <TabBarItem icon={this.state.daohang} label="发现">
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
                    <TabBarItem icon={this.state.geren} label="我">
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