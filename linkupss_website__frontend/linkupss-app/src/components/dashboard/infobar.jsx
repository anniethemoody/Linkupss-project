import React, { Component, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from '@mui/icons-material/Logout';
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Help from "@mui/icons-material/Help";
import Popover from "react-bootstrap/Popover";
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from "react";

const InfoBar = (props) => {

  const [sessionSearchQuery, setSessionSearchQuery] = useState("");
  const [filterButtonState, setfilterButtonState] = useState(false);
  const [logOutPopUpState,setLogOutPopUpState] = useState(false);
  const handleSearchSession = (e) => {
    const query = e.target.value;
    setSessionSearchQuery(query);
    props.handleSearchSession(query);
  };
  useEffect(()=>{
    if(props.disableFilter){
        setfilterButtonState(true);
    }
    else{
        setfilterButtonState(false);
    }
    
  },[props.disableFilter])
  
  return (
    <div
      className="info-bar row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <span className="col-5">
        <InputGroup>
          <span
            className="badge info-bar-badge"
            style={{ display: "flex", alignItems: "center" }}
          >
            {localStorage.getItem("orgName")}
          </span>{" "}
          {/*30 Characters*/}
          <Form.Control
          type="search-bar"
          className="search-bar-style"
            placeholder="Search for a session in your organisation"
            aria-label="Search for a session in your org"
            aria-describedby="basic-addon1"
            value={sessionSearchQuery}
            onChange={handleSearchSession}
          />
        </InputGroup>
      </span>
      <span className="col-3" />


      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Filter"}</Tooltip>}
        >
        <div className="d-flex flex-column align-items-center">
          <FilterAltIcon  
            onClick={() => props.openOffcanvas("Filter")}
          />
          <span>
            Filter
          </span>


        </div>

        </OverlayTrigger>
      </span> 
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Account"}</Tooltip>}
        >
                     <div className="d-flex flex-column align-items-center">
          <SettingsIcon onClick={() => props.openOffcanvas("Account")} />
          <span>
            Account
          </span>

                     </div>

        </OverlayTrigger>
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Need help?"}</Tooltip>}
        >
           <div className="d-flex flex-column align-items-center">


          <HelpIcon onClick={() => props.openOffcanvas("Need help")} />
          <span>
            Help
          </span>
           </div>
        </OverlayTrigger>
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Log out?"}</Tooltip>}
        >
          <div className="d-flex flex-column align-items-center">

          <LogoutIcon onClick={() => props.logout()} />
          <span>
            Log Out
          </span>
          </div>
        </OverlayTrigger>
      </span>
    </div>
  );
};

export default InfoBar;
