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
    Tab,
    NavBarItem
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class Logistics extends React.Component {


    turnTO = (path,event) => {
        console.log(path)
        this.props.history.push(path);
    }

    render() {
        return (
            <div>

                <Tab type="navbar">
                    <NavBarItem label="发货">

                        111

                    </NavBarItem>


                    <NavBarItem label="地址">


                        <div className="fixd_in_bottom">
                            <ButtonArea   direction="horizontal">
                                <Button  onClick={(event) => { this.turnTO('/logistics/edit'); }}>新增地址</Button>
                            </ButtonArea>
                        </div>
                    </NavBarItem>
                </Tab>
            </div>
        )
    }

}