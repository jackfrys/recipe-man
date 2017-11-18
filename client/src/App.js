import React, {Component} from 'react';
import {FormControl} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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

    render() {
        return (
            <div className="Appp">
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
            </div>
        );
    }
}

export default App;
