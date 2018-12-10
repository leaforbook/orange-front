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
    InfiniteLoader
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class ProductList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            tab:0,
            productList: [

            ],
            productQueryForm:{
                productId:'',
                productName:'',
                pageSize:20,
                pageNum:1
            },
            isFinish:false,
            isNeedRequestServer:true,
        }
    }

    searchProduct = (p,event) =>  {
        this.state.productQueryForm[p] = event;
        this.setState({
            productQueryForm:{
                pageNum:1,
                productId:this.state.productQueryForm.productId,
                productName:this.state.productQueryForm.productName,
                pageSize:this.state.productQueryForm.pageSize,
            },
            isFinish:false,
            isNeedRequestServer:true
        });
    }

    refreshProductList = (event) => {
        this.setState({
            productQueryForm:{
                pageNum:1,
                productId:this.state.productQueryForm.productId,
                productName:this.state.productQueryForm.productName,
                pageSize:this.state.productQueryForm.pageSize,
            },
            isFinish:false,
            isNeedRequestServer:true
        })
    }

    concatProductList = (event) => {
        this.setState({
            productQueryForm:{
                pageNum:this.state.productQueryForm.pageNum+1,
                productId:this.state.productQueryForm.productId,
                productName:this.state.productQueryForm.productName,
                pageSize:this.state.productQueryForm.pageSize,
            },
            isNeedRequestServer:true
        })
    }

    componentDidMount() {
        this.queryProduct();
    }

    componentDidUpdate() {
        if(this.state.isNeedRequestServer) {
            if(this.state.productQueryForm.pageNum === 1) {
                this.queryProduct();
            }else {
                this.concatProduct();
            }
        }
    }

    queryProduct() {
        Post('/orange/product/query',this.state.productQueryForm).then(res => {

            this.setState({
                productList:res.data,
                isNeedRequestServer:false
            });

        }).catch(err => {

        })
    }

    concatProduct() {
        Post('/orange/product/query',this.state.productQueryForm).then(res => {

            if(res.data.length <= 0) {
                this.setState({
                    isFinish:true,
                    isNeedRequestServer:false
                });
            } else {
                this.setState({
                    productList:this.state.productList.concat(res.data),
                    isNeedRequestServer:false
                });
            }

        }).catch(err => {

        })
    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <InfiniteLoader
                    onLoadMore={ (event, finish) => {

                        this.concatProductList();

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

                                this.refreshProductList();

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
                                onChange={this.searchProduct.bind(this,"productName")}
                                defaultValue={this.state.productQueryForm.productName}
                                placeholder="搜索产品"
                                lang={{
                                    cancel: 'Cancel'
                                }}
                            />
                            <CellsTitle>产品列表</CellsTitle>
                            <Cells>
                                {this.state.productList.map((product,i) => {
                                    return (
                                        <Cell access key={i}>
                                            <CellBody>
                                                {product.productName}
                                            </CellBody>
                                            <CellFooter>

                                            </CellFooter>
                                        </Cell>
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
                        <Button  onClick={(event) => { this.turnTO('/product/edit'); }}>新增产品</Button>
                    </ButtonArea>
                </div>
            </div>
        )
    }

}