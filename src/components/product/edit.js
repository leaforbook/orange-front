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
    TextArea
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";

export default class ProductEditor extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            tab:0,
            hiddenPanel:{
                main:false,
                price_attr:true,
                freight_attr:true
            },
            form:{
                productName:'',
                productDesc:'',
                priceAttribute:'',
                freightAttribute:''
            },
            priceAttribute:[],
            freightAttribute:[]
        }
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    swithPage = (index,event) => {
        if(index===1) {
            this.setState({
                hiddenPanel:{
                    main:false,
                    price_attr:true,
                    freight_attr:true
                }
            })
        } else if(index===2) {
            this.setState({
                hiddenPanel:{
                    main:true,
                    price_attr:false,
                    freight_attr:true
                }
            })
        } else if(index===3) {
            this.setState({
                hiddenPanel:{
                    main:true,
                    price_attr:true,
                    freight_attr:false
                }
            })
        }
    }

    render() {
        return(
            <div>
                <div hidden={this.state.hiddenPanel.main}>
                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>设置产品基本信息</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">

                                    <Form>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="tel" defaultValue={this.state.form.productName} placeholder="产品名称" onBlur={this.handlerChange.bind(this,"productName")}/>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea placeholder="产品描述" rows="9" maxLength="2000"  defaultValue={this.state.form.productDesc} onBlur={this.handlerChange.bind(this,"productDesc")}></TextArea>
                                            </CellBody>
                                        </FormCell>
                                    </Form>

                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" onClick={(event) => { this.swithPage(2); }}>下一步</Button>
                                    </ButtonArea>
                                </div>
                            </FlexItem>
                        </Flex>


                    </Page>
                </div>

                <div hidden={this.state.hiddenPanel.price_attr}>
                    <ButtonArea  direction="horizontal">
                        <Button type="default" onClick={(event) => { this.swithPage(1); }}>上一步</Button>
                        <Button type="default" onClick={(event) => { this.swithPage(3); }}>不设价格</Button>
                        <Button type="default" onClick={(event) => { this.swithPage(3); }}>下一步</Button>
                    </ButtonArea>
                </div>

                <div hidden={this.state.hiddenPanel.freight_attr}>
                    <ButtonArea  direction="horizontal">
                        <Button type="default" onClick={(event) => { this.swithPage(2); }}>上一步</Button>
                        <Button type="default" >创建产品</Button>
                    </ButtonArea>
                </div>
            </div>
        )
    }
}