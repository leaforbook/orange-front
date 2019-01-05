import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import P1 from './p1.png';
import P2 from './p2.png';
import P3 from './p3.png';
import P4 from './p4.png';
import P5 from './p5.png';
import P6 from './p6.png';
import '../../item.css';

export default class TutorialProduct extends React.Component {
    constructor(props) {

        super(props);

    }


    render() {
        return (
            <div>

                <Article>
                    <h1>微商代理助手创建产品图文教程</h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h2>第一步：填写产品基本信息</h2>
                            <p>产品基本信息包括产品名称和产品描述</p>
                            <p>
                                <img src={P1}/>
                            </p>
                        </section>
                        <section>
                            <h2>第二步：设置产品价格属性</h2>
                            <p>产品价格属性就是影响产品价格的因素，以赣南脐橙为例子，影响它价格的因素有：种类，大小，重量。看下图的详细设置：</p>
                            <p>
                                <img src={P2}/>
                            </p>
                        </section>
                        <section>
                            <h2>第三步：设置产品运费属性</h2>
                            <p>产品运费属性就是影响运费的因素，还是以赣南脐橙为例子，影响它运费的因素有：地区，重量等。看下图的详细设置：</p>
                            <p>
                                <img src={P3}/>
                            </p>
                        </section>
                        <section>
                            <h2>第四步：设置产品价格表</h2>
                            <p>第二步完成了设置产品价格属性，系统会根据价格属性自动生成价格表，只要在对应属性上填好进价和售价就行。假如没有对应的属性，就选择不上架，看下图的详细设置：</p>
                            <p>
                                <img src={P4}/>
                            </p>
                        </section>
                        <section>
                            <h2>第五步：设置产品运费表</h2>
                            <p>第三步完成了设置产品运费属性，系统会根据运费属性自动生成运费表，只要在对应属性上填好运费就行，还可以选择包邮。看下图的详细设置：</p>
                            <p>
                                <img src={P5}/>
                            </p>
                        </section>
                        <section>
                            <h2>第六步：如何使用产品</h2>
                            <p>以上五步已经完成了创建产品的任务，下图是产品详情页。产品的创建者可以在该页面“删除”，“修改”，“授权”，“下单”等操作，下单在后续教程专门说。这里详细说说授权。</p>
                            <p>因为产品创建操作太复杂，不是所有人都会用，而且不需要每个人都去创建。您创建完产品后，可以授权给自己的小伙伴，小伙伴得到您的授权后，就可以使用您创建的产品进行下单。您的小伙伴对您创建的产品只有使用权，只能“下单”，不能“删除”，“修改”，“授权”。</p>
                            <p>如果您得到别人授权的产品，又想修改它，就“复制”它，复制完以后的产品，就是属于您的了，您的“修改”，“删除”都不会影响原产品</p>
                            <p>
                                <img src={P6}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <div className="fill_space"></div>

            </div>
        );
    }
}