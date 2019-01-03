import React, {Component} from 'react';

import {
    Tab,
    TabBarItem,
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import DaoHangDark from '../../images/daohang-d.png';
import GeRenDark from '../../images/geren-d.png';
import '../../item.css';
import ChanPin from '../../images/chanpin.png';
import DingDan from '../../images/dingdan.png';
import FaHuo from '../../images/fahuo.png';
import GeRenFill from '../../images/geren_fill.png';
import AiXin from '../../images/aixin.png';
import Tutorial from '../../images/tutorial.png';


export default class Home extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            daohang: <img src={DaoHangDark}/>,
            geren:<img src={GeRenDark}/>,
            tableIndex:sessionStorage.getItem("leaforbook-tableIndex")===null?0:parseInt(sessionStorage.getItem("leaforbook-tableIndex"))
        }
    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    changeTableIndex = (event) => {
        this.setState({
            tableIndex : event
        });
        sessionStorage.setItem("leaforbook-tableIndex",event);
    }

    render() {
        return (
            <div  >
                <Tab type="tabbar" defaultIndex={this.state.tableIndex} onChange={this.changeTableIndex.bind(this)}>
                    <TabBarItem icon={this.state.daohang} label="发现" >

                        <div className="fill_space"> </div>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access   onClick={(event) => { this.turnTO('/product/list'); }}>
                                <CellHeader>
                                    <img src={ChanPin} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    产品
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access  onClick={(event) => { this.turnTO('/order/list'); }}>
                                <CellHeader>
                                    <img src={DingDan} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    订单
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access onClick={(event) => { this.turnTO('/logistics'); }}>
                                <CellHeader>
                                    <img src={FaHuo} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    发货
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>


                    </TabBarItem>
                    <TabBarItem icon={this.state.geren} label="我" >
                        <div className="fill_space"> </div>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access  onClick={(event) => { this.turnTO('/user'); }}>
                                <CellHeader>
                                    <img src={GeRenFill} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    个人
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access  onClick={(event) => { this.turnTO('/tutorial/list'); }}>
                                <CellHeader>
                                    <img src={Tutorial} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    教程
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access  onClick={(event) => { this.turnTO('/zanshang'); }}>
                                <CellHeader>
                                    <img src={AiXin} alt="" style={{display: `block`, width: `20px`, marginRight: `5px`}}/>
                                </CellHeader>
                                <CellBody>
                                    捐助
                                </CellBody>
                                <CellFooter>

                                </CellFooter>
                            </Cell>
                        </Cells>
                    </TabBarItem>

                </Tab>
            </div>

        );
    }
}