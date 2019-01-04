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

export default class ProductDetail extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            form:{
                productId:props.match.params.productId,
            },
            result:{

            },
            bottom_show:false,
            bottom_show1:false,
            showWarn: false,
            passwordForm:{
                password:''
            },
            isCreater:false
        }

        Post('/orange/product/detail',this.state.form).then(res => {

            this.setState({
                result:res.data,
            });

        }).catch(err => {

        })
    }

    componentWillMount() {
        if(this.state.form.productId!='') {
            var url = '/orange/product/isCreater';
            var data = this.state.form;

            Post(url,data).then(res => {
                this.setState({
                    isCreater:res.data
                })
            }).catch(err => {

            });
        }
    }

    handlerChangePassword = (p,event) => {
        this.state.passwordForm[p] = event.target.value
    }

    verifyPassword = (event) => {
        var url = '/common/user/verifyPassword';
        var data = this.state.passwordForm;

        Post(url,data).then(res => {

            this.deleteProduct();

        }).catch(err => {
            console.log(err)
            this.showWarn(err);
        });

        this.setState({bottom_show: false});
    }

    verifyPassword1 = (event) => {
        var url = '/common/user/verifyPassword';
        var data = this.state.passwordForm;

        Post(url,data).then(res => {

            this.setState({bottom_show1: false});

            Post("/orange/product/copy",this.state.form).then(res => {

                this.state.form.productId = res.data;
                this.setState({
                    form:this.state.form
                })
                this.componentWillMount();

            }).catch(err => {
                this.showWarn(err);
            });

        }).catch(err => {
            this.showWarn(err);
            this.setState({bottom_show1: false});
        });


    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    deleteProduct = (event) =>  {
        Post('/orange/product/delete',this.state.form).then(res => {

            this.props.history.push("/product/list");

        }).catch(err => {

        })
    }

    showWarn(msg) {
        this.setState({showWarn: true});
        this.setState({warnMsg: msg});

        this.state.warnTimer = setTimeout(()=> {
            this.setState({showWarn: false});
        }, 10000);
    }


    render() {
        return (
            <div>

                <Page className="article" title="" subTitle="">
                    <Article>
                        <h1>{this.state.result.productName}</h1>
                        <section style={{whiteSpace: "pre-line"}}>
                            {this.state.result.productDesc}
                        </section>
                    </Article>
                </Page>

                <div className="fill_space"></div>
                <div className="fill_space"></div>
                <div className="fill_space"></div>

                <div className="fixd_in_bottom">
                    <ButtonArea   direction="horizontal">
                        {
                            !this.state.isCreater &&
                            <Button type={"default"}  onClick={(event)=>this.setState({bottom_show1: true})}>复制</Button>
                        }
                        {
                            this.state.isCreater &&
                            <Button type={"default"}  onClick={(event)=>this.setState({bottom_show: true})}>删除</Button>
                        }

                        {
                            this.state.isCreater &&
                            <Button type={"default"}  onClick={(event) => { this.turnTO('/product/edit/'+this.state.form.productId); }}>修改</Button>
                        }

                        {
                            this.state.isCreater &&
                            <Button type={"default"}  onClick={(event) => { this.turnTO('/product/grant/'+this.state.form.productId+'/'+this.state.result.productName); }}>授权</Button>
                        }

                        <Button  onClick={(event) => { this.turnTO('/order/edit/'+this.state.form.productId); }}>下单</Button>
                    </ButtonArea>
                </div>

                <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>

                <Popup
                    show={this.state.bottom_show}
                    onRequestClose={(event)=>this.setState({bottom_show: false})}
                >
                    <PopupHeader
                        left="取消"
                        right="确认"
                        leftOnClick={(event)=>this.setState({bottom_show: false})}
                        rightOnClick={(event) => { this.verifyPassword(this); }}
                    />
                    <Form>
                        <FormCell>
                            <CellBody>
                                <Input type="password" defaultValue={this.state.passwordForm.password}  placeholder="请输入密码" onBlur={this.handlerChangePassword.bind(this,"password")}/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className="fill_space"></div>
                </Popup>

                <Popup
                    show={this.state.bottom_show1}
                    onRequestClose={(event)=>this.setState({bottom_show1: false})}
                >
                    <PopupHeader
                        left="取消"
                        right="确认"
                        leftOnClick={(event)=>this.setState({bottom_show1: false})}
                        rightOnClick={(event) => { this.verifyPassword1(this); }}
                    />
                    <Form>
                        <FormCell>
                            <CellBody>
                                <span className="tips_stype">{"确定要复制他人授权给您的产品？复制后您可以对新产品进行修改，并且不会影响其他人对原产品的使用，但是您不能再使用原产品。"}</span>
                                <br/>
                                <br/>
                                <Input type="password" defaultValue={this.state.passwordForm.password}  placeholder="请输入密码" onBlur={this.handlerChangePassword.bind(this,"password")}/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <div className="fill_space"></div>
                </Popup>
            </div>
        )
    }
}