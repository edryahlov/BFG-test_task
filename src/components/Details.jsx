import React, {Component} from 'react';

class Details extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="items__hidden">
                Имя создателя вопроса: <b>{this.props.user_name}</b><br/>
                Рейтинг создателя вопроса: <b>{this.props.user_rating}</b><br/>
                Количество просмотров: <b>{this.props.views}</b><br/>
            </div>
        )
    }
}

export default Details