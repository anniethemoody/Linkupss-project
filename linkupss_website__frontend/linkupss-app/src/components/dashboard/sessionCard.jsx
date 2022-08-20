import React, { Component } from 'react';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from '@mui/icons-material/Close';
class SessionCard extends Component {

    findBadgeType() {
        let badge_class_name = "flex badge badge-";
        const time_type = this.props.session.session_time;
        //console.log(time_type);
        //console.log(time_type.charAt(0));
        if (time_type.charAt(0)==='0') {
          badge_class_name += "warning";
         // console.log(badge_class_name)
        } else {
          badge_class_name += "primary";
          
        }
        return badge_class_name;
    }
    render() { 
        const {session,sessionEditClicked} = this.props;

        return (
            <div className="col-sm-4 pb-2">
            <div className="card card-outline-info card-spacing">
              <div className="card-block">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  style={{}}
                >
                  <span className="float-right">
                   <CloseIcon/>
                  </span>
                </button>
                <div className="card-title row">
                  <h5 className="col">{session.name}</h5>
                  <span className="col-6">
                    <span className={this.findBadgeType()} style={{fontSize:"15px"}}>
                      {session.session_time+' '+session.day_of_week}
                    </span>
                  </span>
                </div>
                <p>{session.desc} </p>
                <hr className="rounded" />
                <div className="bottom-card" style={{ display: "flex" ,justifyContent:"space-between"}}>
                  <button className="btn btn-primary centered" onClick={()=>{}}>Start Session</button>
                  <RemoveRedEyeIcon
                    className="session-edit-button centered"
                    style={{ width: "10%", height: "10%", float: "right" }}
                    onClick={()=>sessionEditClicked({session})}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
}
 
export default SessionCard;