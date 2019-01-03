import React from 'react';
import {
    Button,
    Flex,
    FlexItem,
    Form,
    FormCell,
    CellBody,
    Input,
    ButtonArea,
    Toast,
    Toptips,
    CellsTitle,
    TextArea,
    Panel,
    PanelBody,
    PanelHeader,
    CellHeader,
    Label,
    CellFooter,
    Cell,
    Picker
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import Page from "../page";
import Post from '../../public/http_util';
import "../../item.css";
import {NavBarItem} from "./index";

export default class AddressEdit extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            queryForm:{
                addressId:props.match.params.addressId || '',
            },
            showLoading: false,
            showWarn: false,
            warnMsg: '',
            form : {
                name: '',
                sex: '',
                provinceId:'',
                provinceName:'',
                address:'',
                telephone:'',
                mailcode:'',
                bak:''
            },
            provinces:[
                {
                    items:[

                    ]
                }
            ],
            province_show:false,
            province_value:'',
            sexes:[
                {
                    items:[
                        {
                            label:"先生"
                        },
                        {
                            label:"女士"
                        }
                    ]
                }
            ],
            sex_show:false,
            sex_value:'',
        }
    }

    componentWillMount()  {

        var provinces = sessionStorage.getItem("leaforbook-province");
        if(provinces!=null&&provinces!=undefined) {
            this.state.provinces[0].items = JSON.parse(provinces);
            this.setState({
                provinces: this.state.provinces,
            })
        } else {
            var url = '/common/province/query';

            Post(url).then(res => {
                sessionStorage.setItem("leaforbook-province",JSON.stringify(res.data))
                this.state.provinces[0].items = res.data;
                this.setState({
                    provinces: this.state.provinces,
                })
            }).catch(err => {

            });
        }

    }


    componentDidMount() {
        Post('/orange/address/get',this.state.queryForm).then(res => {
            this.setState({
                form:res.data,
            })
        }).catch(err => {

        });
    }

    handlerChange = (p,event) => {
        this.state.form[p] = event.target.value;
        this.setState({
            form:this.state.form,
        })
    }

    createAddress = (event) => {
        this.setState({showLoading: true});
        if(this.state.queryForm.addressId==='') {
            var url = '/orange/address/create';
            var data = this.state.form;

            Post(url,data).then(res => {
                this.setState({showLoading: false});
                this.props.history.push('/address/detail/'+res.data);
            }).catch(err => {
                this.setState({showLoading: false});
                this.showWarn(err);
            });
        }else {
            var url = '/orange/address/update';
            var data = this.state.form;

            Post(url,data).then(res => {
                this.setState({showLoading: false});
                this.props.history.push('/address/detail/'+this.state.queryForm.addressId);
            }).catch(err => {
                this.setState({showLoading: false});
                this.showWarn(err);
            });
        }

    }


    showWarn(msg) {
        this.setState({showWarn: true});
        this.setState({warnMsg: msg});

        this.state.warnTimer = setTimeout(()=> {
            this.setState({showWarn: false});
        }, 10000);
    }

    render() {
        return (
            <div>
                <Page className="input" title="" subTitle="">
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <CellsTitle>新增收货地址</CellsTitle>
                            </div>
                        </FlexItem>
                    </Flex>
                    <Flex>
                        <FlexItem>
                            <div className="placeholder">
                                <Form>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="text" defaultValue={this.state.form.name} placeholder="收货人姓名" onBlur={this.handlerChange.bind(this,"name")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" defaultValue={this.state.form.telephone}  placeholder="手机号码" onBlur={this.handlerChange.bind(this,"telephone")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="text"
                                                   value={this.state.form.sex}
                                                   onClick={ e=> {
                                                       //e.preventDefault();
                                                       this.setState({sex_show: true})
                                                   }}
                                                   placeholder="选择性别"
                                                   readOnly={true}
                                            />
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="text"
                                                   value={this.state.form.provinceName}
                                                   onClick={ e=> {
                                                       //e.preventDefault();
                                                       this.setState({province_show: true})
                                                   }}
                                                   placeholder="选择省份"
                                                   readOnly={true}
                                            />
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <Input type="tel" defaultValue={this.state.form.mailcode}  placeholder="邮政编码" onBlur={this.handlerChange.bind(this,"mailcode")}/>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <TextArea placeholder="详细地址" rows="2" maxLength={100}  value={this.state.form.address} onChange={this.handlerChange.bind(this,"address")}></TextArea>
                                        </CellBody>
                                    </FormCell>
                                    <FormCell>
                                        <CellBody>
                                            <TextArea placeholder="备注" rows="2" maxLength={200}  value={this.state.form.bak} onChange={this.handlerChange.bind(this,"bak")}></TextArea>
                                        </CellBody>
                                    </FormCell>
                                </Form>


                                <Toast icon="loading" show={this.state.showLoading}>保存中...</Toast>
                                <Toptips type="warn" show={this.state.showWarn}> {this.state.warnMsg} </Toptips>
                            </div>
                        </FlexItem>
                    </Flex>

                    <div className="fill_space"></div>
                    <div className="fill_space"></div>
                    <div className="fill_space"></div>

                    <div className="fixd_in_bottom">
                        <ButtonArea>
                            <Button
                                //button to display toptips
                                onClick={(event) => { this.createAddress(); }}>
                                保存
                            </Button>
                        </ButtonArea>
                    </div>


                </Page>


                <Picker
                    onChange={selected=>{
                        let value = ''
                        let id = ''
                        selected.forEach( (s,i)=> {
                            value = this.state.provinces[i]['items'][s].label;
                            id = this.state.provinces[i]['items'][s].provinceId;
                        })
                        this.state.form.provinceName = value;
                        this.state.form.provinceId = id;
                        this.setState({
                            form:this.state.form,
                            province_show: false
                        })
                    }}
                    groups={this.state.provinces}
                    show={this.state.province_show}
                    onCancel={e=>this.setState({province_show: false})}
                />

                <Picker
                    onChange={selected=>{
                        let value = ''
                        selected.forEach( (s,i)=> {
                            value = this.state.sexes[i]['items'][s].label
                        })
                        this.state.form.sex = value;
                        this.setState({
                            form:this.state.form,
                            sex_show: false
                        })
                    }}
                    groups={this.state.sexes}
                    show={this.state.sex_show}
                    onCancel={e=>this.setState({sex_show: false})}
                />
            </div>
        )
    }
}