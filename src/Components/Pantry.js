import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


const style = {
    marginLeft: 20,
    width: "20%"
};

class Pantry extends Component {


    constructor(props) {
        super(props);
        this.state = {
            'pantry': {},
            'quantity': '',
            'unit': '',
            'name': ''
        };

        this.addIngredient = this.addIngredient.bind(this);
        this.renderIngredient = this.renderIngredient.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);

    }

    componentDidMount() {
        fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.userID}/pantry`)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log("logged in")
                let pantry = data;
                this.setState({
                    "pantry": pantry[0]
                });
        });
    }

    addIngredient() {
        if (!this.state.quantity.trim() || !this.state.unit.trim() || !this.state.name.trim()) {
            alert('You\'re missing a quantity, ingredient, or name');
            return;
        }
        let newState = Object.assign({}, this.state);
        newState.pantry.ingredients = this.state.pantry.ingredients.concat({
            'quantity': this.state.quantity,
            'unit': this.state.unit,
            'name': this.state.name
        });
        this.setState(newState);
        //TODO: push changes to the db

        //here we need to push the changes up to the db

        // fetch(`https://recipe-man-db.herokuapp.com/api/${this.props.pantry._id}/update`, {
        //     method: "PUT",
        //     body: {
        //         name: this.props.pantry.name,
        //         ingredients:
        //             // this.props.pantry.ingredients.concat()
        //     }
        // })
        // .then(results => {
        //     console.log(results)
        // }).catch(function(error) {
        //     console.log(error);
        // });
    }

    handleIngredientChange(field) {
        return (e) => {
            e.preventDefault();
            let newState = Object.assign({}, this.state);
            newState[field] = e.target.value;
            this.setState(newState);
        };
    }

    renderIngredient(ingredient, idx) {
        return (
            <div key={ingredient.name + idx}>
                <p>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>
            </div>
        );
    }


    render() {

        return (
            <Card>
                <CardTitle title="Your Pantry" subtitle="Here's what you have"/>
                <CardText>
                    {this.state.pantry.ingredients && this.state.pantry.ingredients.map(this.renderIngredient)}
                    <Divider/>
                    <Paper zDepth={2}>
                        <TextField
                            hintText="Quantity"
                            style={style}
                            underlineShow={false}
                            onChange={this.handleIngredientChange('quantity')}
                        />
                        <TextField
                            hintText="Unit"
                            style={style}
                            underlineShow={false}
                            onChange={this.handleIngredientChange('unit')}
                        />
                        <TextField
                            hintText="Name"
                            style={style}
                            underlineShow={false}
                            onChange={this.handleIngredientChange('name')}
                        />
                        <button onClick={this.addIngredient}> Add</button>
                    </Paper>
                </CardText>
            </Card>

        );
    }
}


export default Pantry;
