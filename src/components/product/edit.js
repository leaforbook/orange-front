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
    Cell
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
            detailForm:{
                productId:props.match.params.productId || '',
            },
            tab:0,
            hiddenPanel:{
                main:false,
                price_attr:true,
                freight_attr:true
            },
            form:{
                productId:props.match.params.productId || '',
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

    componentDidMount() {
        if(this.state.detailForm.productId!='') {
            var url = '/orange/product/detail';
            var data = this.state.detailForm;

            Post(url,data).then(res => {
                this.state.form.productName = res.data.productName;
                this.state.form.productDesc = res.data.productDesc;
                this.state.form.priceAttribute = res.data.priceAttribute;
                this.state.form.freightAttribute = res.data.freightAttribute;
                this.state.priceAttribute = JSON.parse(res.data.priceAttribute);
                this.state.freightAttribute = JSON.parse(res.data.freightAttribute);
                this.setState({
                    form:this.state.form,
                    priceAttribute:this.state.priceAttribute,
                    freightAttribute:this.state.freightAttribute
                })
            }).catch(err => {

            });
        }else {

            var formInLocal = localStorage.getItem("leaforbook_productForm");
            var form;
            if(formInLocal!=null) {
                form = JSON.parse(formInLocal);
            }else {
                form = this.state.form;
            }

            var priceInLocal = localStorage.getItem("leaforbook_product_priceAttribute");
            var price;
            if(priceInLocal!=null) {
                price = JSON.parse(priceInLocal);
            }else {
                price = this.state.priceAttribute;
            }


            var freightInLocal = localStorage.getItem("leaforbook_product_freightAttribute");
            var freight;
            if(freightInLocal!=null) {
                freight = JSON.parse(freightInLocal);
            }else {
                freight = this.state.freightAttribute;
            }

            this.setState({
                form:form,
                priceAttribute:price,
                freightAttribute:freight,
            })

            this.intervalId = setInterval(()=> {
                this.persistenceData();
            },2000);

        }



    }

    persistenceData() {
        localStorage.setItem("leaforbook_productForm",JSON.stringify(this.state.form));
        localStorage.setItem("leaforbook_product_priceAttribute",JSON.stringify(this.state.priceAttribute))
        localStorage.setItem("leaforbook_product_freightAttribute",JSON.stringify(this.state.freightAttribute))
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
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

    createProduct = (event) => {
        this.state.form.priceAttribute = JSON.stringify(this.state.priceAttribute)
        this.state.form.freightAttribute = JSON.stringify(this.state.freightAttribute)
        this.setState({
            form:this.state.form
        })

        var url = '/orange/product/create';
        var data = this.state.form;

        Post(url,data).then(res => {

            localStorage.removeItem("leaforbook_productForm");
            localStorage.removeItem("leaforbook_product_priceAttribute");
            localStorage.removeItem("leaforbook_product_freightAttribute");

            this.props.history.push('/product/price/'+res.data);

        }).catch(err => {

        });
    }

    updateProduct = (event) => {
        this.state.form.priceAttribute = JSON.stringify(this.state.priceAttribute)
        this.state.form.freightAttribute = JSON.stringify(this.state.freightAttribute)
        this.setState({
            form:this.state.form
        })

        var url = '/orange/product/update';
        var data = this.state.form;

        Post(url,data).then(res => {

            this.props.history.push('/product/price/'+this.state.detailForm.productId);

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
                                                <Input defaultValue={this.state.form.productName} type="tel" placeholder="产品名称" onBlur={this.handlerChange.bind(this,"productName")}/>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea  defaultValue={this.state.form.productDesc} placeholder="产品描述" rows="9" maxLength={2000} onBlur={this.handlerChange.bind(this,"productDesc")}></TextArea>
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
                                        {
                                            this.state.form.productId===''?
                                                <Button type="default" onClick={(event) => { this.createProduct(); }}>创建产品</Button>
                                                :
                                                <Button type="default" onClick={(event) => { this.updateProduct(); }}>更新产品</Button>
                                        }

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