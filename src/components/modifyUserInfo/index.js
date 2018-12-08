import React from 'react';
import {
    Flex,
    FlexItem,
    Form,
    FormCell,
    CellBody,
    Input,
    ButtonArea,
    Button,
    Toast,
    Toptips,
    CellsTitle,
    Footer,
    FooterLinks,
    FooterLink,
    FooterText,
    Popup,
    PopupHeader
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from "../../public/http_util";

export default class ModifyUserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bottom_show: false,
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            form : {
                userName: props.match.params.userName,
                realName: props.match.params.realName,
                telephone:props.match.params.telephone,
            },
            passwordForm: {
                password:''
            }
        }
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
    }

    handlerChangePassword = (p,event) => {
        this.state.passwordForm[p] = event.target.value
    }

    verifyPassword = (event) => {
        var url = '/common/user/verifyPassword';
        var data = this.state.passwordForm;

        Post(url,data).then(res => {
            this.update();

        }).catch(err => {
            console.log(err)
            this.setState({showLoading: false});
            this.showWarn(err);
        });
    }

    update() {
        this.setState({showLoading: true});

        var url = '/common/user/update';
        var data = this.state.form;

        Post(url,data).then(res => {
            localStorage.removeItem("leaforbook-userInfo");
            this.setState({showLoading: false});
            this.props.history.goBack();

        }).catch(err => {
            console.log(err)
            this.setState({showLoading: false});
            this.showWarn(err);
        });
    }

    showWarn(msg) {
        this.setState({showWarn: true});
        this.setState({warnMsg: msg});

        this.state.warnTimer = setTimeout(()=> {
            this.setState({showWarn: false});
        }, 2000);
    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    goBack () {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Page className="input" title="" subTitle="">
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <CellsTitle>修改用户信息</CellsTitle>
                            </div>
                        </FlexItem>
                    </Flex>
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <Form>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" placeholder="请输入真实姓名" defaultValue={this.state.form.realName}  onBlur={this.handlerChange.bind(this,"realName")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" placeholder="请输入手机号" defaultValue={this.state.form.telephone}  onBlur={this.handlerChange.bind(this,"telephone")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" placeholder="请输入用户名" defaultValue={this.state.form.userName} onBlur={this.handlerChange.bind(this,"userName")}/>
                                        </CellBody>
                                    </FormCell>
                                </Form>
                                <ButtonArea>
                                    <Button onClick={(event)=>this.setState({bottom_show: true})}>
                                        修改
                                    </Button>
                                </ButtonArea>
                                <ButtonArea   direction="horizontal">
                                    <Button type="default" size="normal"  onClick={(event) => { this.goBack(); }}>返回</Button>
                                </ButtonArea>

                                <Toast icon="loading" show={this.state.showLoading}>修改中...</Toast>
                                <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                            </div>
                        </FlexItem>
                    </Flex>

                    <Popup
                        show={this.state.bottom_show}
                        onRequestClose={(event)=>this.setState({bottom_show: false})}
                    >
                        <PopupHeader
                            left="取消"
                            right="确认"
                            leftOnClick={(event)=>this.setState({bottom_show: false})}
                            rightOnClick={(event)=>this.verifyPassword(this)}
                        />
                        <Form>
                            <FormCell>
                                <CellBody>
                                    <Input type="password" defaultValue={this.state.form.password}  placeholder="请输入密码" onBlur={this.handlerChangePassword.bind(this,"password")}/>
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
