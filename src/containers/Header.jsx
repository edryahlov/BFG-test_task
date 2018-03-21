import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from "../actions/index"

import 'react-datepicker/dist/react-datepicker.css';

class Header extends Component {
    constructor (props) {
        super(props);
        const startDate = moment().set({'year': 2018, 'month': 0, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0});
        this.state = {
            currentDate: startDate,
            prevDate: startDate,
            buttonActive: false
        };
    }
    componentDidMount() {
    }
    handleChange = date => {
        this.setState({currentDate: date}, () => { // "callback hell" - PERHAPS (c) :D
            if (moment(this.state.prevDate._d).unix() !== moment(this.state.currentDate._d).unix()) {
                this.setState({buttonActive: true})
            } else {
                this.setState({buttonActive: false})
            }
        })
    };
    handleButton = () => {
        this.props.fetchData(moment(this.state.currentDate).unix());
        this.setState({
            prevDate: this.state.currentDate,
            buttonActive: false
        })
    };
    render() {
        return(
            <header className="row">
                <div className="col-12">
                    <h1 className="text-center">
                        5 самых популярных вопросов на StackOverFlow, содержащих <span className="nobr">"react-redux"</span> в наименовании, начиная с
                        <DatePicker selected={this.state.currentDate} maxDate={moment()} onSelect={this.handleChange} todayButton="Сегодня"/>
                        {this.state.buttonActive ? <button onClick={this.handleButton}>Поиск</button> : null}
                    </h1>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData }, dispatch);

export default connect(null, mapDispatchToProps)(Header);