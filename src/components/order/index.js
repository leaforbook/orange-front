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
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    Panel,
    PanelBody,
    Form,
    FormCell,
    Select

} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";
import moment from 'moment';

export default class OrderList extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            isFinish:false,
            orderList:[],
            orderQueryForm:{
                orderStatus:'',
                pageSize:20,
                pageNum:1,
            },
            value:'',
            orderStatus:[
                {name:"无需发货"},
                {name:"未发货"},
                {name:"已发货"},
                {name:"已完成"},
                {name:"退货中"},
                {name:"退货完成"},
            ],
        }
    }

    componentWillMount() {
        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            this.state.orderList = res.data;

            this.setState({
                orderList:this.state.orderList,
            });

        }).catch(err => {

        })
    }

    searchOrder = (event) =>  {

        console.log(event.target.value)
        this.state.value = event.target.value

        this.state.orderQueryForm.orderStatus = event.target.value;
        this.state.orderQueryForm.pageNum = 1;
        this.setState({
            orderQueryForm:this.state.orderQueryForm,
            isFinish:false,
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
                    isFinish:true,
                });
            } else {
                this.setState({
                    orderList:this.state.orderList.concat(res.data),
                });
            }

        }).catch(err => {

        })
    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    refreshOrderList = (event) => {
        this.state.orderQueryForm.pageNum = 1;
        this.setState({
            orderQueryForm : this.state.orderQueryForm,
            isFinish:false,
        })

        Post('/orange/order/query',this.state.orderQueryForm).then(res => {

            this.state.orderList = res.data;

            this.setState({
                orderList:this.state.orderList,
            });

        }).catch(err => {

        })
    }

    render() {
        return (
            <div>
                <InfiniteLoader
                    onLoadMore={ (event, finish) => {

                        this.concatOrderList();

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

                            <CellsTitle>产品列表</CellsTitle>

                            <Form>
                                <FormCell select>
                                    <CellBody>
                                        <Select value={this.state.value}  onChange={(event)=> {this.searchOrder(event)}}>
                                            <option value="">请选择订单状态</option>
                                            <option value="1">无需发货</option>
                                            <option value="2">未发货</option>
                                            <option value="3">已发货</option>
                                            <option value="4">已完成</option>
                                            <option value="5">退货中</option>
                                            <option value="6">退货完成</option>
                                        </Select>
                                    </CellBody>
                                </FormCell>
                            </Form>

                            <Cells>
                                {this.state.orderList.map((order,i) => {
                                    return (
                                        <Panel  access key={i} onClick={(event) => { this.turnTO('/order/detail/'+order.orderId); }}>
                                            <PanelBody>
                                                <MediaBox type="text">
                                                    <MediaBoxTitle>{order.productName}&nbsp;&nbsp;&nbsp;&nbsp;{this.state.orderStatus[parseInt(order.orderStatus)*1-1].name}</MediaBoxTitle>
                                                    <MediaBoxDescription>
                                                        {order.orderId}<br/>{order.price+" "}{order.freight} <br/>{"单价："+order.actualUnitPrice+"元 "}{"数量："+order.amount+" "}{"运费："+order.actualFreight+"元 "}{"总费用："+ order.totalCost+"元"} <br/>{"收货人："}{order.name===null?'':order.name}<br/> {moment(order.dateUpdate).format('YYYY-MM-DD HH:mm:ss')}
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
                
            </div>
        )
    }
}