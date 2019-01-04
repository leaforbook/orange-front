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
    NavBarItem,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    Checkbox,
    Form,
    FormCell,
    Select,
    CellHeader,
    Input,
    Popup,
    PopupHeader,
    Picker,
    Toptips,
    Radio
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";
import moment from "moment";

export default class Logistics extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            addressList: [

            ],
            addressQueryForm:{
                queryParams:'',
                pageSize:20,
                pageNum:1
            },
            isFinish:false,
            tableIndex:sessionStorage.getItem("leaforbook-logistics-tableIndex")===null?0:parseInt(sessionStorage.getItem("leaforbook-logistics-tableIndex")),
            orderList:[],
            isOrderFinish:false,
            orderQueryForm:{
                orderStatus:'2',
                pageSize:20,
                pageNum:1,
            },
            bottom_show1:false,
            logisticsForm:{
                postid:'',
                type:'',
                name:'',
                orderIdList:[],
                addressIdList:[],
            },
            canDeliver:true,
            showWarn: false,
            warnMsg:'',
            bottom_show2:false,
            logisticsList:[],
            logisticsQueryForm:{
                queryParams:'',
                pageSize:9,
                pageNum:1
            },
        }
    }


    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    componentWillMount() {

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

        var logistics = sessionStorage.getItem("leaforbook-logistics-1");
        if(logistics!=null&&logistics!=undefined) {
            this.state.logisticsList = JSON.parse(logistics);
            this.setState({
                logisticsList: this.state.logisticsList,
            })
        } else {
            var url = '/common/express/get';

            Post(url,this.state.logisticsQueryForm).then(res => {
                sessionStorage.setItem("leaforbook-logistics-1",JSON.stringify(res.data))
                this.state.logisticsList = res.data;
                this.setState({
                    logisticsList: this.state.logisticsList,
                })
            }).catch(err => {

            });
        }

        this.state.orderQueryForm.pageNum = 1;
        this.setState({
            orderQueryForm:this.state.orderQueryForm,
        })
        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            this.state.orderList = res.data;

            this.setState({
                orderList:this.state.orderList,
            });

        }).catch(err => {

        })

        this.state.logisticsForm.addressIdList=[];
        this.state.logisticsForm.orderIdList=[];
        this.state.logisticsForm.name='';
        this.state.logisticsForm.postid='';
        this.state.logisticsForm.type='';
        this.state.canDeliver = true;

        this.setState({
            logisticsForm:this.state.logisticsForm,
            canDeliver:this.state.canDeliver,
        })

    }

    searchOrder = (event) =>  {

        console.log(event.target.value)
        this.state.value = event.target.value

        this.state.orderQueryForm.orderStatus = event.target.value;
        this.state.orderQueryForm.pageNum = 1;
        this.setState({
            orderQueryForm:this.state.orderQueryForm,
            isOrderFinish:false,
        })

        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            this.state.orderList = res.data;

            this.setState({
                orderList:this.state.orderList,
            });

        }).catch(err => {

        })
    }

    refreshOrderList = (event) => {
        this.state.orderQueryForm.pageNum = 1;
        this.setState({
            orderQueryForm : this.state.orderQueryForm,
            isOrderFinish:false,
        })

        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            this.state.orderList = res.data;

            this.setState({
                orderList:this.state.orderList,
            });

        }).catch(err => {

        })
    }

    concatOrderList = (event) => {
        this.state.orderQueryForm.pageNum = this.state.orderQueryForm.pageNum+1;
        this.setState({
            orderQueryForm : this.state.orderQueryForm,
        })

        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            if(res.data.length <= 0) {
                this.setState({
                    isOrderFinish:true,
                });
            } else {
                this.setState({
                    orderList:this.state.orderList.concat(res.data),
                });
            }

        }).catch(err => {

        })
    }

    handlerChangeLogistics = (p,event) => {
        this.state.logisticsForm[p] = event.target.value
    }

    searchAddress = (queryParams,event) =>  {

        this.state.addressQueryForm[queryParams] = event;
        this.state.addressQueryForm.pageNum = 1;
        this.setState({
            addressQueryForm:this.state.addressQueryForm,
            isFinish:false,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }


    concatAddressList = (event) =>  {
        this.state.addressQueryForm.pageNum = this.state.addressQueryForm.pageNum+1;
        this.setState({
            addressQueryForm : this.state.addressQueryForm,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            if(res.data.length <= 0) {
                this.setState({
                    isFinish:true,
                });
            } else {
                this.setState({
                    addressList:this.state.addressList.concat(res.data),
                });
            }

        }).catch(err => {

        })
    }

    refreshAddressList = (event) =>  {
        this.state.addressQueryForm.pageNum = 1;
        this.setState({
            addressQueryForm : this.state.addressQueryForm,
            isFinish:false,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }

    changeTableIndex = (event) => {
        this.setState({
            tableIndex : event
        });
        sessionStorage.setItem("leaforbook-logistics-tableIndex",event);
    }

    changeCheckBox =(orderId,i,event) => {

        if(event.target.checked) {
            this.state.logisticsForm.orderIdList =  this.state.logisticsForm.orderIdList.concat(orderId);
            this.state.logisticsForm.addressIdList =  this.state.logisticsForm.addressIdList.concat(this.state.orderList[i].addressId);
            this.setState({
                logisticsForm:this.state.logisticsForm,
            })
        }else {
            var index = this.findIndex(this.state.logisticsForm.orderIdList,orderId)
            this.state.logisticsForm.orderIdList.splice(index,1)
            this.state.logisticsForm.addressIdList.splice(index,1)
            this.setState({
                logisticsForm:this.state.logisticsForm,
            })
        }

        this.state.canDeliver = this.canDeliver(this.state.logisticsForm.addressIdList);

    }

    canDeliver(addressIdList) {
        if(addressIdList.length<=0) {
            return true;
        }else if(addressIdList.length===1) {
            return false;
        }else {
            var addressId = addressIdList[0];
            for(var i=1;i<addressIdList.length;i++) {
                if(addressIdList[i]!=addressId) {
                    return true;
                }
            }
        }

        return false;
    }

    findIndex (arr,item) {
        for(var i=0;i<arr.length;i++) {
            if(arr[i]===item) {
                return i;
            }
        }
    }

    createLogistics = (event) => {
        var url = '/orange/logistics/create';
        var data = this.state.logisticsForm;

        this.setState({bottom_show1: false});

        Post(url,data).then(res => {

            this.componentWillMount();

        }).catch(err => {
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

    searchLogistics = (queryParams,event) =>  {

        this.state.logisticsQueryForm[queryParams] = event;
        this.state.logisticsQueryForm.pageNum = 1;
        this.setState({
            logisticsQueryForm:this.state.logisticsQueryForm,
        })

        Post('/common/express/get',this.state.logisticsQueryForm).then(res => {

            this.state.logisticsList = res.data;

            this.setState({
                logisticsList:this.state.logisticsList,
            });

        }).catch(err => {

        })
    }

    selectLogistics = (i,event) => {
        this.state.logisticsForm.name = this.state.logisticsList[i].name;
        this.state.logisticsForm.type = this.state.logisticsList[i].expressId;
        this.setState({
            logisticsForm:this.state.logisticsForm,
        })
    }

    render() {
        return (
            <div>

                <Tab type="navbar" onChange={this.changeTableIndex.bind(this)}  defaultIndex={this.state.tableIndex}>
                    <NavBarItem label="发货">

                        <InfiniteLoader
                            onLoadMore={ (event, finish) => {

                                this.concatOrderList();

                                {
                                    if(this.state.isOrderFinish){
                                        finish()
                                    }else{
                                        event()
                                    }
                                }

                            }}
                            disable={this.state.isOrderFinish}
                        >
                            <Page className="ptr" title="" subTitle="">


                                <PullToRefresh

                                    onRefresh={(event) => {

                                        this.refreshOrderList();

                                        {
                                            //mock add item after 1s and then resolve
                                            setTimeout(()=>{
                                                this.setState({

                                                }, ()=> event())
                                            }, 1000)
                                        }
                                    }}
                                >

                                    <CellsTitle>待发货订单列表</CellsTitle>

                                    <Cells>
                                        {this.state.orderList.map((order,i) => {
                                            return (
                                                <div key={i} >
                                                    <Panel>
                                                        <Form checkbox>
                                                            <FormCell checkbox>
                                                                <CellHeader>
                                                                    <Checkbox name="checkbox" value={i} onChange={event => this.changeCheckBox(order.orderId,i,event)} />
                                                                </CellHeader>
                                                                <CellBody>
                                                                    {order.orderId}
                                                                </CellBody>
                                                            </FormCell>
                                                        </Form>
                                                    </Panel>
                                                    <Panel  access onClick={(event) => { this.turnTO('/order/detail/'+order.orderId); }}>
                                                        <PanelBody>
                                                            <MediaBox type="text">
                                                                <MediaBoxTitle>{order.productName}&nbsp;&nbsp;&nbsp;&nbsp;{"未发货"}</MediaBoxTitle>
                                                                <MediaBoxDescription>
                                                                    {order.orderId}<br/>{order.price+" "}{order.freight} <br/>{"单价："+order.actualUnitPrice+"元 "}{"数量："+order.amount+" "}{"运费："+order.actualFreight+"元 "}{"总费用："+ order.totalCost+"元"} <br/>{"收货人："}{order.name===null?'':order.name}<br/> {moment(order.dateUpdate).format('YYYY-MM-DD HH:mm:ss')}
                                                                </MediaBoxDescription>
                                                            </MediaBox>
                                                        </PanelBody>
                                                    </Panel>
                                                </div>
                                            )

                                        })}

                                    </Cells>

                                </PullToRefresh>
                            </Page>
                        </InfiniteLoader>

                        <div className="fill_space"></div>
                        <div className="fill_space"></div>
                        <div className="fill_space"></div>

                        <div className="fixd_in_bottom">
                            <ButtonArea   direction="horizontal">
                                <Button disabled={this.state.canDeliver}  onClick={(event)=>this.setState({bottom_show1: true})}>发货</Button>
                            </ButtonArea>
                        </div>

                        <Popup
                            show={this.state.bottom_show1}
                            onRequestClose={(event)=>this.setState({bottom_show1: false})}
                        >
                            <PopupHeader
                                left="取消"
                                right="确认"
                                leftOnClick={(event)=>this.setState({bottom_show1: false})}
                                rightOnClick={(event) => { this.createLogistics(this); }}
                            />
                            <Form>
                                <FormCell>
                                    <CellBody>
                                        <Input type="text"
                                               value={this.state.logisticsForm.name}
                                               onClick={(event)=>this.setState({bottom_show2: true})}
                                               placeholder="请选择物流公司"
                                               readOnly={true}
                                        />
                                        <br/>
                                        <Input type="text" defaultValue={this.state.logisticsForm.postid}  placeholder="请输入物流单号" onBlur={this.handlerChangeLogistics.bind(this,"postid")}/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                            <div className="fill_space"></div>
                        </Popup>

                        <Popup
                            show={this.state.bottom_show2}
                            onRequestClose={(event)=>this.setState({bottom_show2: false})}
                        >
                            <PopupHeader
                                left=""
                                right="确认"
                                leftOnClick={(event)=>this.setState({bottom_show2: false})}
                                rightOnClick={(event) => this.setState({bottom_show2: false})}
                            />

                            <Page className="ptr" title="" subTitle="">

                                <SearchBar
                                    onChange={this.searchLogistics.bind(this,"queryParams")}
                                    defaultValue={this.state.logisticsQueryForm.queryParams}
                                    placeholder="搜索快递公司"
                                    lang={{
                                        cancel: '取消'
                                    }}
                                />
                                <CellsTitle>快递公司列表</CellsTitle>
                                <Cells>
                                    <Panel  >
                                        <Form radio>
                                            {this.state.logisticsList.map((logistics,i) => {
                                                return (
                                                    <FormCell radio>
                                                        <CellBody>{logistics.name}</CellBody>
                                                        <CellFooter>
                                                            <Radio name={"radio"} value={logistics.cn} onClick={event => {this.selectLogistics(i)}}/>
                                                        </CellFooter>
                                                    </FormCell>
                                                )

                                            })}
                                        </Form>
                                    </Panel>

                                </Cells>

                            </Page>

                            <div className="fill_space"></div>
                        </Popup>



                        <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>

                    </NavBarItem>


                    <NavBarItem label="地址">

                        <InfiniteLoader
                            onLoadMore={ (event, finish) => {

                                this.concatAddressList();

                                {
                                    if(this.state.isFinish){
                                        finish()
                                    }else{
                                        event()
                                    }
                                }

                            }}
                            disable={this.state.isFinish}
                        >
                            <Page className="ptr" title="" subTitle="">


                                <PullToRefresh

                                    onRefresh={(event) => {

                                        this.refreshAddressList();

                                        {
                                            //mock add item after 1s and then resolve
                                            setTimeout(()=>{
                                                this.setState({

                                                }, ()=> event())
                                            }, 1000)
                                        }
                                    }}
                                >

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
                                        {this.state.addressList.map((address,i) => {
                                            return (


                                                <Panel  access key={i} onClick={(event) => { this.turnTO('/address/detail/'+address.addressId); }}>
                                                    <PanelBody>
                                                        <MediaBox type="text">
                                                            <MediaBoxTitle>{address.name}</MediaBoxTitle>
                                                            <MediaBoxDescription>
                                                                {address.telephone} {address.provinceName} {address.address}
                                                            </MediaBoxDescription>
                                                        </MediaBox>
                                                    </PanelBody>
                                                </Panel>
                                            )

                                        })}

                                    </Cells>

                                </PullToRefresh>
                            </Page>
                        </InfiniteLoader>

                        <div className="fill_space"></div>
                        <div className="fill_space"></div>
                        <div className="fill_space"></div>

                        <div className="fixd_in_bottom">
                            <ButtonArea   direction="horizontal">
                                <Button  onClick={(event) => { this.turnTO('/address/edit'); }}>新增地址</Button>
                            </ButtonArea>
                        </div>
                    </NavBarItem>
                </Tab>
            </div>
        )
    }

}