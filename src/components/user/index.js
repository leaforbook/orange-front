import React from 'react';
import {
    Preview,
    PreviewHeader,
    PreviewItem,
    PreviewFooter,
    PreviewButton,
    PreviewBody,
    ButtonArea,
    Button,
    Toptips,
    Dialog
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Post from '../../public/http_util';

export default class User extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            warnMsg: false,
            form : {
                userName: '',
                realName: '',
                telephone:''
            },
            styleDialog: {
                title: '注意',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '确认',
                        onClick: this.loginOut.bind(this)
                    }
                ]
            },
            showDialog: false,
        }

    }

    componentDidMount() {
        var userInfo = localStorage.getItem("leaforbook-userInfo");

        if(userInfo!=null && userInfo!=undefined && Object.keys(userInfo).length > 0) {
            var json = JSON.parse(userInfo);
            console.log(json.userName);
            this.setState({
                form : {
                    userName: json.userName,
                    realName: json.realName,
                    telephone:json.telephone
                }
            });
        } else {
            Post('/common/user/get').then(res => {
                this.setState({
                    form : {
                        userName: res.data.userName,
                        realName: res.data.realName,
                        telephone:res.data.telephone
                    }
                });

                localStorage.setItem("leaforbook-userInfo",JSON.stringify(res.data))
            })
        }
    }

    hideDialog() {
        this.setState({
            showDialog: false
        });
    }

    goBack () {
        this.props.history.goBack();
    }

    loginOut() {
        Post('/common/user/loginOut').then(res => {
                localStorage.removeItem("leaforbook-oneofus");
                localStorage.removeItem("leaforbook-userInfo");
                sessionStorage.removeItem("leaforbook-tableIndex");
                this.props.history.push('/login');
        }).catch(err => {
            this.showWarn('退出失败：'+err);
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
                <Preview>
                    <PreviewHeader>
                        <PreviewItem label="尊敬的" value={this.state.form.realName} />
                    </PreviewHeader>
                    <PreviewBody>
                        <PreviewItem label="用户名" value={this.state.form.userName} />
                        <PreviewItem label="手机号" value={this.state.form.telephone} />
                    </PreviewBody>
                    <PreviewFooter>
                        <PreviewButton  onClick={ e=> this.setState({ showDialog: true}) }>安全退出</PreviewButton>
                        <PreviewButton  onClick={(event) => { this.turnTO('/modify/'+this.state.form.userName); }}>修改密码</PreviewButton>
                        <PreviewButton  onClick={(event) => { this.turnTO('/modifyUser/'+this.state.form.userName
                                                            +'/'+this.state.form.realName
                                                            +'/'+this.state.form.telephone
                        ); }} primary>修改信息</PreviewButton>
                    </PreviewFooter>
                </Preview>

                <ButtonArea>
                    <Button  type="default" onClick={(event) => { this.goBack(); }}>
                        返回
                    </Button>
                </ButtonArea>

                <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>

                <Dialog type="ios" title={this.state.styleDialog.title} buttons={this.state.styleDialog.buttons} show={this.state.showDialog}>
                    确定要退出吗？
                </Dialog>

            </div>
        );
    }
}