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

const InfoBar = (props) => {

  const [sessionSearchQuery, setSessionSearchQuery] = useState("");
  const [filterState, setFilterState] = useState(false);
  const handleSearchSession = (e) => {
    const query = e.target.value;
    setSessionSearchQuery(query);
    props.handleSearchSession(query);
  };
  const handleTooltipFilter = (props, ref) => {};
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
        
      <Dropdown disabled={true} className = "filter-dropdown" >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <FilterAltIcon  />
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item onClick ={()=>props.filterSessionByButton("name")}>Filter by session name</Dropdown.Item>
        <Dropdown.Item onClick ={()=>props.filterSessionByButton("time")}>Filter by time</Dropdown.Item>
        <Dropdown.Item onClick ={()=>props.filterSessionByButton("none")}>Remove all filtering</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          
        
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Organization"}</Tooltip>}
        >
          <CorporateFareIcon
            onClick={() => props.openOffcanvas("Organization")}
          />
        </OverlayTrigger>
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Account"}</Tooltip>}
        >
          <AccountCircleIcon onClick={() => props.openOffcanvas("Account")} />
        </OverlayTrigger>
      </span>
      <span className="col">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{"Settings"}</Tooltip>}
        >
          <SettingsIcon onClick={() => props.openOffcanvas("Settings")} />
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
