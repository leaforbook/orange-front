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

export default class ProductFreight extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            freightQueryForm:{
                productId:props.match.params.productId,
            },
            freightForm:{
                productId:props.match.params.productId,
                list: [
                    {
                        freightId:'',
                        productId:'',
                        attributeValue:'',
                        freightPrice:'',
                        setOrNot:true,
                    },
                ]
            }
        }
    }

    componentDidMount() {
        var url = '/orange/freight/get';
        var data = this.state.freightQueryForm;

        Post(url,data).then(res => {
            this.state.freightForm.list = res.data;
            for(var i=0;i<res.data.length;i++) {
                if(res.data[i].isFree==="2") {
                    console.log("2")
                    this.state.freightForm.list[i].setOrNot = false;
                }else {
                    this.state.freightForm.list[i].setOrNot = true;
                }
            }

            this.setState({
                freightForm:this.state.freightForm
            })
        }).catch(err => {

        });
    }

    setOrNot = (i,pre,event) => {
        console.log(event.target.value);
        pre = pre===undefined ? true:pre
        this.state.freightForm.list[i].setOrNot = !pre;
        this.setState({
            freightForm:this.state.freightForm
        })
    }

    handlerFreightChange = (i,pros,event)  => {
        this.state.freightForm.list[i].freightPrice = event.target.value;
        this.setState({
            freightForm: this.state.freightForm,
        })
    }

    finish = (event) => {
        console.log(JSON.stringify(this.state.freightForm))
        var url = '/orange/freight/update';
        var data = this.state.freightForm;

        Post(url,data).then(res => {
            this.props.history.push('/product/list');
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
                                <CellsTitle>设置产品运费表</CellsTitle>
                            </div>
                        </FlexItem>
                    </Flex>
                    <Flex>
                        <FlexItem>
                            {
                                this.state.freightForm.list.map((freight,i) => {
                                    return (
                                        <Panel  key={i}>
                                            <PanelBody>
                                                <MediaBox type="text">
                                                    <MediaBoxTitle>{this.state.freightForm.list[i].attributeValue}</MediaBoxTitle>

                                                    <Form>

                                                        {
                                                            this.state.freightForm.list[i].setOrNot &&
                                                            <FormCell>
                                                                <CellHeader>
                                                                    <Label>运费</Label>
                                                                </CellHeader>
                                                                <CellBody>
                                                                    <Input defaultValue={this.state.freightForm.list[i].freightPrice} type="money" min="1" step="any" placeholder="0.00" onChange={this.handlerFreightChange.bind(this,i,"freightPrice")}/>
                                                                </CellBody>
                                                            </FormCell>
                                                        }


                                                        <FormCell switch>
                                                            <CellHeader>
                                                                <Label>包邮</Label>
                                                            </CellHeader>
                                                            <CellBody>
                                                                <Switch checked={!this.state.freightForm.list[i].setOrNot} onChange={this.setOrNot.bind(this,i,this.state.freightForm.list[i].setOrNot)}/>
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
                                <Button type="default" onClick={(event) => { this.finish(); }}>完成运费价格表</Button>
                            </ButtonArea>

                            <div className="fill_space"></div>

                        </FlexItem>
                    </Flex>
                </Page>
            </div>
        )
    }


}