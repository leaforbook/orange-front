import React from 'react';
import {
    Preview,
    PreviewHeader,
    PreviewItem,
    PreviewFooter,
    PreviewButton,
    PreviewBody
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Post from '../../public/http_util';

export default class User extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            form : {
                userName: '',
                realName: '',
                telephone:''
            }
        }

        Post('/common/user/get').then(res => {
            this.setState({
                form : {
                    userName: res.data.userName,
                    realName: res.data.realName,
                    telephone:res.data.telephone
                }
            });
        })

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
                        <PreviewButton >修改密码</PreviewButton>
                        <PreviewButton primary>修改信息</PreviewButton>
                    </PreviewFooter>
                </Preview>

            </div>
        );
    }
}