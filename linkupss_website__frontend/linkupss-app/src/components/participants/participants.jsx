import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import React, { Component, useState, useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const Participants = () => {
  return (
    <div>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="text-primary">
              {"Registration was successful"}{" "}
              <CheckCircleOutlineIcon fontSize="large" />
            </h1>
            <p className="text-secondary col-md-8 fs-4">
              {
                "You are now officially a part of your organization through Linkupss !"
              }
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              {"Get Started"}
            </button>
          </div>
        </div>
        <div className="p-5 mb-4 bg-light rounded-3 container ">
          <span>
            <h1 className="text-secondary text-center">
              Download Linkpad packages
            </h1>
            <span className="py-8 text-center">
              <h4 className="text-secondary">
                To get started with using your Linkpad, install the packages
                below.If you don't know what a Linkpad is, click here!{" "}
              </h4>
            </span>
            <span className = "d-flex justify-content-center px-6">
            <span className="d-flex px-5 justify-content-center align-items-center flex-column">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip">{"Download All"}</Tooltip>}
              >
                <DownloadIcon className="download_button" fontSize="large" />
              </OverlayTrigger>
            </span>
            <ul className="list-group files-list-width">
              <li className="list-group-item" ><InsertDriveFileIcon/><p>Playwright Script</p></li>
              <li className="list-group-item"><InsertDriveFileIcon/><p>Arduino Script</p></li>
              <li className="list-group-item"><InsertDriveFileIcon/><p>checkForTriggerScript</p></li>
              <li className="list-group-item"><InsertDriveFileIcon/><p>buttonTest Script</p></li>
              <li className="list-group-item"><InsertDriveFileIcon/><p>Zoompad script</p></li>
            </ul>

            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Participants;
