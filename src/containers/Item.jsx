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
    handleClick = (e) => {
        e.target.children[0].style.height === "100%" ? 
            e.target.children[0].style.cssText = '' : 
            e.target.children[0].style.cssText = "height: 100%; padding: 30px 0 20px;"
    }
    handleDoubleClick = (e) => {
        let clicked = +e.target.getAttribute('data-id');

        conf.double.flag ?
            conf.double = {...conf.double, flag: false, first: clicked} :
            conf.double = {...conf.double, flag: true, second: clicked};

        if (conf.double.flag) {
            this.props.switchOrder(this.props.fetchedData, conf.double.first, conf.double.second);
        }

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
            <div key={this.props.id} className={'row items__deck' + (this.props.is_answered ? ' items__answered' : '')}>
                <div data-id={this.props.id} className="col-md-8 col-xs-12 align-self-center items__info" onDoubleClick={this.handleDoubleClick} onClick={this.handleClick}>
                    {this.props.title}
                    <div className="items__hidden">
                        Имя создателя вопроса: <b>{this.props.user_name}</b><br/>
                        Рейтинг создателя вопроса: <b>{this.props.user_rating}</b><br/>
                        Количество просмотров: <b>{this.props.views}</b><br/>
                    </div>
                </div>
                <div className="col-md-4 col-xs-12 align-self-center text-right">
                    <div className="items__score-wrap">
                        <div className="items__rating-down" data-id={this.props.id} data-rating="down" onClick={this.handleRatingUpDown}>-</div>
                        <div className="items__score">{this.props.score}</div>
                        <div className="items__rating-up" data-id={this.props.id} data-rating="up" onClick={this.handleRatingUpDown}>+</div>
                    </div>
                    <FontAwesome name='angle-up' className="items__up" data-id={this.props.id} data-direction="up" onClick={this.handleUpDown}/>
                    <FontAwesome name='angle-down' className="items__down" data-id={this.props.id} data-direction="down" onClick={this.handleUpDown}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item);
