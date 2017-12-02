import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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

        this.addIngredient = this.addIngredient.bind(this);

    }

    addIngredient() {
        //here we need to push the changes up to the db, but also update locally

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


    render() {
        if (this.props.pantry.ingredients) {
          var ingredients = this.props.pantry.ingredients.map(function (ingredient){
              return (
                <div>
                  <p>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>
                </div>
              );
          });
        }

        return (
            <Card>
                <CardTitle title="Your Pantry" subtitle="Here's what you have" />
                <CardText>
                {ingredients}
                <Divider />
                <Paper zDepth={2}>
                    <TextField hintText="Quanitity" style={style} underlineShow={false} />
                    <TextField hintText="Unit" style={style} underlineShow={false} />
                    <TextField hintText="Name" style={style} underlineShow={false} />
                    <button onClick={this.addIngredient}> Add </button>
                </Paper>
                </CardText>
            </Card>

        );
    }
}



export default Pantry;
