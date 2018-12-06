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
    CellsTitle
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from "../../public/http_util";

export default class ModifyPassword extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            form : {
                userName: props.userName,
                password: '',
                newPassword:'',
                repeatNewPassword:''
            }
        }
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    modify = (event) => {

        this.setState({showLoading: true});

        var url = '/common/user/modifyPassword';
        var data = this.state.form;

        Post(url,data).then(res => {
            console.log(res);
            this.setState({showLoading: false});
            if(res.code === '0') {
                this.props.history.push('/user');
            }else {
                this.showWarn(res.msg);
            }

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
                                <CellsTitle>修改密码</CellsTitle>
                            </div>
                        </FlexItem>
                    </Flex>
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <Form>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" placeholder="请输入用户名" defaultValue={this.state.form.userName}  onBlur={this.handlerChange.bind(this,"userName")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="password" placeholder="请输入旧密码" defaultValue={this.state.form.password}  onBlur={this.handlerChange.bind(this,"password")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="password" placeholder="请输入新密码" defaultValue={this.state.form.newPassword}  onBlur={this.handlerChange.bind(this,"newPassword")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="password" placeholder="请再次输入新密码" defaultValue={this.state.form.repeatNewPassword}  onBlur={this.handlerChange.bind(this,"repeatNewPassword")}/>
                                        </CellBody>
                                    </FormCell>
                                </Form>
                                <ButtonArea>
                                    <Button onClick={(event) => { this.modify(); }}>
                                        确认修改
                                    </Button>
                                </ButtonArea>
                                <ButtonArea  direction="horizontal">
                                    <Button type="default" size="normal"  onClick={(event) => { this.turnTO('/reset'); }}>忘记密码</Button>
                                    <Button type="default" size="normal"  onClick={(event) => { this.goBack(); }}>返回</Button>
                                </ButtonArea>

                                <Toast icon="loading" show={this.state.showLoading}>修改中...</Toast>
                                <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                            </div>
                        </FlexItem>
                    </Flex>

                </Page>
            </div>

        )

    }

}