import React from 'react';
import {
    Page,
    Article,
    ButtonArea,
    Button
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Video1 from './video-1.png';
import '../../item.css';

export default class TutorialVideo extends React.Component {
    constructor(props) {

        super(props);

    }


    render() {
        return (
            <div>

                <Article>
                    <h1>微商代理助手视频教程</h1>
                    <section>
                        <h2 className="title"></h2>
                        <section>
                            <h3>微商代理助手视频教程（一期）</h3>
                            <p>长按下面的二维码，跳转到一期视频教程</p>
                            <p>
                                <img src={Video1}/>
                            </p>
                        </section>
                    </section>
                </Article>

                <div className="fill_space"></div>

            </div>
        );
    }
}