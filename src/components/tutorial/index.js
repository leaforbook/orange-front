import React from 'react';
import {
    Button,
    ButtonArea,
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter,
    SearchBar,
    PullToRefresh,
    InfiniteLoader,
    CellHeader,
    TabBarItem
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";


export default class TutorialList extends React.Component {
    constructor(props) {

        super(props);

    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <Page className="ptr" title="" subTitle="">
                    <CellsTitle>教程列表</CellsTitle>
                    <CellsTitle></CellsTitle>
                    <Cells>
                        <Cell access  onClick={(event) => { this.turnTO('/tutorial/video'); }}>
                            <CellHeader>
                            </CellHeader>
                            <CellBody>
                                完整视频教程
                            </CellBody>
                            <CellFooter>
                            </CellFooter>
                        </Cell>
                        <Cell access  onClick={(event) => { this.turnTO('/tutorial/product'); }}>
                            <CellHeader>
                            </CellHeader>
                            <CellBody>
                                创建产品图文教程
                            </CellBody>
                            <CellFooter>
                            </CellFooter>
                        </Cell>
                        <Cell access  onClick={(event) => { this.turnTO('/tutorial/order'); }}>
                            <CellHeader>
                            </CellHeader>
                            <CellBody>
                                下单图文教程
                            </CellBody>
                            <CellFooter>
                            </CellFooter>
                        </Cell>
                        <Cell access  onClick={(event) => { this.turnTO('/tutorial/deliver'); }}>
                            <CellHeader>
                            </CellHeader>
                            <CellBody>
                                发货图文教程
                            </CellBody>
                            <CellFooter>
                            </CellFooter>
                        </Cell>
                    </Cells>
                </Page>
            </div>
        )
    }
}