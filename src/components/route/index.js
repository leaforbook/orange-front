import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Post from "../../public/http_util";

export default class AuthorizedRoute extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            logged: false,
            pending: true
        }

        this.getLoggedUser();
    }


    getLoggedUser() {
        Post('/common/user/get').then(res => {

            if(res.code === '0') {
                this.setState({
                    logged: true,
                    pending:false
                });
            } else {
                this.setState({
                    logged: false,
                    pending:false
                });
            }

        }).catch(err =>{
            this.setState({
                logged: false,
                pending:false
            });
        })
    }



    render() {
        const { component: Component, ...rest } = this.props

        return (
            <Route {...rest} render={props => {
                if (this.state.pending) return <div>Loading...</div>
                return this.state.logged
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }} />
        )
    }

}
