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


export default class Home extends React.Component {

    constructor(props) {

        super(props);

        console.log(localStorage.getItem("leaforbook-tableIndex"))
        this.state = {
            daohang: <img src={DaoHangDark}/>,
            geren:<img src={GeRenDark}/>,
            tableIndex:localStorage.getItem("leaforbook-tableIndex")===null?0:parseInt(localStorage.getItem("leaforbook-tableIndex"))
        }
    }

    turnTO = (path,event) => {
        console.log(this.state.tableIndex)
        localStorage.setItem("leaforbook-tableIndex",this.state.tableIndex)
        this.props.history.push(path);
    }

    changeTableIndex = (event) => {

        this.setState({
            tableIndex : 1,
        })
    }

    render() {
        return (
            <div  onClick={(event) => { this.changeTableIndex(); }}>
                <Tab type="tabbar" defaultIndex={this.state.tableIndex}>
                    <TabBarItem icon={this.state.daohang} label="发现" >

                        <div className="fill_space"> </div>

                        <CellsTitle></CellsTitle>
                        <Cells>
                            <Cell access>
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
                            <Cell access>
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
                            <Cell access>
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