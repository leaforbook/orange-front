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
    Toptips,
    Preview,
    PreviewHeader,
    PreviewItem,
    PreviewBody

} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class AddressDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form:{
                addressId:props.match.params.addressId,
            },
            result:{

            },
            bottom_show:false,
            showWarn: false,
            passwordForm:{
                password:''
            },
        }

        Post('/orange/address/get',this.state.form).then(res => {

            this.setState({
                result:res.data,
            });

        }).catch(err => {

        })
    }

    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    handlerChangePassword = (p,event) => {
        this.state.passwordForm[p] = event.target.value
    }

    verifyPassword = (event) => {
        var url = '/common/user/verifyPassword';
        var data = this.state.passwordForm;

        Post(url,data).then(res => {

            Post("/orange/address/delete",this.state.form).then(res => {
                this.props.history.push('/logistics');
            }).catch(err => {
                this.showWarn(err);
            });

        }).catch(err => {
            this.showWarn(err);
        });

        this.setState({bottom_show: false});
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

                <Preview>
                    <PreviewHeader>
                        <PreviewItem label="姓名" value={this.state.result.name +"  "+this.state.result.sex} />
                    </PreviewHeader>
                    <PreviewBody>
                        <PreviewItem label="手机" value={this.state.result.telephone} />
                        <PreviewItem label="省份" value={this.state.result.provinceName} />
                        <PreviewItem label="地址" value={this.state.result.address} />
                        <PreviewItem label="邮编" value={this.state.result.mailcode} />
                        <PreviewItem label="备注" value={this.state.result.bak} />
                    </PreviewBody>
                </Preview>

                <div className="fixd_in_bottom">
                    <ButtonArea   direction="horizontal">
                        <Button type={"default"}  onClick={(event)=>this.setState({bottom_show: true})}>删除</Button>
                        <Button  onClick={(event) => { this.turnTO('/address/edit/'+this.state.form.addressId); }}>修改</Button>
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

            </div>
        )
    }
}