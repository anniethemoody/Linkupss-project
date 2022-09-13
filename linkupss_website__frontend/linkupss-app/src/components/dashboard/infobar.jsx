import React, { Component, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
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
            className="badge bg-primary"
            style={{ display: "flex", alignItems: "center" }}
          >
            {props.orgInfo.org_name}
          </span>{" "}
          {/*30 Characters*/}
          <Form.Control
            placeholder="Search for a session in your organisation"
            aria-label="Search for a session in your org"
            aria-describedby="basic-addon1"
            value={sessionSearchQuery}
            onChange={handleSearchSession}
          />
        </InputGroup>
      </span>
      <span className="col-4" />


      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Filter"}</Tooltip>}
        >
          <FilterAltIcon  
            onClick={() => props.openOffcanvas("Filter")}
          />
        </OverlayTrigger>
      </span> 
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Account"}</Tooltip>}
        >
          <SettingsIcon onClick={() => props.openOffcanvas("Account")} />
        </OverlayTrigger>
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Need help?"}</Tooltip>}
        >
          <HelpIcon onClick={() => props.openOffcanvas("Need help")} />
        </OverlayTrigger>
      </span>
    </div>
  );
};

export default InfoBar;
