import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Recipe extends Component {

    constructor(props) {
        super(props);
        this.displaySteps = this.displaySteps.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.renderIngredient = this.renderIngredient.bind(this);
        this.changeIngredientField = this.changeIngredientField.bind(this);
        this.displayCategories = this.displayCategories.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.renderStep = this.renderStep.bind(this);
        this.completeRecipe = this.completeRecipe.bind(this);

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
        this.props.deleteRecipe(this.props.idx);

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

    renderStep(step, idx) {
        if (!this.state.editing) {
            return (
                <p key={step+idx}>
                    {idx + 1}) {step}
                </p>
            );
        } else {
            return (
                <div key={idx}>
                    {idx + 1}
                    <input type="text" placeholder={step} onKeyUp={this.changeStep(idx)}/>
                </div>
            );
        }
    }

    editRecipe() {
        this.setState({
            "editing": !this.state.editing
        });
    }

    renderIngredient(ingredient, idx) {
        if (!this.state.editing || this.props.isShared) {
            return (
                <p key={idx}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </p>
            );
        } else {
            return (
                <div key={idx}>
                    <input type="number" placeholder={ingredient.quantity}
                           onKeyUp={this.changeIngredientField("quantity", idx)}/>
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

    changeStep(stepIdx) {
        return (event) => {
            this.props.handleStepChange(this.props.idx, stepIdx, event.target.value)
        }
    }

    completeRecipe() {

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
                    {this.state.editing && <RaisedButton
                        onClick={this.props.addIngredient(this.props.idx)}
                        label="Add Ingredient"
                    />}
                    {this.props.recipe.ingredients.map(this.renderIngredient)}
                    Steps:
                    {this.state.editing && <RaisedButton
                        onClick={this.props.addStep(this.props.idx)}
                        label="Add Step"
                    />}
                    {this.props.recipe.steps.map(this.renderStep)}
                    {!this.props.isShared && <RaisedButton onClick={this.editRecipe}>
                        {!this.state.editing ? 'Edit' : 'Save'}
                    </RaisedButton>}
                    <RaisedButton onClick={this.deleteRecipe}>
                        Delete
                    </RaisedButton>
                    <RaisedButton onClick={this.completeRecipe}>
                        Complete Recipe
                    </RaisedButton>
                </CardText>
            </Card>
        );
    }
}


export default Recipe;
