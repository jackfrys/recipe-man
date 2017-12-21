import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/App.css';
import {Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 15,
};



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
        var loginUrl = `/api/user/${this.state.username}/${this.state.password}`;

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
                <RaisedButton style={style} onClick={this.login.bind(this)}>
                    Login
                </RaisedButton>
                <Route render={({ history}) => (
                    <RaisedButton style={style}
                    onClick={() => { history.push('/register') }}
                    >
                            Register
                    </RaisedButton>
                )} />
            </div>
        );
    }


}

export default Login;
