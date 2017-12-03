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
                'name': ''
            }],
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
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSaveAndClose = () => {
        this.props.addRecipe({
            title: this.state.title,
            steps: this.state.steps,
            ingredients: this.state.ingredients,
            categories: ''
        });

        this.setState({
            recipeTitle: '',
            ingredients: [],
            steps: [],
            open: false
        });
        //TODO: POST to server

        // if (this.state.inputValue.trim() !== '') {
        //     fetch(`https://recipe-man-db.herokuapp.com/api/category/create`, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         body: "name=" + this.state.inputValue.trim().split(' ').join('+')
        //
        //     })
        //         .then(results => {
        //             return results;
        //         });
        // }

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
                        label="Add ingredient"
                        onClick={this.addIngredient}
                    />
                    <br/>
                    {this.state.ingredients.map(this.renderIngredient)}
                    <RaisedButton
                        label="Add step"
                        onClick={this.addStep}
                    />
                    {this.state.steps.map(this.renderRecipeStepText)}

                </Dialog>
            </div>
        );
    }
}
