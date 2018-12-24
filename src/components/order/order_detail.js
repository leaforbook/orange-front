import React from 'react';
import { Link } from 'react-router-dom'
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
    Article,
    Form,
    FormCell,
    Input,
    Popup,
    PopupHeader,
    Toptips,
    Preview,
    PreviewHeader,
    PreviewBody,
    PreviewItem,
    ActionSheet

} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class OrderDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queryForm:{
                orderId:props.match.params.orderId,
            },
            updateForm:{
                orderId:props.match.params.orderId,
                orderStatus:'',
            },
            orderStatus:[
                {name:"无需发货"},
                {name:"未发货"},
                {name:"已发货"},
                {name:"已完成"},
                {name:"退货中"},
                {name:"退货完成"},
            ],
            order:{
                productId:'',
                priceId:'',
                freightId:'',
                addressId:'',
                amount:1,
                actualUnitPrice:0,
                totalPrice:0,
                actualFreight:0,
                totalCost:0,
                deliveryDate:'',
                orderStatus:'1',
            },
            productQueryForm:{
                productId:'',
            },
            product:{
                productId:'',
                productName:'',
                productDesc:'',
                priceAttribute:'',
                freightAttribute:''
            },
            priceQueryForm:{
                priceId:'',
            },
            price:{
                priceId:'',
                productId:'',
                attributeValue:'',
            },
            freightQueryForm:{
                freightId:'',
            },
            freight:{
                freightId:'',
                productId:'',
                attributeValue:'',
            },
            addressQueryForm:{
                addressId:'',
            },
            address:{
                isShow:false,
                name: '',
                sex: '',
                provinceId:'',
                provinceName:'',
                address:'',
                telephone:'',
                mailcode:'',
                bak:'',
            },
            logistics:{
                isShow:false,
                value:[],
                nu:'',
                com:'',
            },
            order_status_show:false,
            menus: [{
                label: '无需发货',
                onClick: (event)=> {this.updateOrderStatus('1')}
            }, {
                label: '未发货',
                onClick: (event)=> {this.updateOrderStatus('2')}
            }, {
                label: '已发货',
                onClick: (event)=> {this.updateOrderStatus('3')}
            },{
                label: '已完成',
                onClick: (event)=> {this.updateOrderStatus('4')}
            }, {
                label: '退货中',
                onClick: (event)=> {this.updateOrderStatus('5')}
            }, {
                label: '退货完成',
                onClick: (event)=> {this.updateOrderStatus('6')}
            }],
            actions: [
                {
                    label: '取消',
                    onClick: this.hide.bind(this)
                }
            ]
        }
    }

    componentWillMount() {
        Post("/orange/order/detail",this.state.queryForm).then(res => {
            this.state.order = res.data;
            this.state.productQueryForm.productId = res.data.productId;
            this.state.priceQueryForm.priceId = res.data.priceId;
            this.state.freightQueryForm.freightId = res.data.freightId;
            this.state.addressQueryForm.addressId = res.data.addressId;

            this.setState({
                order:this.state.order,
                productQueryForm:this.state.productQueryForm,
                priceQueryForm:this.state.priceQueryForm,
                freightQueryForm:this.state.freightQueryForm,
                addressQueryForm:this.state.addressQueryForm,
            })

            Post("/orange/product/detail",this.state.productQueryForm).then(res => {
                this.state.product = res.data;
                this.setState({
                    product:this.state.product,
                })
            }).catch(err => {

            });

            Post("/orange/price/detail",this.state.priceQueryForm).then(res => {
                this.state.price = res.data;
                this.setState({
                    price:this.state.price,
                })
            }).catch(err => {

            });

            Post("/orange/freight/detail",this.state.freightQueryForm).then(res => {
                this.state.freight = res.data;
                this.setState({
                    freight:this.state.freight,
                })
            }).catch(err => {

            });


            if(this.state.addressQueryForm.addressId!=null&&this.state.addressQueryForm.addressId!=''&&this.state.addressQueryForm.addressId!=undefined) {

                Post("/orange/address/get",this.state.addressQueryForm).then(res => {
                    this.state.address = res.data;
                    this.state.address.isShow = true;
                    this.setState({
                        address:this.state.address,
                    })
                }).catch(err => {

                });

                Post("/orange/logistics/get",this.state.queryForm).then(res => {
                    if(res.data!=null&&res.data!=''&&res.data!=undefined&&res.data.message==='ok') {
                        this.state.logistics.value = res.data.data;
                        this.state.logistics.nu = res.data.nu;
                        this.state.logistics.com = res.data.com;
                        this.state.logistics.isShow = true;
                        this.setState({
                            logistics:this.state.logistics,
                        })
                    }

                }).catch(err => {

                });
            }

        }).catch(err => {

        });

        setTimeout("this.componentDidMount()", 1000);
    }

    hide(){
        this.setState({
            order_status_show: false,
        });
    }

    updateOrderStatus = (i,event) => {
        this.state.updateForm.orderStatus = i;
        this.setState({
            updateForm: this.state.updateForm,
        })
        Post('/orange/order/updateStatus',this.state.updateForm).then(res => {
            this.state.order.orderStatus = i;
            this.hide();
        }).catch(err => {

        })
    }

    render() {
        return (
            <div>

                <Page className="article" title="" subTitle="">
                    <Preview>
                        <PreviewHeader>
                            <PreviewItem label="订单详情" value="" />
                        </PreviewHeader>
                        <PreviewBody>
                            <PreviewItem label="订单编号" value={this.state.queryForm.orderId+""} />
                            <PreviewItem label="订单状态" value={
                                this.state.orderStatus[parseInt(this.state.order.orderStatus)*1-1].name
                            } />
                            <PreviewItem label="产品" value={
                                <Link to={'/product/detail/'+this.state.order.productId} activeClassName="active">{this.state.product.productName+""}</Link>
                                } />
                            <PreviewItem label="产品规格" value={this.state.price.attributeValue+""} />
                            <PreviewItem label="运费规格" value={this.state.freight.attributeValue+""} />
                            <PreviewItem label="购买数量" value={this.state.order.amount+""} />
                            <PreviewItem label="单价" value={this.state.order.actualUnitPrice+"元"} />
                            <PreviewItem label="运费" value={this.state.order.actualFreight+"元"} />
                            <PreviewItem label="总费用" value={this.state.order.totalCost+"元"} />
                        </PreviewBody>
                    </Preview>

                    <br/>

                    <Preview  hidden={!this.state.address.isShow}>
                        <PreviewHeader>
                            <PreviewItem label="发货信息" value="" />
                        </PreviewHeader>
                        <PreviewBody>
                            <PreviewItem label="收货人" value={this.state.address.name+" "+this.state.address.sex} />
                            <PreviewItem label="手机" value={this.state.address.telephone+""} />
                            <PreviewItem label="省份" value={this.state.address.provinceName+""} />
                            <PreviewItem label="地址" value={this.state.address.address+""} />
                            <PreviewItem label="邮编" value={this.state.address.mailcode+""} />
                            <PreviewItem label="备注" value={this.state.address.bak+""} />
                        </PreviewBody>
                    </Preview>

                    <br/>

                    <Preview hidden={!this.state.logistics.isShow}>
                        <PreviewHeader>
                            <PreviewItem label="物流信息" value="" />
                        </PreviewHeader>
                        <PreviewBody>
                            <PreviewItem label="物流公司" value={this.state.logistics.com+""} />
                            <PreviewItem label="物流单号" value={this.state.logistics.nu+""} />
                            <br/>
                            {this.state.logistics.value.map( (item,i) => {
                                return (
                                    <div  key={i}>
                                    <PreviewItem label={i+1} value={item.ftime +"    "+ item.context} />
                                    <br/>
                                    </div>
                                )
                            }) }

                        </PreviewBody>
                    </Preview>

                    <br/>
                    <br/>
                    <br/>

                    <div className="fixd_in_bottom">
                        <ButtonArea   direction="horizontal">
                            <Button  onClick={(event) => { this.setState({
                                order_status_show:true,
                            }) }}>修改订单状态</Button>
                        </ButtonArea>
                    </div>

                    <ActionSheet
                        menus={this.state.menus}
                        actions={this.state.actions}
                        show={this.state.order_status_show}
                        type="ios"
                        onRequestClose={e=>this.setState({order_status_show: false})}
                    />
                </Page>

            </div>
        )
    }
}