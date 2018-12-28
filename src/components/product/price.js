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
                all:true,
            },
            priceForm:{
                productId:props.match.params.productId,
                list: [
                   {
                       priceId:'',
                       productId:'',
                       attributeValue:'',
                       inPrice:'',
                       outMinPrice:'',
                       outMaxPrice:'',
                       setOrNot:true,
                   },
                ]
            }
        }
    }

    componentDidMount() {
        var url = '/orange/price/get';
        var data = this.state.priceQueryForm;

        Post(url,data).then(res => {
            this.state.priceForm.list = res.data;
            for(var i=0;i<res.data.length;i++) {
                if(res.data[i].isGrounding==="2") {
                    this.state.priceForm.list[i].setOrNot = false;
                }else {
                    this.state.priceForm.list[i].setOrNot = true;
                }

            }

            this.setState({
                priceForm:this.state.priceForm
            })
        }).catch(err => {

        });
    }

    setOrNot = (i,pre,event) => {
        console.log(event.type);
        pre = pre===undefined ? true:pre
        this.state.priceForm.list[i].setOrNot = !pre;
        this.setState({
            priceForm:this.state.priceForm
        })
    }

    handlerInPriceChange = (i,pros,event)  => {
        this.state.priceForm.list[i].inPrice = event.target.value;
        this.setState({
            priceForm: this.state.priceForm,
        })
    }

    handlerOutPriceChange = (i,pros,event)  => {
        this.state.priceForm.list[i].outMinPrice = event.target.value;
        this.setState({
            priceForm: this.state.priceForm,
        })
    }

    finish = (event) => {
        console.log(JSON.stringify(this.state.priceForm))
        var url = '/orange/price/update';
        var data = this.state.priceForm;

        Post(url,data).then(res => {
            this.props.history.push('/product/freight/'+this.state.priceQueryForm.productId);
        }).catch(err => {

        });
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
                                this.state.priceForm.list.map((price,i) => {
                                    return (
                                        <Panel  key={i}>
                                            <PanelBody>
                                                <MediaBox type="text">
                                                    <MediaBoxTitle>{this.state.priceForm.list[i].attributeValue}</MediaBoxTitle>

                                                        <Form>
                                                            {
                                                                this.state.priceForm.list[i].setOrNot &&
                                                                <FormCell>
                                                                    <CellHeader>
                                                                        <Label>进价</Label>
                                                                    </CellHeader>
                                                                    <CellBody>
                                                                        <Input defaultValue={this.state.priceForm.list[i].inPrice} type="number" min="1" step="any" placeholder="0.00" onChange={this.handlerInPriceChange.bind(this,i,"inPrice")}/>
                                                                    </CellBody>
                                                                </FormCell>

                                                            }

                                                            {
                                                                this.state.priceForm.list[i].setOrNot &&
                                                                <FormCell>
                                                                    <CellHeader>
                                                                        <Label>售价</Label>
                                                                    </CellHeader>
                                                                    <CellBody>
                                                                        <Input defaultValue={this.state.priceForm.list[i].outMinPrice} type="money" min="1" step="any" placeholder="0.00" onChange={this.handlerOutPriceChange.bind(this,i,"outMinPrice")}/>
                                                                    </CellBody>
                                                                </FormCell>
                                                            }


                                                            <FormCell switch>
                                                                <CellHeader>
                                                                    <Label>不上架</Label>
                                                                </CellHeader>
                                                                <CellBody>
                                                                    <Switch checked={!this.state.priceForm.list[i].setOrNot} onChange={this.setOrNot.bind(this,i,this.state.priceForm.list[i].setOrNot)}/>
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
                                <Button type="default" onClick={(event) => { this.finish(); }}>完成产品价格表</Button>
                            </ButtonArea>

                            <div className="fill_space"></div>

                        </FlexItem>
                    </Flex>
                </Page>
            </div>
        )
    }


}