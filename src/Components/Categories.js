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

        this.state = {
            "categories": []
        }

    }

    renderCategory() {
        return (
            <Chip
             style={styles.chip}
           >
             Text Chip
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
            <div>
            {this.state.categories.map(this.renderIngredient)}
            </div>


        );
    }
}



export default Category;
