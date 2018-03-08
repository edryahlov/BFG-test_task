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
            startDate: startDate,
            prevDate: startDate,
            buttonActive: false
        };
    }
    componentDidMount() {
    }
    handleChange = date => {
        this.setState({startDate: date},()=>{
            if (moment(this.state.prevDate._d).unix() !== moment(this.state.startDate._d).unix()) {
                this.setState({buttonActive: true})
            } else {
                this.setState({buttonActive: false})
            }
        })
    };
    handleButton = () => {
        this.props.fetchData(moment(this.state.startDate).unix());
        this.setState({
            prevDate: this.state.startDate,
            buttonActive: false
        })
    };
    render() {
        return(
            <header>
                5 самых популярных вопросов на StackOverFlow, содержащих "react-redux" в наименовании, начиная с
                <DatePicker selected={this.state.startDate} maxDate={moment()} onSelect={this.handleChange} todayButton="Сегодня"/>
                <button onClick={this.handleButton} className={this.state.buttonActive ? 'visible': 'hidden'}>Поиск</button>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData }, dispatch);

export default connect(null, mapDispatchToProps)(Header)