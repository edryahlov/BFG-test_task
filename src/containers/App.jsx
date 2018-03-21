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
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef = node => {
        this.wrapperRef = node;
    }
    handleClickOutside = e => {
        // hide all visible details with css effects w/o bootstrap
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            const elems = document.querySelector(".items__shown");
            if (elems !== null){
                elems.classList.remove("items__shown");
                elems.classList.add("items__hidden");
            }
        }
    }
    render() {
        return(
            <div ref={this.setWrapperRef}>
                <div className="container">
                    <Header/>
                    <List/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData }, dispatch);

export default connect(null, mapDispatchToProps)(App);
