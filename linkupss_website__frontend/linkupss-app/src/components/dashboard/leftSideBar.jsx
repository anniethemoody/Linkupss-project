import React, { Component, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { getOrgInfo } from "../../services/orgCollectionService";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { NavLink, Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { set } from "lodash";

const LeftSideBar = (props) => {
  const [offcanvasBody, setOffcanvasBody] = useState({});
  const [offcanvasTitle, setOffcanvasTitle] = useState("");
  const [accountNameState, setAccountNameState] = useState(true);
  const [accountName, setAccountName] = useState(props.userinfo.admin_name);
  const [reportProbTitle, setReportProbTitle] = useState("");
  const [reportProbDesc, setReportProbDesc] = useState("");
  const [reportSubmissionState, setReportSubmissionState] = useState(false);
  const [reportSubmissionBtnText, setReportSubmissionBtnText] =
    useState("Submit")

  const [filterByNameStatus,setFilterByNameStatus] = useState(false);
  const [filterByTimeStatus,setFilterByTimeStatus]=useState(false);
  const [filterByCreationStatus,setFilterByCreationStatus] = useState(false);
  const handleReportProbTitle = (e) => {
    const title = e.target.value;
    setReportProbTitle(title);
    console.log(reportProbTitle);
  };

  const handleReportProbDesc = (e) => {
    const desc = e.target.value;
    setReportProbDesc(desc);
  };
  const handleAccountName = (e) => {
    //console.log(e);
    const name = e.target.value;
    //console.log(name);
    setAccountName(name);
    //console.log(accountName);
  };
  const handleSubmitProblem = () => {
    setReportSubmissionState(true);
    setReportSubmissionBtnText("Submitted");
  };
  const handleReortAnotherProblem = () => {
    setReportSubmissionState(false);
    setReportProbDesc("");
    setReportProbTitle("");
    setReportSubmissionBtnText("Submit");
  };
  const handleFilteringLogic = (type) =>{
    if(type==="name"){
      setFilterByNameStatus(true);
      setFilterByTimeStatus(false);
      setFilterByCreationStatus(false);
      props.filterSessionByButton("name")
      props.hide();
    }
    if(type==="time"){
      setFilterByNameStatus(false);
      setFilterByTimeStatus(true);
      setFilterByCreationStatus(false);
      props.filterSessionByButton("time")
      props.hide();
    }
    if(type==="none"){
      setFilterByNameStatus(false);
      setFilterByTimeStatus(false);
      setFilterByCreationStatus(true);
      props.filterSessionByButton("none")
      props.hide();
    }
  }

  useEffect(() => {
    if (props.content === "Account") {
      setOffcanvasTitle("My Account");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Account Details</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="Admin name"
              aria-label="Admin name"
              aria-describedby="basic-addon1"
              defaultValue={props.userinfo.admin_name}
              disabled={accountNameState}
              onChange={handleAccountName}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setAccountNameState(!accountNameState)}
            >
              {accountNameState ? "Edit" : "Save"}
            </Button>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Role</InputGroup.Text>
            <Form.Control
              placeholder="Role"
              aria-label="Role"
              aria-describedby="basic-addon1"
              defaultValue={props.userinfo.role}
              disabled={true}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Organization name
            </InputGroup.Text>
            <Form.Control
              placeholder="Organization name"
              aria-label="Organization name"
              aria-describedby="basic-addon1"
              defaultValue={getOrgInfo(props.userinfo.org_id).org_name}
              disabled={true}
            />
          </InputGroup>

          <Card>
            <Card.Header>
              {props.sessions.length === 0 ? (
                <span style={{ paddingRight: "20px" }}>
                  There are no users enrolled in this organisation. Ask your
                  members to register before picking participants !
                </span>
              ) : (
                <span style={{ paddingRight: "20px" }}>Your sessions</span>
              )}
            </Card.Header>
            <ListGroup
              variant="flush"
              className={
                props.sessions.length >= 3
                  ? "form-listgroup-card"
                  : "form-listgroup-card-sidebar"
              }
            >
              {props.sessions.map((m) => (
                <ListGroup.Item
                  className="form-listgroup-sidebar-item"
                  key={m.name}
                >
                  <span>{m.name}</span>
                  <Badge
                    bg="primary"
                    pill
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {m.participants.length} participant
                    {m.participants.length > 1 || m.participants.length === 0
                      ? "s"
                      : ""}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Offcanvas.Body>
      );
    } else if (props.content === "Filter") {
      setOffcanvasTitle("Filter");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Filter your sessions</p>
          <hr className="rounded" />
          <ListGroup as="ul" defaultActiveKey="#link1">
          <ListGroup.Item as = "li" action  active ={filterByNameStatus} onClick={()=>handleFilteringLogic("name")}>
              Filtered by name
            </ListGroup.Item>
            <ListGroup.Item as = "li" action active={filterByTimeStatus} onClick={()=>handleFilteringLogic("time")}>
              Filtered by time
            </ListGroup.Item >
            <ListGroup.Item action as = "li" active ={filterByCreationStatus} onClick={()=>handleFilteringLogic("none")}>
              Filtered by time of creation
            </ListGroup.Item>
          </ListGroup>
 
          
          
        </Offcanvas.Body>
      );
    } else if (props.content === "Need help") {
      setOffcanvasTitle("Need Help ?");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>
            The Linkupss team is happy to serve your needs ! See the below
            choices on what you need help with.
          </p>
          <hr className="rounded" />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                See Frequently Asked Questions
              </Accordion.Header>
              <Accordion.Body>
                <NavLink
                  className="nav-item nav-link btn btn-warning see-faq-btn"
                  to="/faq"
                >
                  See F.A.Q
                </NavLink>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Report a problem</Accordion.Header>
              <Accordion.Body>
                <Form.Label>What's the problem ?</Form.Label>
                <Form.Control
                  placeholder="Title"
                  onChange={handleReportProbTitle}
                  value={reportProbTitle}
                />
                <Form.Text className="text-muted">
                  Tell us what's wrong
                </Form.Text>
                <hr className="rounded" />
                <Form.Label>Tell us more details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Description"
                  onChange={handleReportProbDesc}
                  value={reportProbDesc}
                />
                <div className="row">
                  <Button
                    disabled={reportSubmissionState}
                    variant={reportSubmissionState ? "success" : "primary"}
                    type="submit"
                    className="mt-3 "
                    onClick={() => handleSubmitProblem()}
                  >
                    {reportSubmissionBtnText}
                  </Button>
                  {reportSubmissionState && (
                    <Button
                      variant="secondary"
                      type="submit"
                      className="mt-3"
                      onClick={() => handleReortAnotherProblem()}
                    >
                      Report another problem
                    </Button>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Contact our team</Accordion.Header>
              <Accordion.Body>
                <div
                  className="pb-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Linkupss email</span>
                  <Badge>linkupss@gmail.com</Badge>
                </div>
                <div
                  className="pb-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Linkupss phone number</span>
                  <Badge>+1 289 829 3388</Badge>
                </div>
                <div className="container">
                  <span className="row pb-2">Linkupss socials</span>
                  <span className="row pb-2">
                    <span className="col">Instagram</span>
                    <Badge bg="info" className="col">
                      @linkupss
                    </Badge>
                  </span>
                  <span className="row pb-2">
                    <span className="col">Facebook</span>
                    <Badge bg="success" className="col">
                      @linkupss
                    </Badge>
                  </span>
                  <span className="row pb-2">
                    <span className="col">Linkedin</span>
                    <Badge bg="danger" className="col">
                      @linkupss
                    </Badge>
                  </span>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      );
    } 
  }, [
    props.content,
    accountNameState,
    reportSubmissionBtnText,
    reportSubmissionState,
    reportProbTitle,
    reportProbDesc,
    filterByNameStatus,
    filterByTimeStatus
  ]);

  return (
    <Offcanvas show={props.show} onHide={props.hide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{offcanvasTitle}</Offcanvas.Title>
      </Offcanvas.Header>
      {offcanvasBody}
    </Offcanvas>
  );
};

export default LeftSideBar;
