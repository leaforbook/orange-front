import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import MyWX from '../../images/my-weixin.jpg';
import ZanShang from '../../images/zanshuangma.png';
import '../../item.css';

export default class GetKey extends React.Component {
    constructor(props) {

        super(props);
        this.goBack = this.goBack.bind(this);

    }

    goBack () {
        this.props.history.goBack();
    }

    goToHome() {
        this.props.history.push("/home");
    }

    render() {
        return (
            <div>

                <Article>
                    <h1></h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h3>1.获取注册码或重置码</h3>
                            <p>扫描下面的微信二维码，加系统管理员为好友，经过您的同意下，拉您入微信交流群，并给您提供注册码或充值码。</p>
                            <p>
                                <img src={MyWX}/>
                            </p>
                        </section>
                        <section>
                            <h3>2.捐助</h3>
                            <p>微商代理助手是个人开发的软件，服务器、域名、SSL证书和其他服务都需要资金购买。为了后续提供更加丰富的功能，这里提供一个捐助入口。您的每一次捐助都将会让本助手更加实用更加方便，谢谢！</p>
                            <p>温馨提示：捐助自愿，量力而行</p>
                            <p>
                                <img src={ZanShang}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <ButtonArea  direction="horizontal">
                    <Button type="default" onClick={(event) => { this.goToHome(); }}>首页</Button>
                    <Button type="default" onClick={(event) => { this.goBack(); }}>返回</Button>
                </ButtonArea>

                <div className="fill_space"></div>

            </div>
        );
    }
}