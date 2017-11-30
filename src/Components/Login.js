import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/App.css';
import logo from '../css/logo.svg';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(e) {
        console.log("Handling user change: ", e.target.value)
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        console.log("Handling pw change: ", e.target.value)
        this.setState({
            password: e.target.value
        })
    }

    login() {
        var loginUrl = `https://recipe-man-db.herokuapp.com/api/user/${this.state.username}/${this.state.password}`;

        fetch(loginUrl).then(results => {
            return results.json();
        }).then(data => {
            console.log(data);

            if (data.length > 0) {
                window.location = '/home/' + data[0]._id;
            }

        })
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <form>
                    <FormControl
                        id="Username"
                        type="text"
                        label="Username"
                        placeholder="Username"
                        onChange={this.handleUserChange}
                    />
                    <FormControl
                        id="Password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                    />
                </form>
                <button onClick={this.login.bind(this)}>
                    Login
                </button>
            </div>
        );
    }


}

export default Login;
