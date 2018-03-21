import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchOrder, changeRating } from '../actions/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as conf from 'conf';
import Details from '../components/Details';
import ItemsNavs from '../containers/ItemsNavs';

class Item extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = (e) => {
        // hide'n'show hidden details with css effects w/o bootstrap
        if (e.target.children[0].className === 'items__hidden') {
            const elems = document.querySelector(".items__shown");
            if (elems !== null){
                elems.classList.remove("items__shown");
                elems.classList.add("items__hidden");
            }
            e.target.children[0].className = 'items__shown'
        } else {
            e.target.children[0].className = 'items__hidden'
        }
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
    render() {
        return(
            <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.id}>
                    {(provided, snapshot) => (
                        <div>
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="items__deck2">

                                <div key={this.props.id} className={'row items__deck' + (this.props.is_answered ? ' items__answered' : '')}>
                                    <div className="col-md-8 col-xs-12 align-self-center items__info" onDoubleClick={this.handleDoubleClick} onClick={this.handleClick} data-id={this.props.id} >
                                        {this.props.title}
                                        <Details user_name={this.props.user_name} user_rating={this.props.user_rating} views={this.props.views} />
                                    </div>
                                    <div className="col-md-4 col-xs-12 align-self-center text-right">
                                        <ItemsNavs id={this.props.id} score={this.props.score} />
                                    </div>
                                </div>

                             </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Item);
