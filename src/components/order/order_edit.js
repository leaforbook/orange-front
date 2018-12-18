import React from 'react';
import {
    Button,
    Flex,
    FlexItem,
    Form,
    FormCell,
    CellBody,
    Input,
    ButtonArea,
    Toast,
    Toptips,
    CellsTitle,
    TextArea,
    Panel,
    PanelBody,
    PanelHeader,
    CellHeader,
    Label,
    CellFooter,
    Cell,
    Cells
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";

export default class OrderEditor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            hiddenPanel:{
                main:false,
                addressList:true,
                addressEditor:true,
            }
        }
    }

    render() {
        return (
            <div>

                <div hidden={this.state.hiddenPanel.main}>

                    <Page className="panel" title="" subTitle="">
                        <Panel>
                            <Cells>
                                <Cell href="javascript:;" access>
                                    <CellBody>
                                        选择收货人
                                    </CellBody>
                                </Cell>
                            </Cells>
                        </Panel>

                        <Panel>
2
                        </Panel>

                        <Panel>
3
                        </Panel>

                        <Panel>
                            4
                        </Panel>

                        <Panel>
                            5
                        </Panel>


                    </Page>

                    <div className="fixd_in_bottom">
                        <ButtonArea   direction="horizontal">
                            <Button plain  onClick={(event) => { this.turnTO('/order/edit/'+this.state.form.addressId); }}>提交订单</Button>
                        </ButtonArea>
                    </div>
                </div>

                <div hidden={this.state.hiddenPanel.addressList}>

                </div>

                <div hidden={this.state.hiddenPanel.addressEditor}>

                </div>

            </div>
        )
    }
}