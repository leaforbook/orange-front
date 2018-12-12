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
    Flex,
    FlexItem,
    Form,
    FormCell,
    CellHeader,
    Label,
    TextArea,
    CellsTips,
    Popup,
    PopupHeader,
    Input,
    Toptips
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class ProductGrant extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            form: {
                productId:props.match.params.productId,
                productName:props.match.params.productName,
                userName:''
            },
            result:'',
            bottom_show:false,
            showWarn: false,
            passwordForm:{
                password:''
            }
        }
    }


    verifyPassword = (event) => {
        var url = '/common/user/verifyPassword';
        var data = this.state.passwordForm;

        Post(url,data).then(res => {

            this.grant();

        }).catch(err => {
            console.log(err)
            this.showWarn(err);
        });

        this.setState({bottom_show: false});
    }

    showWarn(msg) {
        this.setState({showWarn: true});
        this.setState({warnMsg: msg});

        this.state.warnTimer = setTimeout(()=> {
            this.setState({showWarn: false});
        }, 2000);
    }

    grant = (event) => {
        console.log(this.state.form)
        Post('/orange/product/share',this.state.form).then(res => {

            this.setState({
                result:res.data
            })
            console.log(res.data)

        }).catch(err => {

        })
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
        this.setState({
            form:this.state.form
        })
    }

    handlerChangePassword = (p,event) => {
        this.state.passwordForm[p] = event.target.value
    }

    render() {
        return (
            <div>
                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>产品授权</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">

                                    <CellsTitle>{this.state.form.productName+"("+this.state.form.productId+")"}</CellsTitle>
                                    <Form>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea placeholder="授权给其他用户" rows="9" maxLength="200"  defaultValue={this.state.form.userName} onChange={this.handlerChange.bind(this,"userName")}></TextArea>
                                            </CellBody>

                                        </FormCell>

                                    </Form>
                                    <CellsTips>请输入对方的登录用户名，如果想授权给多个人，请用半角分号“;”隔开。</CellsTips>


                                    <ButtonArea  direction="horizontal">
                                        <Button onClick={(event)=>this.setState({bottom_show: true})} disabled={this.state.form.userName===''} type="default" >确定授权</Button>
                                    </ButtonArea>

                                    <div className="fill_space"></div>

                                    <CellsTips className="item_msg_warn">{this.state.result}</CellsTips>
                                </div>

                            </FlexItem>
                        </Flex>

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


                    </Page>
            </div>
        )

    }

}