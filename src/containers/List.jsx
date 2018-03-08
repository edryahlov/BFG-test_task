import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchOrder, placeTo, changeRating } from '../actions/index'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Item from '../containers/Item'

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
    }
    renderItem() {
        if (!Array.isArray(this.props.fetchedData)) return <p>{this.props.fetchedData}</p>; //если пришла ошибка 400 - выводим ответ TODO: возможно ее лучше запихать в рендер
        return this.props.fetchedData.map((el,i)=>{
            return (
                <Draggable key={i} draggableId={i} index={i}>
                    {(provided, snapshot) => (
                        <div>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="items__deck2"
                            >

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

export default connect(mapStateToProps, mapDispatchToProps)(List)
