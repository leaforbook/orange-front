import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
    FlexItem
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import { Link } from 'react-router-dom'


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form : {
                userName: '',
                password: ''
            }
        }
    }

    handlerChange = (p,event) => {
        console.log(event.target.value)
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    login = (event) => {
        
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
                                    onClick={this.login}>
                                    登录
                                </Button>
                            </ButtonArea>
                            <ButtonArea>
                                <Link to='/reset'><Button type="default">忘记密码</Button></Link>
                            </ButtonArea>
                            <ButtonArea>
                                <Link to='/register'><Button type="default">注册新用户</Button></Link>
                            </ButtonArea>
                        </div>
                    </FlexItem>
                </Flex>


            </Page>
            </div>
        )

    }

}
