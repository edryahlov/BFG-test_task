import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchOrder, changeRating } from '../actions/index'
import * as conf from 'conf'

class Item extends Component {
    constructor(props) {
        super(props);
    }
    handleDoubleClick = (e) => {
        let clicked = +e.target.getAttribute('data-id');

        conf.double.flag ?
            conf.double = {...conf.double, flag: false, first: clicked} :
            conf.double = {...conf.double, flag: true, second: clicked};

        if (conf.double.flag) {
            this.props.switchOrder(this.props.fetchedData, conf.double.first, conf.double.second);
        }

    };
    handleUpDown = (e) => {
        let direction = e.target.getAttribute('data-direction');
        let clicked = +e.target.getAttribute('data-id');

        if (direction === 'down' && clicked !== this.props.fetchedData.length - 1) {
            this.props.switchOrder(this.props.fetchedData, clicked, clicked + 1);
        }
        else if (direction === 'up' && clicked !== 0) {
            this.props.switchOrder(this.props.fetchedData, clicked, clicked - 1);
        }
    };
    handleRatingUpDown = (e) => {
        let direction = e.target.getAttribute('data-rating');
        let clicked = +e.target.getAttribute('data-id');

        this.props.changeRating(this.props.fetchedData, direction, clicked);
    };
    render() {
        return(
            <div key={this.props.id} className={'row p-2 items__deck' + (this.props.is_answered ? ' items__answered' : '')}>
                <div data-id={this.props.id} className="col-8 items__info" onDoubleClick={this.handleDoubleClick}>
                    {this.props.title}<br/>
                    <div className="items__hidden">
                        Имя создателя вопроса: "{this.props.user_name}"<br/>
                        Рейтинг создателя вопроса: {this.props.user_rating}<br/>
                        Количество просмотров: {this.props.views}<br/>
                    </div>
                </div>
                    <div className="items__up" data-id={this.props.id} data-direction="up" onClick={this.handleUpDown}>up</div>
                    <div className="items__down" data-id={this.props.id} data-direction="down" onClick={this.handleUpDown}>down</div>
                    <div className="items__rating-down" data-id={this.props.id} data-rating="down" onClick={this.handleRatingUpDown}>-</div>
                    <div className="items__score">{this.props.score}</div>
                    <div className="items__rating-up" data-id={this.props.id} data-rating="up" onClick={this.handleRatingUpDown}>+</div>
            </div>
        );
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item)
