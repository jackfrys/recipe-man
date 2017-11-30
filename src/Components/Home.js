import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Recipe from './Recipe.js'
import NewRecipeModal from './NewRecipeModal.js'


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class Home extends Component {

    constructor(props) {
        super(props);
        this.setState({
            "recipes": []
        });

        this.displayRecipes = this.displayRecipes.bind(this);
    }

    componentDidMount() {
        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.match.params.id}/recipes`)
        .then(results => {
            return results.json();
        }).then(data => {
            var recipes = data;
            this.setState({
                "recipes": recipes
            });
        })

        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.match.params.id}/pantry`)
        .then(results => {
            return results.json();
        }).then(data => {
            var pantry = data;
            console.log(pantry);
            this.setState({
                "pantry": pantry
            });
        })

    }

    displayRecipes() {

        let result = [];

        if (this.state) {

            for (let x = 0; x < this.state.recipes.length; x++) {
                console.log("here");

                result.push(
                    <Recipe recipe={this.state.recipes[x]}/>
                )
            }

            return result;
        } else {
            return '';
        }
    }



    render() {

        const id = this.props.match.params.id;

        console.log(this.state);

        return (
            <Tabs>
               <Tab label="Recipes">
                 <div>
                    <NewRecipeModal/>
                    {this.displayRecipes()}
                 </div>
               </Tab>
               <Tab label="Pantry">
                 <div>
                   <h2 style={styles.headline}>Tab Two</h2>
                   <p>
                     This is another example tab. {id}
                   </p>
                 </div>
               </Tab>
               <Tab label="New Recipe">
                 <div>
                   <h2 style={styles.headline}>New Recipe</h2>
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
