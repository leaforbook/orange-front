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
import Login from "../login";
import {Link} from "react-router-dom";

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <Page className="input" title="" subTitle="">
                <Flex>
                    <FlexItem>
                        <div className="placeholder">
                            <CellsTitle>注册</CellsTitle>
                        </div>
                    </FlexItem>
                </Flex>
                <Flex>
                    <FlexItem>
                        <div className="placeholder">
                            <Form>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" placeholder="请输入真实姓名"/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" placeholder="请输入手机号"/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" placeholder="请输入用户名"/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="password" placeholder="请输入密码"/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="password" placeholder="请再次输入密码"/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" placeholder="请输入注册码"/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                            <ButtonArea>
                                <Button
                                    //button to display toptips
                                    onClick={e => {
                                        if (this.state.showToptips) return;
                                        this.setState({showToptips: !this.state.showToptips})
                                        window.setTimeout(e => this.setState({showToptips: !this.state.showToptips}), 2000)
                                    }
                                    }>
                                    注册
                                </Button>
                            </ButtonArea>
                            <ButtonArea direction="horizontal">
                                <Link to='/login'><Button type="default" to="/login">返回登录</Button></Link>
                            </ButtonArea>
                        </div>
                    </FlexItem>
                </Flex>

            </Page>

        )

    }

}
