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
    CellFooter
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import {Cell} from "./index";

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
            priceAttribute:[{
                type:'',
                value:['']
            }],
            freightAttribute:[{
                type:'',
                value:['']
            }],
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

    addType = (event) => {
        this.setState((prevState, props) => (
            {
                priceAttribute : prevState.priceAttribute.concat({type:'', value:['']}),
            }
        ))
    }

    removeType = (i,event) => {
        this.state.priceAttribute.splice(i,1)
        this.setState((prevState, props) => (
            {
                priceAttribute : prevState.priceAttribute
            }
        ))
    }

    addValue = (i,event) => {

        this.state.priceAttribute[i].value = this.state.priceAttribute[i].value.concat('')

        this.setState({
            priceAttribute:this.state.priceAttribute
        })
    }

    removeValue = (i,j,event) => {
        this.state.priceAttribute[i].value.splice(j,1)

        this.setState({
            priceAttribute:this.state.priceAttribute
        })
    }

    handlerPriceTypeChange = (i,event) => {
        this.state.priceAttribute[i].type = event.target.value
        this.setState({
            priceAttribute:this.state.priceAttribute
        })
    }

    handlerPriceValueChange = (i,j,event) => {
        this.state.priceAttribute[i].value[j] = event.target.value
        this.setState({
            priceAttribute:this.state.priceAttribute
        })
    }

//---------------------------------------------------------------------------------------------------------------
    addFreightType = (event) => {
        this.setState((prevState, props) => (
            {
                freightAttribute : prevState.freightAttribute.concat({type:'', value:['']}),
            }
        ))
    }

    removeFreightType = (i,event) => {
        this.state.freightAttribute.splice(i,1)
        this.setState((prevState, props) => (
            {
                freightAttribute : prevState.freightAttribute
            }
        ))
    }

    addFreightValue = (i,event) => {

        this.state.freightAttribute[i].value = this.state.freightAttribute[i].value.concat('')

        this.setState({
            freightAttribute:this.state.freightAttribute
        })
    }

    removeFreightValue = (i,j,event) => {
        this.state.freightAttribute[i].value.splice(j,1)

        this.setState({
            freightAttribute:this.state.freightAttribute
        })
    }

    handlerFreightTypeChange = (i,event) => {
        this.state.freightAttribute[i].type = event.target.value
        this.setState({
            freightAttribute:this.state.freightAttribute
        })
    }

    handlerFreightValueChange = (i,j,event) => {
        this.state.freightAttribute[i].value[j] = event.target.value
        this.setState({
            freightAttribute:this.state.freightAttribute
        })
    }

    componentDidUpdate() {
        console.log("arrp:",this.state.priceAttribute)
        console.log("arrf:",this.state.freightAttribute)
        console.log("form:",this.state.form)
    }

    createProduct = (event) => {
        this.state.form.priceAttribute = JSON.stringify(this.state.priceAttribute)
        this.state.form.freightAttribute = JSON.stringify(this.state.freightAttribute)
        this.setState({
            form:this.state.form
        })

        var url = '/orange/product/create';
        var data = this.state.form;

        Post(url,data).then(res => {

        }).catch(err => {

        });
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

                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>设置产品价格属性</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">

                                    {
                                        this.state.priceAttribute.map((price,i) => {
                                            return (
                                                <Panel key={i}>
                                                    <PanelBody>
                                                        <Panel>
                                                            <PanelBody>
                                                                <Form>
                                                                    <FormCell>
                                                                        <CellHeader>
                                                                            <Label>属性类型:</Label>
                                                                        </CellHeader>
                                                                        <CellBody>
                                                                            <Input type="tel" defaultValue={this.state.priceAttribute[i].type} placeholder="@" onBlur={this.handlerPriceTypeChange.bind(this,i)}/>
                                                                        </CellBody>
                                                                        <CellFooter>
                                                                            <Button type="vcode" onClick={(event) => { this.removeType(i); }}>删除</Button>
                                                                        </CellFooter>
                                                                    </FormCell>

                                                                    {
                                                                        this.state.priceAttribute[i].value.map((price_value,j) => {
                                                                            return (
                                                                                <FormCell key={j}>
                                                                                    <CellHeader>
                                                                                        <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;属性值:</Label>
                                                                                    </CellHeader>
                                                                                    <CellBody>
                                                                                        <Input type="tel" defaultValue={this.state.priceAttribute[i].value[j]} placeholder="#" onBlur={this.handlerPriceValueChange.bind(this,i,j)}/>
                                                                                    </CellBody>
                                                                                    <CellFooter>
                                                                                        <Button disabled={this.state.priceAttribute[i].value.length===1} type="warn" size="small" onClick={(event) => { this.removeValue(i,j); }}>删除</Button>
                                                                                    </CellFooter>
                                                                                </FormCell>
                                                                            )
                                                                        })
                                                                    }

                                                                    <ButtonArea  direction="horizontal">
                                                                        <Button size="small" plain type="default" onClick={(event) => { this.addValue(i); }}>添加价格属性值</Button>
                                                                    </ButtonArea>

                                                                </Form>
                                                            </PanelBody>
                                                        </Panel>
                                                    </PanelBody>
                                                </Panel>
                                        )
                                        })
                                    }

                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" plain onClick={(event) => { this.addType(); }}>添加价格属性类型</Button>
                                    </ButtonArea>


                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" onClick={(event) => { this.swithPage(1); }}>上一步</Button>
                                        <Button type="default" onClick={(event) => { this.swithPage(3); }}>下一步</Button>
                                    </ButtonArea>

                                </div>
                            </FlexItem>
                        </Flex>


                    </Page>
                </div>

                <div hidden={this.state.hiddenPanel.freight_attr}>
                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>设置产品运费属性</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">

                                    {
                                        this.state.freightAttribute.map((price,i) => {
                                            return (
                                                <Panel key={i}>
                                                    <PanelBody>
                                                        <Panel>
                                                            <PanelBody>
                                                                <Form>
                                                                    <FormCell>
                                                                        <CellHeader>
                                                                            <Label>属性类型:</Label>
                                                                        </CellHeader>
                                                                        <CellBody>
                                                                            <Input type="tel" defaultValue={this.state.freightAttribute[i].type} placeholder="@" onBlur={this.handlerFreightTypeChange.bind(this,i)}/>
                                                                        </CellBody>
                                                                        <CellFooter>
                                                                            <Button type="vcode" onClick={(event) => { this.removeFreightType(i); }}>删除</Button>
                                                                        </CellFooter>
                                                                    </FormCell>

                                                                    {
                                                                        this.state.freightAttribute[i].value.map((price_value,j) => {
                                                                            return (
                                                                                <FormCell key={j}>
                                                                                    <CellHeader>
                                                                                        <Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;属性值:</Label>
                                                                                    </CellHeader>
                                                                                    <CellBody>
                                                                                        <Input type="tel" defaultValue={this.state.freightAttribute[i].value[j]} placeholder="#" onBlur={this.handlerFreightValueChange.bind(this,i,j)}/>
                                                                                    </CellBody>
                                                                                    <CellFooter>
                                                                                        <Button disabled={this.state.freightAttribute[i].value.length===1} type="warn" size="small" onClick={(event) => { this.removeFreightValue(i,j); }}>删除</Button>
                                                                                    </CellFooter>
                                                                                </FormCell>
                                                                            )
                                                                        })
                                                                    }

                                                                    <ButtonArea  direction="horizontal">
                                                                        <Button size="small" plain type="default" onClick={(event) => { this.addFreightValue(i); }}>添加运费属性值</Button>
                                                                    </ButtonArea>

                                                                </Form>
                                                            </PanelBody>
                                                        </Panel>
                                                    </PanelBody>
                                                </Panel>
                                            )
                                        })
                                    }

                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" plain onClick={(event) => { this.addFreightType(); }}>添加运费属性类型</Button>
                                    </ButtonArea>


                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" onClick={(event) => { this.swithPage(2); }}>上一步</Button>
                                        <Button type="default" onClick={(event) => { this.createProduct(); }}>创建产品</Button>
                                    </ButtonArea>

                                </div>
                            </FlexItem>
                        </Flex>


                    </Page>
                </div>
            </div>
        )
    }
}