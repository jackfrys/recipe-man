import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
    marginLeft: 20,
    width: "28%"
};

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
            "editing": false,
            "isDisabled": true
        };

    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.userPantryID !== undefined && typeof nextProps.recipe.id !== undefined) {

            console.log(`https://recipe-man-db.herokuapp.com/api/recipe/${this.props.recipe._id}/complete/${nextProps.userPantryID}`);

            fetch(`https://recipe-man-db.herokuapp.com/api/recipe/${this.props.recipe._id}/complete/${nextProps.userPantryID}`)
                .then(results => {
                    return results.json();
                }).then(data => {
                    console.log(data);
                    if (data['allows'] === false) {
                        this.setState({
                            "isDisabled": true
                        })
                    } else {
                        this.setState({
                            "isDisabled": false
                        })
                    }
            });
        }
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
                <li key={step + idx}>
                    {step}
                </li>
            );
        } else {
            return (
                <li key={idx}>
                    <TextField
                        style={style}
                        defaultValue={step}
                        onChange={this.changeStep(idx)}
                    />
                </li>
            );
        }
    }

    editRecipe() {
        this.setState({
            "editing": !this.state.editing
        });
        this.props.saveRecipe(this.props.idx);

    }

    renderIngredient(ingredient, idx) {
        if (!this.state.editing || this.props.isShared) {
            return (
                <li key={idx}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
            );
        } else {
            return (
                <div key={idx}>
                    <TextField
                        style={{'width': '3%'}}
                        defaultValue={ingredient.quantity}
                        onChange={this.changeIngredientField("quantity", idx)}
                    />
                    <TextField
                        style={style}
                        defaultValue={ingredient.unit}
                        onChange={this.changeIngredientField("unit", idx)}
                    />
                    <TextField
                        style={style}
                        defaultValue={ingredient.name}
                        onChange={this.changeIngredientField("name", idx)}
                    />
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

        fetch(`https://recipe-man-db.herokuapp.com/api/recipe/${this.props.recipe._id}/complete/5a1f7bb46e72390004960cab`, {
            method: 'POST'
        })
            .then(results => {
                console.log(results);
        });

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
                    <h3> Ingredients: </h3>
                    {this.state.editing && <RaisedButton
                        onClick={this.props.addIngredient(this.props.idx)}
                        label="Add Ingredient"
                    />}
                    <ul>
                        {this.props.recipe.ingredients.map(this.renderIngredient)}
                    </ul>
                    <h3> Steps: </h3>
                    {this.state.editing && <RaisedButton
                        onClick={this.props.addStep(this.props.idx)}
                        label="Add Step"
                    />}
                    <ol>
                        {this.props.recipe.steps.map(this.renderStep)}
                    </ol>
                    {!this.props.isShared && <RaisedButton onClick={this.editRecipe}>
                        {!this.state.editing ? 'Edit' : 'Save'}
                    </RaisedButton>}
                    <RaisedButton onClick={this.deleteRecipe}>
                        Delete
                    </RaisedButton>
                    <RaisedButton onClick={this.completeRecipe} disabled={this.state.isDisabled}>
                        Complete Recipe
                    </RaisedButton>
                </CardText>
            </Card>
        );
    }
}


export default Recipe;
