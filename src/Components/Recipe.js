import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';


class Recipe extends Component {


    deleteRecipe() {

        console.log(this.props.recipe._id);

        alert('are you sure?');

        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.recipe._id}`, {
            method: "DELETE"
        })
        .then(results => {
            console.log(results)
        }).catch(function(error) {
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
            "editing": false
        })
    }

    displayIngredients() {

        console.log("call me");

        let result = [];

        let tag = "";

        for (let x = 0; x < this.props.recipe.ingredients.length; x++) {
            if (!this.state.editing) {
                result.push(
                    <p>
                        {this.props.recipe.ingredients[x].quantity} {this.props.recipe.ingredients[x].unit} {this.props.recipe.ingredients[x].name}
                    </p>
                )
            } else {
                result.push(
                    <div>
                        <input>
                            {this.props.recipe.ingredients[x].quantity}
                        </input>
                        <input>
                         {this.props.recipe.ingredients[x].unit}
                        </input>
                        <input>
                         {this.props.recipe.ingredients[x].name}
                        </input>
                    </div>

                )
            }
        }

        return result;
    }

    constructor(props) {
        super(props);

        this.displayIngredients = this.displayIngredients.bind(this);
        this.displaySteps = this.displaySteps.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);

        this.setState({
            "editing": false
        })

    }

    render() {
        return (
            <Card>
                <CardHeader
                  title={this.props.recipe.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                    Ingredients:
                        {this.displayIngredients}
                     Steps:
                        {this.displaySteps()}
                     <button onClick={this.editRecipe}>
                        Edit
                     </button>
                     <button onClick={this.deleteRecipe}>
                        Delete
                     </button>
                     <button>
                        Save
                     </button>
               </CardText>
            </Card>
        );
    }
}



export default Recipe;
