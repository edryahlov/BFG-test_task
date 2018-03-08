import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchOrder, changeRating } from '../actions/index'

import Item from '../components/Item'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    double = {
        flag: true,
        first: 0,
        second: 0
    };
    handleDoubleClick = (e) => {
        let clicked = +e.target.getAttribute('data-id');

        this.double.flag ?
            this.double = {...this.double, flag: false, first: clicked} :
            this.double = {...this.double, flag: true, second: clicked};

        if (this.double.flag) {
            this.props.switchOrder(this.props.fetchedData, this.double.first, this.double.second);
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
    renderItem() {
        if (!Array.isArray(this.props.fetchedData)) return <p>{this.props.fetchedData}</p>; //если пришла ошибка 400 - выводим ответ TODO: возможно ее лучше запихать в рендер
        return this.props.fetchedData.map((el,i)=>{
            return (
                <div  key={i} className={'row p-2' + (el.is_answered ? ' items__answered' : '')}>
                    <div className="col-8 items__info" onDoubleClick={this.handleDoubleClick}>
                        <Item key={i}
                            id={i}
                            title={el.title}
                            score={el.score}
                            user_name={el.owner.display_name}
                            user_rating={el.owner.reputation}
                            views={el.view_count}
                            last_activity_date={el.last_activity_date}
                        />
                    </div>
                    <div className="col-4 items__nav">
                        <div className="items__up" data-id={i} data-direction="up" onClick={this.handleUpDown}>up</div>
                        <div className="items__down" data-id={i} data-direction="down" onClick={this.handleUpDown}>down</div>
                        <div className="items__rating-up" data-id={i} data-rating="up" onClick={this.handleRatingUpDown}>+</div>
                        <div className="items__score">{el.score}</div>
                        <div className="items__rating-down" data-id={i} data-rating="down" onClick={this.handleRatingUpDown}>-</div>
                    </div>
                </div>
            )
        });
    }
    render() {
        return(
            <div className="row items">
                <div className="col-12">
                    {this.renderItem()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List)
