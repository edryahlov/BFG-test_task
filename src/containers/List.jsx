import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchOrder, placeTo, changeRating } from '../actions/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Item from '../containers/Item';
import Banned from '../components/Banned';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};
  

class List extends Component {
    constructor(props) {
        super(props);
    }
    onDragEnd = result => {
        if (!result.destination) return; // dropped outside the list
        this.props.placeTo(this.props.fetchedData, result.source.index, result.destination.index);
        // manupulate details info with effects and w/o bootstrap
        const elems = document.querySelector(".items__shown");
        if (elems !== null){
            elems.classList.remove("items__shown");
            elems.classList.add("items__hidden");
        }
    }
    renderItem = () => { // I can put this directly to the render, but this will be a kinda ugly imho
        if (!Array.isArray(this.props.fetchedData)) { // in case of IP ban
            const secondsLeft = this.props.fetchedData.replace(/[^0-9]/g,'')
            return <Banned secondsLeft={secondsLeft} />
        }
        return this.props.fetchedData.map((el,i) => {
            return <Item 
                        key={i}
                        id={i}
                        title={el.title}
                        score={el.score}
                        user_name={el.owner.display_name}
                        user_rating={el.owner.reputation}
                        views={el.view_count}
                        last_activity_date={el.last_activity_date}
                        is_answered={el.is_answered ? ' items__answered' : ''}
                    />
        });
    }
    render() {
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <div className="row items">
                                <div className="col-12">
                                    {this.renderItem()}
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapStateToProps = state => {return { fetchedData: state.data }};
const mapDispatchToProps = dispatch => bindActionCreators({ switchOrder, placeTo, changeRating }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);
