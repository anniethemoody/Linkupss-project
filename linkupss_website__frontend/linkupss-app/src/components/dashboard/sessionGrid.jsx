import React, { Component } from 'react';
import SessionCard from './sessionCard';
class SessionGrid extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <div className = "row" id = "card-grid-spacing">
           {(this.props.sessions).map(
            item =>
            <SessionCard key = {item._id} session={item} className = "" sessionEditClicked = {this.props.sessionEditClicked}/>
           )}
           </div>
           </React.Fragment>
        );
    }
}
 
export default SessionGrid;