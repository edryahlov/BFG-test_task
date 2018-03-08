import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, switchOrder } from "../actions/index"

import '../scss/main.scss'
import Header from '../containers/Header'
import List from '../containers/List'

class App extends Component {
    componentDidMount() {
        this.props.fetchData();
        // console.log(this.props)
    }
    render() {
        return(
            <div>
                <Header/>
                <br/><br/>
                <List/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { storeData: state.data };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchData, switchOrder }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
