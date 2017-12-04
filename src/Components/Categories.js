import React, {Component} from 'react';

import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class Category extends Component {


    constructor(props) {
        super(props);


        this.renderCategory = this.renderCategory.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);

        this.state = {
            "categories": []
        }

    }

    handleRequestDelete(event, idx) {
      alert("Whoops this isn't wired up yet!");
    }


    renderCategory(category, idx) {
        return (
                <Chip
                 onRequestDelete={this.handleRequestDelete}
                 style={styles.chip}
               >
                 {category.name}
               </Chip>
        )
    }

    componentDidMount() {
        fetch(`https://recipe-man-db.herokuapp.com/api/categories`)
            .then(results => {
                return results.json();
            }).then(data => {
            let categories = data;
            console.log(categories)
            this.setState({
                "categories": categories
            });
        });
    }

    render() {

        return (
            <div style={styles.wrapper}>
            {this.state.categories.map(this.renderCategory)}
            </div>


        );
    }
}



export default Category;
