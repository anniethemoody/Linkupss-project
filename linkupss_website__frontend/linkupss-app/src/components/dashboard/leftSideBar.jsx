import React, { Component, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { getOrgInfo } from "../../services/orgCollectionService";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import Offcanvas from "react-bootstrap/Offcanvas";

const LeftSideBar = (props) => {
  const [offcanvasBody, setOffcanvasBody] = useState({});
  const [offcanvasTitle, setOffcanvasTitle] = useState("");
  const [accountNameState, setAccountNameState] = useState(true);
  const [accountName, setAccountName] = useState(props.userinfo.admin_name);
  const handleAccountName = (e) => {
    //console.log(e);
    const name = e.target.value;
    console.log(name);
    setAccountName(name);
    //console.log(accountName);
  };

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
    } else if (props.content === "Organization") {
      setOffcanvasTitle("My Organization");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Organization Details</p>
        </Offcanvas.Body>
      );
    } else if (props.content === "Need help") {
      setOffcanvasTitle("Need Help ?");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>The Linkupss team is happy to serve your needs ! See the below choices on what you need help with.</p>
          <hr className="rounded" />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>See Frequently Asked Questions</Accordion.Header>
              <Accordion.Body>
                seeing FAQ...
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Report a problem</Accordion.Header>
              <Accordion.Body>
                reporting a problem...
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>Contact our team</Accordion.Header>
              <Accordion.Body>
                contacting our team...
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      );
    } else if (props.content === "Settings") {
      setOffcanvasTitle("Settings");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Settings</p>
        </Offcanvas.Body>
      );
    }
  }, [props.content, accountNameState]);

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
