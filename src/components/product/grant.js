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
    Form,
    FormCell,
    CellHeader,
    Label,
    TextArea,
    CellsTips
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class ProductGrant extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            form: {
              productId:props.match.params.productId,
              productName:props.match.params.productName,
                userName:''
            },

        }
    }

    grant = (event) => {
        console.log(this.state.form)
        Post('/orange/product/share',this.state.form).then(res => {

            console.log(res.data)

        }).catch(err => {

        })
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value
        console.log(this.state.form)
    }

    render() {
        return (
            <div>
                    <Page className="input" title="" subTitle="">
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">
                                    <CellsTitle>产品授权</CellsTitle>
                                </div>
                            </FlexItem>
                        </Flex>
                        <Flex>
                            <FlexItem>
                                <div className="placeholder">

                                    <CellsTitle>{this.state.form.productName+"("+this.state.form.productId+")"}</CellsTitle>
                                    <Form>
                                        <FormCell>
                                            <CellBody>
                                                <TextArea placeholder="授权给其他用户" rows="9" maxLength="2000"  defaultValue={this.state.form.userName} onBlur={this.handlerChange.bind(this,"userName")}></TextArea>
                                            </CellBody>

                                        </FormCell>

                                    </Form>
                                    <CellsTips>请输入对方的登录用户名，如果想授权给多个人，请用半角分号“;”隔开。</CellsTips>


                                    <ButtonArea  direction="horizontal">
                                        <Button type="default" onClick={(event) => { this.grant(); }}>确定授权</Button>
                                    </ButtonArea>
                                </div>
                            </FlexItem>
                        </Flex>


                    </Page>
            </div>
        )

    }

}