import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div data-id={this.props.id}>
                {this.props.title}<br/>
                <div className="items__hidden">
                    Имя создателя вопроса: "{this.props.user_name}"<br/>
                    Рейтинг создателя вопроса: {this.props.user_rating}<br/>
                    Количество просмотров: {this.props.views}<br/>
                </div>
            </div>
        );
    }
}

export default Item
