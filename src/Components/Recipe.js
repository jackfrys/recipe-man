import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Recipe extends Component {

    constructor(props) {
        super(props);
        this.displaySteps = this.displaySteps.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.renderIngredient = this.renderIngredient.bind(this);
        this.changeIngredientField = this.changeIngredientField.bind(this);
        this.displayCategories = this.displayCategories.bind(this);
        this.state = {
            "editing": false
        };

    }

    displayCategories() {
        let result = [];

        for (let x = 0; x < this.props.recipe.categories.length; x++) {
            result.push(
                <p>
                    {this.props.recipe.categories[x]}
                </p>
            )
        }

        return result;

    }

    deleteRecipe() {

        console.log(this.props.recipe._id);

        alert('are you sure?');

        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.recipe._id}`, {
            method: "DELETE"
        })
            .then(results => {
                console.log(results)
            }).catch(function (error) {
            console.log(error);
        });

    }

    displaySteps() {

        let result = [];

        for (let x = 0; x < this.props.recipe.steps.length; x++) {
            result.push(
                <p>
                    {x + 1}. {this.props.recipe.steps[x]}
                </p>
            )
        }

        return result;
    }

    editRecipe() {
        console.log("edit")
        this.setState({
            "editing": !this.state.editing
        })
    }

    renderIngredient(ingredient, idx) {
        if (!this.state.editing) {
            return (
                <p key={idx}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </p>
            );
        } else {
            return (
                <div key={idx}>
                    <input type="number" placeholder={ingredient.quantity} onKeyUp={this.changeIngredientField("quantity", idx)}/>
                    <input type="text" placeholder={ingredient.unit} onKeyUp={this.changeIngredientField("unit", idx)}/>
                    <input type="text" placeholder={ingredient.name} onKeyUp={this.changeIngredientField("name", idx)}/>
                </div>
            );
        }
    }

    changeIngredientField(field, ingredientIdx) {
        return (event) => {
            this.props.handleIngredientChange(this.props.idx, ingredientIdx, field, event.target.value);
        }
    }

    render() {

        return (
            <Card>
                <CardHeader
                    title={this.props.recipe.title}
                    actAsExpander={true}
                    showExpandableButton={true}
                >
                {this.displayCategories()}
                </CardHeader>
                <CardText expandable={true}>
                    Ingredients:
                    {this.props.recipe.ingredients.map(this.renderIngredient)}
                    Steps:
                    {this.displaySteps()}
                    <button onClick={this.editRecipe}>
                        {!this.state.editing ? 'Edit' : 'Save'}
                    </button>
                    <button onClick={this.deleteRecipe}>
                        Delete
                    </button>
                </CardText>
            </Card>
        );
    }
}


export default Recipe;
