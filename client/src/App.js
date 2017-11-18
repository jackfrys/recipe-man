import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './Components/Login.js'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter >
               <Switch>
                   <Route path="/" component={Login}/>
               </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
