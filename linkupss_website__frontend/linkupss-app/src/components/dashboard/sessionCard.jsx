import React, { Component } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";
class SessionCard extends Component {
  findBadgeType() {
    let badge_class_name = "flex badge bg-";
    const time_type = this.props.session.session_time;
    //console.log(time_type);
    //console.log(time_type.charAt(0));
    if (time_type.charAt(0) === "0") {
      badge_class_name += "warning";
      // console.log(badge_class_name)
    } else {
      badge_class_name += "primary";
    }
    return badge_class_name;
  }
  async doStartSession ({session}) {
//call backend and trigger playwright script on client computer
const authtoken = "Bearer " + localStorage.getItem("userToken");
var config = { headers: { Authorization: authtoken } };
    this.props.launchSession();
    console.log(session._id);

    try{

      const response = await axios.post("https://api.linkupss.com/triggermeeting",
      {
        session_id:session._id
      }
      ,config
      );
      const result = await response;
      console.log(result);
    }
    catch(err){
      if(err.code === "ERR_BAD_RESPONSE"){
        window.alert("It seems like you already started a sessioon.")
      }
    }
  }
  render() {
    const { session, sessionEditClicked, numOfSessions ,confirmDeleteSession,launchSession} = this.props;

    return (
      <div className="col-sm-4 pb-2">
        <div className="card card-outline-info card-spacing">
          <div className="card-block">
            <button
              type="button"
              className="close btn-close float-end"
              aria-label="Close"
              onClick = {()=>confirmDeleteSession({session})}
            />
              
            <div className="card-title row">
              <h5 className="col">{session.name}</h5>
              <span className="col-6">
                <span
                  className={this.findBadgeType()}
                  style={{ fontSize: "15px" }}
                >
                  {session.session_time + " " + session.day_of_week}
                </span>
              </span>
            </div>
            <div className="card-desc">{session.desc} </div>
            <hr className="rounded" />
            <div
              className="bottom-card"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button className="btn btn-primary centered" onClick={() => this.doStartSession({session})}>
                Start Session
              </button>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip">{`Edit ${session.name} session`}</Tooltip>}
              >
                <EditIcon
                  className="session-edit-button centered"
                  style={{ width: "10%", height: "10%", float: "right" }}
                  onClick={() => sessionEditClicked({ session })}
                />
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionCard;
