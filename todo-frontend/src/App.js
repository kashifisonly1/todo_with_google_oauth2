import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Login from './components/Login';
import Home from './components/Home';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn:false
        };
    }

    componentDidMount() {
        if(window.localStorage.getItem("IdToken"))
            this.changeUserLoginStatus(true);
    }    

    changeUserLoginStatus(status) {
        this.setState({isLoggedIn:status});
    }

    render() {
        const {isLoggedIn} = this.state;

        return (!isLoggedIn&&
            <Login changeUserLoginStatus={this.changeUserLoginStatus.bind(this)}/>
            ||
            <Home changeUserLoginStatus={this.changeUserLoginStatus.bind(this)}/>
        );
    }
}

export default App;
