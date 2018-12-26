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
    FooterText
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from "../../public/http_util";

export default class ResetPassword extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            form : {
                userName: '',
                password: '',
                repeatPassword:'',
                proof:''
            }
        }
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    reset = (event) => {

        this.setState({showLoading: true});

        var url = '/common/user/resetPassword';
        var data = this.state.form;

        Post(url,data).then(res => {
            console.log(res);
            this.setState({showLoading: false});
            this.props.history.push('/home');
            localStorage.setItem("leaforbook-oneofus",res.data.oneofus);
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
                            <CellsTitle>重置密码</CellsTitle>
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
                                        <Input type="password" placeholder="请输入新密码" defaultValue={this.state.form.password}  onBlur={this.handlerChange.bind(this,"password")}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="password" placeholder="请再次输入新密码" defaultValue={this.state.form.repeatPassword}  onBlur={this.handlerChange.bind(this,"repeatPassword")}/>
                                    </CellBody>
                                </FormCell>
                                <FormCell>
                                    <CellBody>
                                        <Input type="tel" placeholder="请输入重置码" defaultValue={this.state.form.proof}  onBlur={this.handlerChange.bind(this,"proof")}/>
                                    </CellBody>
                                </FormCell>
                            </Form>
                            <ButtonArea>
                                <Button
                                    //button to display toptips
                                    onClick={(event) => { this.reset(); }}>
                                    确认重置
                                </Button>
                            </ButtonArea>
                            <ButtonArea  direction="horizontal">
                                <Button type="default" size="normal"  onClick={(event) => { this.turnTO('/getKey'); }}>获取重置码</Button>
                                <Button type="default" size="normal"  onClick={(event) => { this.turnTO('/login'); }}>去登录</Button>
                            </ButtonArea>

                            <Toast icon="loading" show={this.state.showLoading}>重置中...</Toast>
                            <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                        </div>
                    </FlexItem>
                </Flex>



            </Page>

                <div className="fill_space"></div>
                <div className="fill_space"></div>
                <div className="fill_space"></div>
                <div className="fill_space"></div>
                <div className="fill_space"></div>

                <Footer>
                    <FooterLinks>
                        <FooterLink href="/home">Home</FooterLink>
                    </FooterLinks>
                    <FooterText>Copyright &copy; 2018-2028 leaforbook.com</FooterText>
                </Footer>
            </div>

        )

    }

}