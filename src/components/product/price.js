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
    Flex,
    FlexItem,
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    Form,
    FormCell,
    Switch,
    CellHeader,
    Label,
    Input
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class ProductPrice extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            priceQueryForm:{
                productId:props.match.params.productId,
            },
            priceForm:[
                {
                    priceId:'',
                    productId:'',
                    attributeJson:'',
                    inPrice:'',
                    outMinPrice:'',
                    outMaxPrice:'',
                    setOrNot:true,
                },
            ]
        }
    }

    componentDidMount() {
        var url = '/orange/price/get';
        var data = this.state.priceQueryForm;

        Post(url,data).then(res => {
            this.state.priceForm = res.data;
            for(var i=0;i<res.data.length;i++) {
                this.state.priceForm[i].setOrNot = true;
            }

            this.setState({
                priceForm:this.state.priceForm
            })
        }).catch(err => {

        });
    }

    setOrNot = (i,pre,event) => {
        pre = pre===undefined ? true:pre
        this.state.priceForm[i].setOrNot = !pre;
        this.setState({
            priceForm:this.state.priceForm
        })
    }

    handlerInPriceChange = (i,pros,event)  => {
        this.state.priceForm[i].inPrice = event.target.value;
        this.setState({
            priceForm: this.state.priceForm,
        })
    }

    handlerOutPriceChange = (i,pros,event)  => {
        this.state.priceForm[i].outMinPrice = event.target.value;
        this.setState({
            priceForm: this.state.priceForm,
        })
    }

    finish = (event) => {
        console.log(JSON.stringify(this.state.priceForm))
        
    }

    render() {
        return (
            <div>
                <Page className="panel" title="" subTitle="">
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <CellsTitle>设置产品价格表</CellsTitle>
                            </div>
                        </FlexItem>
                    </Flex>
                    <Flex>
                        <FlexItem>
                            {
                                this.state.priceForm.map((price,i) => {
                                    return (
                                        <Panel  key={i}>
                                            <PanelBody>
                                                <MediaBox type="text">
                                                    <MediaBoxTitle>{this.state.priceForm[i].attributeJson}</MediaBoxTitle>

                                                        <Form>
                                                            {
                                                                this.state.priceForm[i].setOrNot &&
                                                                <FormCell>
                                                                    <CellHeader>
                                                                        <Label>进价</Label>
                                                                    </CellHeader>
                                                                    <CellBody>
                                                                        <Input defaultValue={this.state.priceForm[i].inPrice} type="number" min="1" step="any" placeholder="0.00" onChange={this.handlerInPriceChange.bind(this,i,"inPrice")}/>
                                                                    </CellBody>
                                                                </FormCell>

                                                            }

                                                            {
                                                                this.state.priceForm[i].setOrNot &&
                                                                <FormCell>
                                                                    <CellHeader>
                                                                        <Label>售价</Label>
                                                                    </CellHeader>
                                                                    <CellBody>
                                                                        <Input defaultValue={this.state.priceForm[i].outMinPrice} type="money" min="1" step="any" placeholder="0.00" onChange={this.handlerOutPriceChange.bind(this,i,"outMinPrice")}/>
                                                                    </CellBody>
                                                                </FormCell>
                                                            }


                                                            <FormCell switch>
                                                                <CellHeader>
                                                                    <Label>无</Label>
                                                                </CellHeader>
                                                                <CellBody>
                                                                    <Switch onChange={this.setOrNot.bind(this,i,this.state.priceForm[i].setOrNot)}/>
                                                                </CellBody>
                                                            </FormCell>
                                                        </Form>
                                                </MediaBox>
                                            </PanelBody>
                                        </Panel>
                                    )
                                })
                            }

                            <ButtonArea  direction="horizontal">
                                <Button type="default" onClick={(event) => { this.finish(); }}>完成产品价格设置</Button>
                            </ButtonArea>

                            <div className="fill_space"></div>

                        </FlexItem>
                    </Flex>
                </Page>
            </div>
        )
    }


}