"use strict";

import React, { PropTypes } from 'react';

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : "2016-01-15T01:06"
        };
    }

    render() {
        return (
            <input type="datetime-local" ref={(date) => {this.dateRef = date;}} value={this.state.date} onChange={this._onDateChange.bind(this)}/>
        );
    }

    _onDateChange(e) {
        let state = this.state;
        state['date'] = e.target.value;
        // Or (you can use below method to access component in another method)
        state['date'] = this.dateRef.value;
        this.setState(state);
    }

}

export default Calender;
