import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class NewRecipeModal extends React.Component {

constructor(props) {
  super(props);
  this.state = {
      inputValue: '',
        open: false
      };
    };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSaveAndClose = () => {

    if (this.state.inputValue.trim() !== '') {
        fetch(`https://recipe-man-db.herokuapp.com/api/category/create`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "name=" + this.state.inputValue.trim().split(' ').join('+')

        })
        .then(results => {
            return results;
        });
    }

    this.setState({open: false});
  };

  updateInputValue = (evt) => {
      this.setState({
            inputValue: evt.target.value
        });
    };



  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSaveAndClose}
      />,
    ];


    return (
      <div>
        <RaisedButton label="New Category" onClick={this.handleOpen} />
        <Dialog
          title="Create New Category"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

        <TextField
          floatingLabelText="Enter Category Here"
          value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}
        />
        </Dialog>
      </div>
    );
  }
}
