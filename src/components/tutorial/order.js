import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import O1 from './O1.png';
import O2 from './O2.png';
import '../../item.css';

export default class TutorialOrder extends React.Component {
    constructor(props) {

        super(props);

    }


    render() {
        return (
            <div>

                <Article>
                    <h1>微商代理助手下单图文教程</h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h2>1.下单</h2>
                            <p>从产品详情页可以下单，下图是下单页，您可以选择收货人，也可以不选。选择了收货人就代表您的当前订单需要发货，没选择就不需要。</p>
                            <p>您必须选择对应的价格属性和运费属性，系统会根据您的选择自动计算好价格。</p>
                            <p>单价可以修改，运费也可以修改，总费用会根据您的修改自动变化</p>
                            <p>
                                <img src={O1}/>
                            </p>
                        </section>
                        <section>
                            <h2>2.订单详情页</h2>
                            <p>在订单详情页，您可以“删除”，“发货”和“修改状态”。发货在后续教程会专门讲。</p>
                            <p>
                                <img src={O2}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <div className="fill_space"></div>

            </div>
        );
    }
}