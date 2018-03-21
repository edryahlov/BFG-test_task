import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchOrder, changeRating } from '../actions/index';
import FontAwesome from 'react-fontawesome';
import * as conf from 'conf';

class Item extends Component {
    constructor(props) {
        super(props);
    }
    handleUpDown = (e) => {
        let direction = e.target.getAttribute('data-direction');
        let clicked = +e.target.getAttribute('data-id');

        if (direction === 'down' && clicked !== this.props.fetchedData.length - 1) {
            this.props.switchOrder(this.props.fetchedData, clicked, clicked + 1);
        }
        else if (direction === 'up' && clicked !== 0) {
            this.props.switchOrder(this.props.fetchedData, clicked, clicked - 1);
        }
    }
    handleRatingUpDown = (e) => {
        let direction = e.target.getAttribute('data-rating');
        let clicked = +e.target.getAttribute('data-id');

        this.props.changeRating(this.props.fetchedData, direction, clicked);
    }
    render() {
        return(
            <div>
                <div className="items__score-wrap">
                    <div className="items__rating-down" data-id={this.props.id} data-rating="down" onClick={this.handleRatingUpDown}>-</div>
                    <div className="items__score">{this.props.score}</div>
                    <div className="items__rating-up" data-id={this.props.id} data-rating="up" onClick={this.handleRatingUpDown}>+</div>
                </div>
                <FontAwesome name='angle-up' className="items__up" data-id={this.props.id} data-direction="up" onClick={this.handleUpDown}/>
                <FontAwesome name='angle-down' className="items__down" data-id={this.props.id} data-direction="down" onClick={this.handleUpDown}/>
            </div>
        );
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item);