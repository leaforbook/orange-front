import React, {Component} from 'react';
import {
    ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips,
    Flex,
    FlexItem,
    Toast
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util'

export default class Login extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            form : {
                userName: '',
                password: ''
            }
        }
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    login = (event) => {

        this.setState({showLoading: true});

        var url = '/common/user/login';
        var data = this.state.form;

        Post(url,data).then(res => {
            console.log(res);
            this.setState({showLoading: false});
            this.props.history.push('/home');
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

    render() {
        return (
            <div>
            <Page className="input" title="" subTitle="">
                <Flex>
                    <FlexItem>
                        <div className="placeholder">
                            <CellsTitle>登录</CellsTitle>
                        </div>
                    </FlexItem>
                </Flex>
                <Flex>
                    <FlexItem>
                        <div className="placeholder">
                            <Form>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" defaultValue={this.state.form.userName} placeholder="请输入用户名" onBlur={this.handlerChange.bind(this,"userName")}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="password" defaultValue={this.state.form.password}  placeholder="请输入密码" onBlur={this.handlerChange.bind(this,"password")}/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                            <ButtonArea>
                                <Button
                                    //button to display toptips
                                    onClick={(event) => { this.login(); }}>
                                    登录
                                </Button>
                            </ButtonArea>
                            <ButtonArea  direction="horizontal">
                                <Button type="default" onClick={(event) => { this.turnTO('/reset'); }}>忘记密码</Button>
                                <Button type="default" onClick={(event) => { this.turnTO('/register'); }}>注册新用户</Button>
                            </ButtonArea>

                            <Toast icon="loading" show={this.state.showLoading}>登录中...</Toast>
                            <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                        </div>
                    </FlexItem>
                </Flex>


            </Page>
            </div>
        )

    }

}
