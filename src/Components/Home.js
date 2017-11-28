import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Recipe from './Recipe.js'


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Home extends Component {
    render() {
        return (
            <Tabs>
               <Tab label="Recipes">
                 <div>
                   <Recipe/>
                 </div>
               </Tab>
               <Tab label="Pantry">
                 <div>
                   <h2 style={styles.headline}>Tab Two</h2>
                   <p>
                     This is another example tab.
                   </p>
                 </div>
               </Tab>
               <Tab label="Account">
                 <div>
                   <h2 style={styles.headline}>Tab Two</h2>
                   <p>
                     This is another example tab.
                   </p>
                 </div>
               </Tab>
            </Tabs>
        );
    }
}

export default Home;
