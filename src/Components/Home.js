import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
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
        this.state = {
            "recipes": []
        };

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.displayRecipes = this.displayRecipes.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.addStep = this.addStep.bind(this);
    }

    componentDidMount() {
        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.match.params.id}/recipes`)
        .then(results => {
            return results.json();
        }).then(data => {
            let recipes = data;
            this.setState({
                "recipes": recipes
            });
        })

        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.match.params.id}/pantry`)
        .then(results => {
            return results.json();
        }).then(data => {
            let pantry = data;
            this.setState({
                "pantry": pantry
            });
        })

        console.log("here");


        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.match.params.id}/shared`)
        .then(results => {
            return results.json();
        }).then(data => {
            let shared = data;
            this.setState({
                "shared": shared
            });
            console.log(shared);
        })
    }

    handleIngredientChange(recipeIdx, ingredientIdx, field, newVal) {
        if (!field) {
            return;
        }
        let newState = Object.assign({}, this.state);
        newState.recipes[recipeIdx]['ingredients'][ingredientIdx][field] = newVal;
        this.setState(newState);
        // TODO: Post update to server
    }

    handleStepChange(recipeIdx, stepIdx, newVal) {
        let newState = Object.assign({}, this.state);
        newState.recipes[recipeIdx]['steps'][stepIdx] = newVal;
        this.setState(newState);
        // TODO: Post update to server
    }

    addIngredient(recipeIdx) {
        return () => {
            let newState = Object.assign({}, this.state);
            newState.recipes[recipeIdx]['ingredients'].push({
                "quantity": "0",
                "unit": "units",
                "name": "ingredient"
            });
            this.setState(newState);
        }
        // TODO: Post update to server
    }

    addStep(recipeIdx) {
        return () => {
            let newState = Object.assign({}, this.state);
            newState.recipes[recipeIdx]['steps'].push('');
            this.setState(newState);
        }
        // TODO: Post update to server
    }

    displayRecipes() {
        let result = [];
        for (let x = 0; x < this.state.recipes.length; x++) {
            result.push(
                <Recipe
                    key={x}
                    idx={x}
                    recipe={this.state.recipes[x]}
                    handleIngredientChange={this.handleIngredientChange}
                    handleStepChange={this.handleStepChange}
                    addIngredient={this.addIngredient}
                    addStep={this.addStep}
                />
            )
        }
        return result;
    }

    render() {

        const id = this.props.match.params.id;

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
