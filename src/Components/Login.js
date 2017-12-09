import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/App.css';
import {Redirect } from 'react-router'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            id: "",
            loggedIn: false
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    login() {
        var loginUrl = `https://recipe-man-db.herokuapp.com/api/user/${this.state.username}/${this.state.password}`;

        fetch(loginUrl).then(results => {
            return results.json();
        }).then(data => {
            if (data.length > 0) {
                this.setState({
                    'id': data[0]._id,
                    'loggedIn': true
                });
            } else {
                alert('Please enter a correct username/pw combination');
            }
        });
    }


    render() {
        return (
            this.state.loggedIn ?
                <Redirect to={`/home/${this.state.id}`} /> :
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Recipe Man</h1>
                </header>
                <p className="App-intro">
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
