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
    Article
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class ProductDetail extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            form:{
                productId:props.match.params.productId,
            },
            result:{

            }
        }

        Post('/orange/product/detail',this.state.form).then(res => {

            this.setState({
                result:res.data,
            });

        }).catch(err => {

        })
    }



    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    deleteProduct = (event) =>  {
        console.log("delete")
    }


    render() {
        return (
            <div>

                <Page className="article" title="" subTitle="">
                    <Article>
                        <h1>{this.state.result.productName}</h1>
                        <section>
                            {this.state.result.productDesc}
                        </section>
                    </Article>
                </Page>

                <div className="fixd_in_bottom">
                    <ButtonArea   direction="horizontal">
                        <Button plain  onClick={(event) => { this.deleteProduct() }}>删除</Button>
                        <Button plain  onClick={(event) => { this.turnTO('/product/edit'); }}>修改</Button>
                        <Button plain  onClick={(event) => { this.turnTO('/product/grant/'+this.state.form.productId+'/'+this.state.result.productName); }}>授权</Button>
                        <Button plain  onClick={(event) => { this.turnTO('/order'); }}>下单</Button>
                    </ButtonArea>
                </div>
            </div>
        )
    }
}