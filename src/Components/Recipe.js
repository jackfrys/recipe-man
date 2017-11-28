import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';


const example_recipe = {
    title: "Eggs",
    steps: ["Make eggs", "Eat Eggs"],
    ingredients: [
        {
            name: "eggs",
            quanitity: 3,
            q_label: ""
        },
        {
            name: "cheese",
            quanitity: "1",
            q_label: "cups"
        }
    ]
}


function displayIngredients() {

    let result = [];

    for (let x = 0; x < example_recipe.ingredients.length; x++) {
        result.push(
            <p>
                {example_recipe.ingredients[x].quanitity} {example_recipe.ingredients[x].q_label} {example_recipe.ingredients[x].name}
            </p>
        )
    }

    return result;
}

class Recipe extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                  title={example_recipe.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                     {displayIngredients()}
                     // displaySteps();
               </CardText>
            </Card>
        );
    }
}

export default Recipe;
