import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import D1 from './D1.png';
import D2 from './D2.png';
import D3 from './D3.png';
import D4 from './D4.png';
import '../../item.css';

export default class TutorialDeliver extends React.Component {
    constructor(props) {

        super(props);

    }


    render() {
        return (
            <div>

                <Article>
                    <h1>微商代理助手发货视频教程</h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h2>1.发货</h2>
                            <p>点击订单详情页的发货，只要输入快递公司和订单号，就能完成发货。快递公司可以搜索，很多公司都可以搜到。</p>
                            <p>
                                <img src={D1}/>
                                <img src={D2}/>
                                <img src={D3}/>
                            </p>
                        </section>
                        <section>
                            <h2>1.发货后的订单</h2>
                            <p>发货后的订单，可以看到物流信息</p>
                            <p>
                                <img src={D4}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <div className="fill_space"></div>

            </div>
        );
    }
}