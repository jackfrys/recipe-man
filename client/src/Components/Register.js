import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/App.css';
import {Redirect } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 15,
};


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            name: "",
            isRegisted: false
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

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

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    signup() {
        var loginUrl = `/api/user/create`;

        fetch(loginUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(results => {
            return results.json();
        }).then(data => {
            console.log(data);

            this.setState({
                isRegisted: true
            })
        });
    }


    render() {
        return (
            this.state.isRegisted ?
                <Redirect to={`/`} /> :
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Register for Recipe Man</h1>
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
                    <FormControl
                        id="Name"
                        label="Name"
                        type="text"
                        placeholder="Name"
                        onChange={this.handleNameChange}
                    />
                    <FormControl
                        id="Email"
                        label="email"
                        type="email"
                        placeholder="Email"
                        onChange={this.handleEmailChange}
                    />
                </form>
                <RaisedButton style={style} onClick={this.signup.bind(this)}>
                    Register
                </RaisedButton>
            </div>
        );
    }


}

export default Register;
