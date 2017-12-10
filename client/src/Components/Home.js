import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Recipe from './Recipe.js';
import Pantry from './Pantry.js';
import Categories from './Categories.js';
import NewCategoryModal from './NewCategoryModal.js';
import NewRecipeModal from './NewRecipeModal.js';

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
            "recipes": [],
            "sharedRecipes": [],
            "pantry": [[]]
        };

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.displayRecipes = this.displayRecipes.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.addStep = this.addStep.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.pushRecipeToServer = this.pushRecipeToServer.bind(this);

    }

    componentDidMount() {
        fetch(`/api/${this.props.match.params.id}/recipes`)
            .then(results => {
                return results.json();
            }).then(data => {
            let recipes = data;
            this.setState({
                "recipes": recipes,
            });
        });

        fetch(`/api/${this.props.match.params.id}/shared`)
            .then(results => {
                return results.json();
            }).then(data => {
            let recipes = data;
            console.log(recipes);

            this.setState({
                "sharedRecipes": recipes
            });
        });

        fetch(`/api/${this.props.match.params.id}/pantry`)
            .then(results => {
                return results.json();
            }).then(data => {
            let pantry = data;
            this.setState({
                "pantry": pantry
            });
        });
    }

    pushRecipeToServer(recipeIdx) {

        fetch(`/api/recipe/${this.state.recipes[recipeIdx]._id}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.recipes[recipeIdx])
        })
        .then(results => {
            return results;
        }).catch(function(error) {
            console.log(error);
        });
    }


    addRecipe(recipe) {
        this.setState({
            recipes: this.state.recipes.concat(recipe)
        });
    }

    deleteRecipe(idx) {
        let newRecipes = this.state.recipes.concat([]);
        newRecipes.pop(idx);
        this.setState({
            recipes: newRecipes
        });
        fetch(`/api/${this.state.recipes[idx]._id}`, {
            method: "DELETE"
        })


    }

    handleIngredientChange(recipeIdx, ingredientIdx, field, newVal) {
        if (!field) {
            return;
        }
        let newState = Object.assign({}, this.state);
        newState.recipes[recipeIdx]['ingredients'][ingredientIdx][field] = newVal;
        this.setState(newState);
    }

    handleStepChange(recipeIdx, stepIdx, newVal) {
        let newState = Object.assign({}, this.state);
        newState.recipes[recipeIdx]['steps'][stepIdx] = newVal;
        this.setState(newState);

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
    }

    addStep(recipeIdx) {
        return () => {
            let newState = Object.assign({}, this.state);
            newState.recipes[recipeIdx]['steps'].push(`Step ${newState.recipes[recipeIdx]['steps'].length + 1}`)
            this.setState(newState);

        }

    }


    displayRecipes() {
        let result = [];
        for (let x = 0; x < this.state.recipes.length; x++) {
            result.push(
                <Recipe
                    key={x}
                    idx={x}
                    recipe={this.state.recipes[x]}
                    isShared={false}
                    handleIngredientChange={this.handleIngredientChange}
                    handleStepChange={this.handleStepChange}
                    addIngredient={this.addIngredient}
                    addStep={this.addStep}
                    deleteRecipe={this.deleteRecipe}
                    saveRecipe={this.pushRecipeToServer}
                    userPantryID={this.state.pantry[0]._id}
                />
            )
        }
        for (let x = 0; x < this.state.sharedRecipes.length; x++) {
            result.push(
                <Recipe
                    key={x}
                    idx={x}
                    isShared={true}
                    recipe={this.state.sharedRecipes[x]}
                    handleIngredientChange={this.handleIngredientChange}
                    handleStepChange={this.handleStepChange}
                    addIngredient={this.addIngredient}
                    addStep={this.addStep}
                    deleteRecipe={this.deleteRecipe}
                    saveRecipe={this.pushRecipeToServer}
                    userPantryID={this.state.pantry[0]._id}
                />
            )
        }

        return result;
    }

    render() {

        let userID = this.props.match.params.id;

        return (
            <Tabs>
                <Tab label="Recipes">
                    <div>
                        <NewRecipeModal addRecipe={this.addRecipe} userID={userID}/>
                        {this.displayRecipes()}

                    </div>
                </Tab>
                <Tab label="Pantry">
                    <div>
                        <Pantry userID={userID}/>
                    </div>
                </Tab>
                <Tab label="Categories">
                    <div>
                        <h2 style={styles.headline}>Categories</h2>
                        <NewCategoryModal/>
                        <Categories/>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export default Home;
