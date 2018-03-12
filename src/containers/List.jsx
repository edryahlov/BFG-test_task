import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchOrder, placeTo, changeRating } from '../actions/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Item from '../containers/Item';

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
        const elems = document.querySelector(".items__shown");
        if (elems !== null){
            elems.classList.remove("items__shown");
            elems.classList.add("items__hidden");
        }
    }
    humanReadableTime = s => {
        let hh = ~~(s/(60*60));
        let mm = ~~(s/60%60);
        let ss = ~~(s%60);
        const zero = x => x < 10 ? '0'+x : x;
        return `${zero(hh)}ч. ${zero(mm)}м. ${zero(ss)}с.`;
    }
    renderItem = () => {
        if (!Array.isArray(this.props.fetchedData)) {
            let seconds400 = this.props.fetchedData.replace(/[^0-9]/g,'')
            return (
                <div className="text-center">
                    <p>Слишком много запросов с этого IP. Разбан через: {this.humanReadableTime(seconds400)}</p>
                    <p>Можно применить <a href="https://ultrasurf.us/" target="_blank">ultrasurf</a> :)</p>
                </div>
            );
        }
        return this.props.fetchedData.map((el,i)=>{
            return (
                <Draggable key={i} draggableId={i} index={i}>
                    {(provided, snapshot) => (
                        <div>
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="items__deck2">
                                <Item key={i}
                                    id={i}
                                    title={el.title}
                                    score={el.score}
                                    user_name={el.owner.display_name}
                                    user_rating={el.owner.reputation}
                                    views={el.view_count}
                                    last_activity_date={el.last_activity_date}
                                    is_answered={el.is_answered ? ' items__answered' : ''}
                                />
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Draggable>
            )
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
