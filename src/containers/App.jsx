import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../actions/index';

import '../scss/main.scss';
import Header from '../containers/Header';
import List from '../containers/List';

class App extends Component {
    componentDidMount() {
        this.props.fetchData();
    }
    render() {
        return(
            <div className="container">
                <Header/>
                <List/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData }, dispatch);

export default connect(null, mapDispatchToProps)(App);
