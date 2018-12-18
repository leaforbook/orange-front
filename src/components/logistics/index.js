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
    Tab,
    NavBarItem,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import "react-weui/build/packages/components/ptr/ptr.less";

export default class Logistics extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            addressList: [

            ],
            addressQueryForm:{
                queryParams:'',
                pageSize:20,
                pageNum:1
            },
            isFinish:false,
            tableIndex:sessionStorage.getItem("leaforbook-logistics-tableIndex")===null?0:parseInt(sessionStorage.getItem("leaforbook-logistics-tableIndex")),
        }
    }


    turnTO = (path,event) => {
        this.props.history.push(path);
    }

    componentWillMount() {
        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }

    searchAddress = (queryParams,event) =>  {

        this.state.addressQueryForm[queryParams] = event;
        this.state.addressQueryForm.pageNum = 1;
        this.setState({
            addressQueryForm:this.state.addressQueryForm,
            isFinish:false,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }


    concatAddressList = (event) =>  {
        this.state.addressQueryForm.pageNum = this.state.addressQueryForm.pageNum+1;
        this.setState({
            addressQueryForm : this.state.addressQueryForm,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            if(res.data.length <= 0) {
                this.setState({
                    isFinish:true,
                });
            } else {
                this.setState({
                    addressList:this.state.addressList.concat(res.data),
                });
            }

        }).catch(err => {

        })
    }

    refreshAddressList = (event) =>  {
        this.state.addressQueryForm.pageNum = 1;
        this.setState({
            addressQueryForm : this.state.addressQueryForm,
            isFinish:false,
        })

        Post('/orange/address/query',this.state.addressQueryForm).then(res => {

            this.state.addressList = res.data;

            this.setState({
                addressList:this.state.addressList,
            });

        }).catch(err => {

        })
    }

    changeTableIndex = (event) => {
        this.setState({
            tableIndex : event
        });
        sessionStorage.setItem("leaforbook-logistics-tableIndex",event);
    }

    render() {
        return (
            <div>

                <Tab type="navbar" onChange={this.changeTableIndex.bind(this)}  defaultIndex={this.state.tableIndex}>
                    <NavBarItem label="发货">

                        111

                    </NavBarItem>


                    <NavBarItem label="地址">

                        <InfiniteLoader
                            onLoadMore={ (event, finish) => {

                                this.concatAddressList();

                                {
                                    if(this.state.isFinish){
                                        finish()
                                    }else{
                                        event()
                                    }
                                }

                            }}
                            disable={this.state.isFinish}
                        >
                            <Page className="ptr" title="" subTitle="">


                                <PullToRefresh

                                    onRefresh={(event) => {

                                        this.refreshAddressList();

                                        {
                                            //mock add item after 1s and then resolve
                                            setTimeout(()=>{
                                                this.setState({

                                                }, ()=> event())
                                            }, 1000)
                                        }
                                    }}
                                >

                                    <SearchBar
                                        onChange={this.searchAddress.bind(this,"queryParams")}
                                        defaultValue={this.state.addressQueryForm.queryParams}
                                        placeholder="搜索地址"
                                        lang={{
                                            cancel: '取消'
                                        }}
                                    />
                                    <CellsTitle>地址列表</CellsTitle>
                                    <Cells>
                                        {this.state.addressList.map((address,i) => {
                                            return (


                                                <Panel  access key={i} onClick={(event) => { this.turnTO('/address/detail/'+address.addressId); }}>
                                                    <PanelBody>
                                                        <MediaBox type="text">
                                                            <MediaBoxTitle>{address.name}</MediaBoxTitle>
                                                            <MediaBoxDescription>
                                                                {address.telephone} {address.provinceName} {address.address}
                                                            </MediaBoxDescription>
                                                        </MediaBox>
                                                    </PanelBody>
                                                </Panel>
                                            )

                                        })}

                                    </Cells>

                                </PullToRefresh>
                            </Page>
                        </InfiniteLoader>

                        <div className="fill_space"></div>
                        <div className="fill_space"></div>
                        <div className="fill_space"></div>

                        <div className="fixd_in_bottom">
                            <ButtonArea   direction="horizontal">
                                <Button  onClick={(event) => { this.turnTO('/address/edit'); }}>新增地址</Button>
                            </ButtonArea>
                        </div>
                    </NavBarItem>
                </Tab>
            </div>
        )
    }

}