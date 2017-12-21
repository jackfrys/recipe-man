import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Delete from 'material-ui/svg-icons/action/delete';

const style = {
    marginLeft: 20,
    width: "28%"
};

const buttonStyle = {
    cursor: 'pointer'
};

export default class NewRecipeModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ingredients: [{
                'quantity': '',
                'unit': '',
                'name': '',
            }],
            categories: [],
            steps: [``],
            open: false
        };
        this.handleRecipeTitleChange = this.handleRecipeTitleChange.bind(this);
        this.handleStepInput = this.handleStepInput.bind(this);
        this.handleIngredientInput = this.handleIngredientInput.bind(this);
        this.renderRecipeStepText = this.renderRecipeStepText.bind(this);
        this.addStep = this.addStep.bind(this);
        this.renderIngredient = this.renderIngredient.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.renderCategory = this.renderCategory.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.addCategory = this.addCategory.bind(this);
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            recipeTitle: '',
            ingredients: [{
                'quantity': '',
                'unit': '',
                'name': ''
            }],
            steps: [''],
            categories: [],
            open: false
        });
    };

    handleSaveAndClose = () => {

        var categoryIDs = [];


        for (let x = 0; x < this.state.categories.length; x++) {
            if (this.state.categories[x].trim() !== '') {
                fetch(`/api/category`, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "name=" + this.state.categories[x].trim().split(' ').join('+')

                })
                .then(results => {
                    return results.json();
                })
                .then(results => {
                    categoryIDs.push(results._id);
                });
            }
        }


        this.setState({
            categories: categoryIDs
        })

        fetch(`/api/${this.props.userID}/recipe/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(results => {
            return results;
        }).catch(function(error) {
            console.log(error);
        });

        this.props.addRecipe({
            title: this.state.title,
            steps: this.state.steps,
            ingredients: this.state.ingredients,
            _id: '',
            categories: this.state.categories
        });
        this.handleClose();
    };

    handleRecipeTitleChange(e) {
        this.setState({
            'title': e.target.value
        });
    }

    handleStepInput(idx) {
        return function (e) {
            let steps = this.state.steps.concat([]);
            steps[idx] = e.target.value;
            this.setState({
                'steps': steps
            });
        }.bind(this);
    }

    renderRecipeStepText(step, idx) {
        return (
            <div key={idx}>
                Step {(idx + 1) + ') '}
                <TextField
                    id={step}
                    hintText={`Step ${idx + 1}`}
                    value={this.state.steps[idx]}
                    onChange={this.handleStepInput(idx)}
                />
            </div>
        );
    }

    addStep() {
        this.setState({
            steps: this.state.steps.concat(``)
        });
    }

    addIngredient() {
        this.setState({
            ingredients: this.state.ingredients.concat({
                'quantity': '',
                'unit': '',
                'name': ''
            })
        });
    }

    handleIngredientInput(idx, field) {
        return function (e) {
            console.log(`idx: ${idx} field: ${field} newVal: ${e.target.value}`);
            let newIngredients = this.state.ingredients.concat([]);
            newIngredients[idx][field] = e.target.value;
            this.setState({
                ingredients: newIngredients
            });
        }.bind(this);
    }

    removeIngredient(idx) {
        return function () {
            let oldIngredients = this.state.ingredients.concat([]);
            oldIngredients.pop(idx);
            this.setState({
                ingredients: oldIngredients
            });
        }.bind(this);

    }

    renderIngredient(ingredient, idx) {
        return (
            <div>
                <Delete
                    onClick={this.removeIngredient(idx)}
                    style={buttonStyle}
                />
                <TextField
                    hintText={`Quantity`}
                    style={style}
                    value={this.state.ingredients[idx].quantity}
                    onChange={this.handleIngredientInput(idx, 'quantity')}
                />
                <TextField
                    hintText={`Unit`}
                    style={style}
                    value={this.state.ingredients[idx].unit}
                    onChange={this.handleIngredientInput(idx, 'unit')}
                />
                <TextField
                    hintText={`Name`}
                    style={style}
                    value={this.state.ingredients[idx].name}
                    onChange={this.handleIngredientInput(idx, 'name')}
                />
            </div>
        );
    }

    addCategory() {
        this.setState({
            categories: this.state.categories.concat('')
        });
    }

    handleCategoryChange(idx) {
        return function (e) {
            let newCategories = this.state.categories.concat([]);
            newCategories[idx] = e.target.value;
            this.setState({
                categories: newCategories
            });
        }.bind(this);
    }

    renderCategory(ingredient, idx) {
        return (
            <div>
                <TextField
                    hintText={`Category`}
                    value={this.state.categories[idx]}
                    onChange={this.handleCategoryChange(idx)}
                />
            </div>
        )
    }


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSaveAndClose}
            />,
        ];


        return (
            <div>
                <RaisedButton
                    label="New Recipe"
                    onClick={this.handleOpen}/>
                <Dialog
                    title="Create New Recipe"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >

                    <TextField
                        floatingLabelText="Recipe Title"
                        floatingLabelFixed={true}
                        value={this.state.inputValue}
                        onChange={this.handleRecipeTitleChange}
                    />
                    <br/>
                    <RaisedButton
                        label="Add Ingredient"
                        onClick={this.addIngredient}
                    />
                    <br/>
                    {this.state.ingredients.map(this.renderIngredient)}
                    <RaisedButton
                        label="Add Step"
                        onClick={this.addStep}
                    />
                    {this.state.steps.map(this.renderRecipeStepText)}
                    <RaisedButton
                        label="Add Category"
                        onClick={this.addCategory}
                    />
                    <br/>
                    {this.state.categories.map(this.renderCategory)}
                </Dialog>
            </div>
        );
    }
}
