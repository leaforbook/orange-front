import React, {Component} from 'react';

import {
    Tab,
    TabBarItem,
    Article
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import IconButton from 'weui/dist/example/images/icon_nav_button.png';
import IconMsg from 'weui/dist/example/images/icon_nav_msg.png';

export default class Home extends React.Component {
    render() {
        return (
                <Tab type="tabbar">
                    <TabBarItem icon={<img src={IconButton}/>} label="发现">
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
                    <TabBarItem icon={<img src={IconMsg}/>} label="我">
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
        );
    }
}