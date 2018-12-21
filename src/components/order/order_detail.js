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
    Article,
    Form,
    FormCell,
    Input,
    Popup,
    PopupHeader,
    Toptips

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
                orderStatus:'',
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
                value:{},
            }
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
                    if(res.data!=null&&res.data!=''&&res.data!=undefined) {
                        this.state.address = res.data;
                        this.state.address.isShow = true;
                        this.setState({
                            address:this.state.address,
                        })
                    }

                }).catch(err => {

                });
            }

        }).catch(err => {

        });

        setTimeout("this.componentDidMount()", 1000);
    }

    render() {
        return (
            <div>

                <Page className="article" title="" subTitle="">
                    <Article>
                        <h1>订单编号：{this.state.queryForm.orderId}</h1>
                        <section>
                            <h2>{this.state.product.productName}</h2>
                            <p>{this.state.price.attributeValue}</p>
                            <p>{this.state.freight.attributeValue}</p>
                            <p>购买数量：{this.state.order.amount}</p>
                            <p>单价：{this.state.order.actualUnitPrice}元</p>
                            <p>运费：{this.state.order.actualFreight}元</p>
                            <p>总费用：{this.state.order.totalCost}元</p>
                        </section>

                        <section hidden={!this.state.address.isShow}>
                            <h2>收货人：{this.state.address.name}{this.state.address.sex}</h2>
                            <p>{this.state.address.telephone}</p>
                            <p>{this.state.address.provinceName}</p>
                            <p>{this.state.address.address}</p>
                            <p>{this.state.address.mailcode}</p>
                            <p>{this.state.address.bak}</p>
                        </section>

                        <section hidden={!this.state.logistics.isShow}>
                            <p>{this.state.logistics.isShow}</p>
                        </section>
                    </Article>
                </Page>

            </div>
        )
    }
}