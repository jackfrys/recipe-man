import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from './Components/Login.js'
import Home from './Components/Home.js'
import Register from './Components/Register.js'


class App extends Component {

    render() {
        return (
            <MuiThemeProvider>
            <BrowserRouter >
               <Switch>
                   <Route exact path="/" component={Login}/>
                   <Route exact path="/register" component={Register}/>
                   <Route path="/home/:id" component={Home}/>
               </Switch>
            </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
