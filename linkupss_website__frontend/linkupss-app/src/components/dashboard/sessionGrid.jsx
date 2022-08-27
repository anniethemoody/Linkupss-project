import React, { Component } from 'react';
import SessionCard from './sessionCard';
class SessionGrid extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <div className = "row" id ="card-grid-spacing">
           {(this.props.sessions).map(
            item =>
            <SessionCard key = {item._id} session={item} sessionEditClicked = {this.props.sessionEditClicked} numOfSessions={this.props.numOfSessions} confirmDeleteSession = {this.props.confirmDeleteSession}/>
           )}
           </div>
           </React.Fragment>
        );
    }
}
 
export default SessionGrid;