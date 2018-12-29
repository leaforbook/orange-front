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
    Cells,
    Radio,
    Slider,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    SearchBar,
    Picker,
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import {NavBarItem} from "../logistics";


export default class OrderEditor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            queryForm:{
                productId:props.match.params.productId,
            },
            hiddenPanel:{
                main:false,
                addressList:true,
                addressEditor:true,
            },
            receiver:'',
            price:[],
            freight:[],
            form:{
                productId:props.match.params.productId,
                priceId:'',
                freightId:'',
                addressId:'',
                amount:1,
                actualUnitPrice:0,
                totalPrice:0,
                actualFreight:0,
                totalCost:0,
                deliveryDate:'',
            },
            priceAttribute:'',
            freightAttribute:'',
            addressList: [

            ],
            addressQueryForm:{
                queryParams:'',
                pageSize:50,
                pageNum:1
            },
            addressEditForm : {
                name: '',
                sex: '',
                provinceId:'',
                provinceName:'',
                address:'',
                telephone:'',
                mailcode:'',
                bak:''
            },
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            provinces:[
                {
                    items:[

                    ]
                }
            ],
            province_show:false,
            province_value:'',
            sexes:[
                {
                    items:[
                        {
                            label:"先生"
                        },
                        {
                            label:"女士"
                        }
                    ]
                }
            ],
            sex_show:false,
            sex_value:'',
        }
    }

    componentWillMount() {
        Post("/orange/price/get",this.state.queryForm).then(res => {
            this.state.price = res.data;
            this.setState({
                price:this.state.price,
            })
        }).catch(err => {

        });

        Post("/orange/freight/get",this.state.queryForm).then(res => {
            this.state.freight = res.data;
            this.setState({
                freight:this.state.freight,
            })
        }).catch(err => {

        });


        var provinces = sessionStorage.getItem("leaforbook-province");
        if(provinces!=null&&provinces!=undefined) {
            this.state.provinces[0].items = JSON.parse(provinces);
            this.setState({
                provinces: this.state.provinces,
            })
        } else {
            var url = '/common/province/query';

            Post(url).then(res => {
                sessionStorage.setItem("leaforbook-province",JSON.stringify(res.data))
                this.state.provinces[0].items = res.data;
                this.setState({
                    provinces: this.state.provinces,
                })
            }).catch(err => {

            });
        }
    }


    handlerAddressChange = (p,event) => {
        this.state.addressEditForm[p] = event.target.value;
        this.setState({
            addressEditForm:this.state.addressEditForm,
        })
    }

    createAddress = (event) => {
        this.setState({showLoading: true});

        var url = '/orange/address/create';
        var data = this.state.addressEditForm;

        Post(url,data).then(res => {
            this.setState({showLoading: false});
            this.toAddressList();
        }).catch(err => {
            this.setState({showLoading: false});
            this.showWarn(err);
        });
    }

    showWarn(msg) {
        this.setState({showWarn: true});
        this.setState({warnMsg: msg});

        this.state.warnTimer = setTimeout(()=> {
            this.setState({showWarn: false});
        }, 10000);
    }

    onClickIncrementButton = (event) =>  {
        this.state.form.amount = this.state.form.amount+1;
        this.state.form.totalPrice = this.state.form.actualUnitPrice*this.state.form.amount;
        this.state.form.totalCost = this.state.form.actualUnitPrice*this.state.form.amount + this.state.form.actualFreight*1;
        this.setState({
            form:this.state.form,
        })
    }

    onClickIncrementTenButton = (event) =>  {
        this.state.form.amount = this.state.form.amount+10;
        this.state.form.totalPrice = this.state.form.actualUnitPrice*this.state.form.amount;
        this.state.form.totalCost = this.state.form.actualUnitPrice*this.state.form.amount + this.state.form.actualFreight*1;
        this.setState({
            form:this.state.form,
        })
    }

    onClickClearButton = (event) =>  {
        this.state.form.amount = 1;
        this.state.form.totalPrice = this.state.form.actualUnitPrice*this.state.form.amount;
        this.state.form.totalCost = this.state.form.actualUnitPrice*this.state.form.amount + this.state.form.actualFreight*1;
        this.setState({
            form:this.state.form,
        })
    }

    onClickDecrementButton = (event) =>  {
        if(this.state.form.amount>1) {
            this.state.form.amount = this.state.form.amount-1;
            this.state.form.totalPrice = this.state.form.actualUnitPrice*this.state.form.amount;
            this.state.form.totalCost = this.state.form.actualUnitPrice*this.state.form.amount + this.state.form.actualFreight*1;
            this.setState({
                form:this.state.form,
            })
        }
    }

    selectPrice = (i,event) => {
        console.log(i)
        this.state.form.priceId = this.state.price[i].priceId;
        this.state.form.actualUnitPrice = this.state.price[i].outMinPrice;
        this.state.form.totalPrice = this.state.price[i].outMinPrice * this.state.form.amount;
        this.state.form.totalCost = this.state.price[i].outMinPrice * this.state.form.amount + this.state.form.actualFreight*1;
        this.state.priceAttribute = this.state.price[i].attributeValue;

        console.log(this.state.form)
        this.setState({
            form:this.state.form,
        })
    }

    selectFreight = (i,event) => {
        this.state.form.freightId = this.state.freight[i].freightId;
        this.state.form.actualFreight = this.state.freight[i].freightPrice;
        this.state.form.totalCost = this.state.form.totalPrice + this.state.freight[i].freightPrice*1;
        this.state.freightAttribute = this.state.freight[i].attributeValue;

        console.log(this.state.form)
        this.setState({
            form:this.state.form,
        })
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value;
        this.state.form.totalPrice = this.state.form.actualUnitPrice * this.state.form.amount;
        this.state.form.totalCost = this.state.form.actualUnitPrice * this.state.form.amount + this.state.form.actualFreight*1;
        this.setState({
            form:this.state.form
        })
    }


    toAddressList = (event) => {
        this.state.hiddenPanel.addressList=false;
        this.state.hiddenPanel.main=true;
        this.state.hiddenPanel.addressEditor=true;

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })

        this.setState({
            hiddenPanel:this.state.hiddenPanel,
        })
    }

    toAddressEditor = (event) => {
        this.state.hiddenPanel.addressList=true;
        this.state.hiddenPanel.main=true;
        this.state.hiddenPanel.addressEditor=false;

        this.setState({
            hiddenPanel:this.state.hiddenPanel,
        })
    }


    toMain = (event) => {
        this.state.hiddenPanel.addressList=true;
        this.state.hiddenPanel.main=false;
        this.state.hiddenPanel.addressEditor=true;
        this.setState({
            hiddenPanel:this.state.hiddenPanel,
        })
    }

    selectAddress = (i,event) => {
        this.state.receiver = this.state.addressList[i].name+"  "+this.state.addressList[i].sex+"  "+this.state.addressList[i].telephone;
        this.state.form.addressId = this.state.addressList[i].addressId;
        this.setState({
            receiver:this.state.receiver,
            form:this.state.form,
        })
    }

    clearAddress = (event) => {
        this.state.receiver = '';
        this.state.form.addressId = '';
        this.setState({
            receiver:this.state.receiver,
            form:this.state.form,
        })
    }

    searchAddress = (queryParams,event) =>  {

        this.state.addressQueryForm[queryParams] = event;
        this.state.addressQueryForm.pageNum = 1;
        this.setState({
            addressQueryForm:this.state.addressQueryForm,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }

    submitOrder = (event) => {
        Post('/orange/order/create',this.state.form).then(res => {

            this.props.history.push('/order/detail/'+res.data);

        }).catch(err => {

        })
    }

    render() {
        return (
            <div>

                <div hidden={this.state.hiddenPanel.main}>

                    <Page className="panel" title="" subTitle="">
                        <Panel>
                            <CellsTitle>选择收货人</CellsTitle>
                            <Cells>
                                <Cell onClick={e => {this.toAddressList()}} access>
                                    <CellBody>
                                        {this.state.receiver===''?'选择收货人':this.state.receiver}
                                    </CellBody>
                                    <CellFooter>
                                    </CellFooter>
                                </Cell>
                            </Cells>
                        </Panel>

                        <div className="fill_space"></div>

                        <panel>
                            <CellsTitle>预计发货时间</CellsTitle>
                            <Form>
                                <FormCell>
                                    <CellHeader>
                                        <Label>Date</Label>
                                    </CellHeader>
                                    <CellBody>
                                        <Input type="datetime-local" defaultValue="" onChange={ e=> {this.state.form.deliveryDate= e.target.value;this.setState({
                                            form:this.state.form,
                                        })}}/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                        </panel>

                        <div className="fill_space"></div>

                        <Panel>
                            <CellsTitle>选择产品价格属性</CellsTitle>
                            <Form radio>
                                {
                                    this.state.price.map((price,i) => {
                                        return (
                                            <FormCell radio   key={i}>
                                                <CellBody>{price.attributeValue}</CellBody>
                                                <CellFooter>
                                                    <Radio name={"radio1"} value={price.priceId} onClick={event => {this.selectPrice(i)}}/>
                                                </CellFooter>
                                            </FormCell>
                                        )

                                    })
                                }

                            </Form>
                        </Panel>

                        <div className="fill_space"></div>

                        <Panel>
                            <CellsTitle>选择产品运费属性</CellsTitle>
                            <Form radio>
                                {
                                    this.state.freight.map((freight,i) => {
                                        return (
                                            <FormCell radio   key={i}>
                                                <CellBody>{freight.attributeValue}</CellBody>
                                                <CellFooter>
                                                    <Radio name={"radio2"} value={freight.freightId} onClick={event => {this.selectFreight(i)}}/>
                                                </CellFooter>
                                            </FormCell>
                                        )
                                    })
                                }

                            </Form>
                        </Panel>

                        <panel>
                            <CellsTitle>已选<br/>{this.state.priceAttribute}<br/>{this.state.freightAttribute}<br/></CellsTitle>
                        </panel>

                        <Panel>
                            <CellsTitle>总费用=单价*数量+运费</CellsTitle>
                            <Form>
                                <FormCell >
                                    <CellHeader>
                                        <Label>单价</Label>
                                    </CellHeader>
                                    <CellBody>
                                        <Input value={this.state.form.actualUnitPrice} type="number" min="0" placeholder="请输入单价" onChange={this.handlerChange.bind(this,"actualUnitPrice")}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell >
                                    <CellHeader>
                                        <Label>运费</Label>
                                    </CellHeader>
                                    <CellBody>
                                        <Input value={this.state.form.actualFreight} type="number" min="0" placeholder="请输入运费" onChange={this.handlerChange.bind(this,"actualFreight")}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell >
                                    <CellHeader>
                                        <Label>总费用</Label>
                                    </CellHeader>
                                    <CellBody>
                                        <Input value={this.state.form.totalCost} type="number" placeholder="" readOnly/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                        </Panel>

                        <Panel>
                            <CellsTitle>数量</CellsTitle>
                            <div className="center_panel">
                                <button className="button_style" onClick={(event) => {
                                    this.onClickClearButton()
                                }}>1
                                </button>
                                <button className="button_style" onClick={(event) => {
                                    this.onClickDecrementButton()
                                }}>-
                                </button>
                                <span className="span_style">{this.state.form.amount}</span>
                                <button className="button_style" onClick={(event) => {
                                    this.onClickIncrementButton()
                                }}>+
                                </button>
                                <button className="button_style" onClick={(event) => {
                                    this.onClickIncrementTenButton()
                                }}>+10
                                </button>
                            </div>
                        </Panel>

                        <div className="fill_space"></div>
                        <div className="fill_space"></div>
                        <div className="fill_space"></div>


                    </Page>

                    <div className="fixd_in_bottom">
                        <ButtonArea   direction="horizontal">
                            <Button disabled={this.state.form.priceId===''||this.state.form.freightId===''}  onClick={(event) => { this.submitOrder(); }}>提交订单</Button>
                        </ButtonArea>
                    </div>
                </div>

                <div hidden={this.state.hiddenPanel.addressList}>

                        <Page className="ptr" title="" subTitle="">

                                <SearchBar
                                    onChange={this.searchAddress.bind(this,"queryParams")}
                                    defaultValue={this.state.addressQueryForm.queryParams}
                                    placeholder="搜索地址"
                                    lang={{
                                        cancel: '取消'
                                    }}
                                />
                                <CellsTitle>地址列表</CellsTitle>
                                <Cells>
                                    <Panel  >
                                        <Form radio>
                                            <FormCell radio>
                                                <CellBody>{"清空收货人"}</CellBody>
                                                <CellFooter>
                                                    <Radio name={"radio3"} value={""} onClick={event => {this.clearAddress()}}/>
                                                </CellFooter>
                                            </FormCell>
                                    {this.state.addressList.map((address,i) => {
                                        return (
                                            <FormCell radio>
                                                <CellBody>{address.name} {address.sex} {address.telephone} {address.provinceName}</CellBody>
                                                <CellFooter>
                                                    <Radio name={"radio3"} value={address.addressId} onClick={event => {this.selectAddress(i)}}/>
                                                </CellFooter>
                                            </FormCell>
                                        )

                                    })}
                                        </Form>
                                    </Panel>

                                </Cells>

                        </Page>

                        <div className="fill_space"></div>
                        <div className="fill_space"></div>
                        <div className="fill_space"></div>

                        <div className="fixd_in_bottom">
                            <ButtonArea   direction="horizontal">
                                <Button type="default" onClick={(event) => { this.toAddressEditor(); }}>新增地址</Button>
                                <Button onClick={(event) => { this.toMain(); }}>确定</Button>
                            </ButtonArea>
                        </div>

                </div>

                <div hidden={this.state.hiddenPanel.addressEditor}>

                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>新增收货地址</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <Form>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="tel" defaultValue={this.state.addressEditForm.name} placeholder="收货人姓名" onBlur={this.handlerAddressChange.bind(this,"name")}/>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="tel" defaultValue={this.state.addressEditForm.telephone}  placeholder="手机号码" onBlur={this.handlerAddressChange.bind(this,"telephone")}/>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="text"
                                                       value={this.state.addressEditForm.sex}
                                                       onClick={ e=> {
                                                           //e.preventDefault();
                                                           this.setState({sex_show: true})
                                                       }}
                                                       placeholder="选择性别"
                                                       readOnly={true}
                                                />
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="text"
                                                       value={this.state.addressEditForm.provinceName}
                                                       onClick={ e=> {
                                                           //e.preventDefault();
                                                           this.setState({province_show: true})
                                                       }}
                                                       placeholder="选择省份"
                                                       readOnly={true}
                                                />
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <Input type="tel" defaultValue={this.state.addressEditForm.mailcode}  placeholder="邮政编码" onBlur={this.handlerAddressChange.bind(this,"mailcode")}/>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea placeholder="详细地址" rows="2" maxLength={100}  value={this.state.addressEditForm.address} onChange={this.handlerAddressChange.bind(this,"address")}></TextArea>
                                            </CellBody>
                                        </FormCell>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea placeholder="备注" rows="2" maxLength={200}  value={this.state.addressEditForm.bak} onChange={this.handlerAddressChange.bind(this,"bak")}></TextArea>
                                            </CellBody>
                                        </FormCell>
                                    </Form>
                                    <ButtonArea>
                                        <Button
                                            //button to display toptips
                                            onClick={(event) => { this.createAddress(); }}>
                                            保存
                                        </Button>
                                    </ButtonArea>

                                    <Toast icon="loading" show={this.state.showLoading}>保存中...</Toast>
                                    <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                                </div>
                            </FlexItem>
                        </Flex>


                    </Page>


                    <Picker
                        onChange={selected=>{
                            let value = ''
                            let id = ''
                            selected.forEach( (s,i)=> {
                                value = this.state.provinces[i]['items'][s].label;
                                id = this.state.provinces[i]['items'][s].provinceId;
                            })
                            this.state.addressEditForm.provinceName = value;
                            this.state.addressEditForm.provinceId = id;
                            this.setState({
                                addressEditForm:this.state.addressEditForm,
                                province_show: false
                            })
                        }}
                        groups={this.state.provinces}
                        show={this.state.province_show}
                        onCancel={e=>this.setState({province_show: false})}
                    />

                    <Picker
                        onChange={selected=>{
                            let value = ''
                            selected.forEach( (s,i)=> {
                                value = this.state.sexes[i]['items'][s].label
                            })
                            this.state.addressEditForm.sex = value;
                            this.setState({
                                addressEditForm:this.state.addressEditForm,
                                sex_show: false
                            })
                        }}
                        groups={this.state.sexes}
                        show={this.state.sex_show}
                        onCancel={e=>this.setState({sex_show: false})}
                    />

                </div>

            </div>
        )
    }
}