import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import ZanShang from '../../images/zanshuangma.png';
import '../../item.css';

export default class ZanShangComponent extends React.Component {
    constructor(props) {

        super(props);

    }


    render() {
        return (
            <div>

                <Article>
                    <h1></h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h3>感谢您的捐助</h3>
                            <p>微商代理助手是个人开发的软件，服务器、域名、SSL证书和其他服务都需要资金购买。为了后续提供更加丰富的功能，这里提供一个捐助入口。您的每一次捐助都将会让本助手更加实用更加方便，谢谢！</p>
                            <p>温馨提示：捐助自愿，量力而行</p>
                            <p>
                                <img src={ZanShang}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <div className="fill_space"></div>

            </div>
        );
    }
}