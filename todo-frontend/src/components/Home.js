import React from 'react';
import { GoogleLogout } from 'react-google-login';
import TODO from './TODO';
import CONSTANTS from '../constants';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            loading:true,
            userData:{}
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem("IdToken");
        fetch(CONSTANTS.ApiUrl+"user/verify", 
            {headers:{authorization:token}})
        .then(res=>{
            if(res.status!=200) {
                window.localStorage.removeItem("IdToken");
                this.props.changeUserLoginStatus(false);                
                return false;
            }
            return res.json()
        })
        .then(data=>{
            if(data)
                this.setState({loading:false, userData:data});
        })
        .catch(err=>{
            window.localStorage.removeItem("IdToken");
            this.props.changeUserLoginStatus(false);
        });
    }

    logoutUser(res) {
        window.localStorage.removeItem("IdToken");
        this.props.changeUserLoginStatus(false);        
    }

    failureLogout(res) {
        window.localStorage.removeItem("IdToken");
        this.props.changeUserLoginStatus(false);         
    }

    render() {
        const {googleOAuthClientID} = CONSTANTS;
        const {loading} = this.state;
        if(loading)
            return (<div className={"container d-flex vh-100"}>
                <div className={"row align-items-center mx-auto h-100"}>
                    <div className={"col-12 text-center"}>
                        {loading&&<i className={"fa fa-spinner fa-spin fa-lg"}></i>}
                    </div>
                </div>
            </div>);
        return (<>
            <div className={"container-fluid bg-dark text-light m-0"}>
                <div className={"row p-2"}>
                    <div className={"col-auto my-auto"}>
                        <img src={this.state.userData.picture} width={30} className={"mx-2 rounded-circle"}/>
                        <span className={"my-auto"}>Welcome, {this.state.userData.name}</span>
                    </div>
                    <div className={"col-auto ms-auto"}>
                        <GoogleLogout
                            clientId={googleOAuthClientID}
                            buttonText = {"Logout"}
                            onLogoutSuccess={this.logoutUser.bind(this)}
                            onFailure={this.failureLogout.bind(this)}
                        />
                    </div>
                </div>
            </div>

            <TODO changeUserLoginStatus={this.props.changeUserLoginStatus}/>
            </>);
    }
}

export default Home;