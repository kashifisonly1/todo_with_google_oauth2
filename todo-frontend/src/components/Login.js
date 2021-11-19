import React from 'react';
import { GoogleLogin } from 'react-google-login';
import CONSTANTS from '../constants';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {error:false, errorMessage:"", loading:false};
    }

    loginSuccess(res) {
        window.localStorage.setItem("IdToken", res.tokenId);
        // login user
        console.log(res);
        this.props.changeUserLoginStatus(true);
    }
    
    loginFailure(res) {
        this.setState({error:true, errorMessage:res.error, loading:false});        
    }
    
    render() {
        const {googleOAuthClientID, ApiUrl} = CONSTANTS;
        const {error, errorMessage, loading} = this.state;

        return (<div className={"container d-flex vh-100"}>
            <div className={"row align-items-center mx-auto h-100"}>
                <div className={"col-12 text-center"}>
                    <h3 className={"mb-3"}>Welcome to TODO App</h3>
                    {error&&<div className={"alert alert-danger"}>Login Error: {errorMessage}</div>}
                    {loading&&<i className={"fa fa-spinner fa-spin fa-lg"}></i>||
                    <GoogleLogin
                        clientId={googleOAuthClientID}
                        buttonText="Login With Google"
                        onSuccess={this.loginSuccess.bind(this)}
                        onFailure={this.loginFailure.bind(this)}
                        cookiePolicy={""}
                    />}
                </div>
            </div>
        </div>);
    }
}

export default Login;