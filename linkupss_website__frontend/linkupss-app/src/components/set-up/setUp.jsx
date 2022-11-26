import React, { Component } from "react";
import Jumbotron from "../jumbotron";
import Accordion from "react-bootstrap/Accordion";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";

const SetUp = () => {
  const title = "Set Up";
  const desc =
    "First time using our products? Dont worry ! See set up instructions to start getting connected with your community ";
  const btnText = "Get started";
  return (
    <div className="container py-4">
      <Jumbotron desc={desc} title={title} btnText={btnText} />
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
                
            <SupervisorAccountIcon fontSize="large" className="mr-4"/>
  
                <span className="text-center display-6">Are you an admin ?</span></Accordion.Header>
            <Accordion.Body>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Step 1: Create an account by going to our register page</Accordion.Header>
                  <Accordion.Body>
<span>To start being able to manage your online sessions held in your organisation, you can start by creating an account on </span>
<Link to="/adminloginregister">our register and login page</Link>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Step 2: Start creating sessions on your dashboard</Accordion.Header>
                  <Accordion.Body>
Once you are logged in or registered, you may acces your dashboard, which displays all the sessions that are happening within your organisation. You may create or delete your sessions.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Step 3: Add participants to your sessions</Accordion.Header>
                  <Accordion.Body>
Once you createed a session you may edit which participant is in your session. A participant will be listed if they are registered as a member on the Linkupss website
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>Step 4: Go ahead and start your meetings !</Accordion.Header>
                  <Accordion.Body>
Once all the necessary participants are added, admins can feel free to start the meeting at any time they want, participants will receive the link to the meeting on through their Linkupss package
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>




            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
                <AccountBoxIcon fontSize="large"/>
                <span className="text-center display-6">Are you a participant ?</span></Accordion.Header>
            <Accordion.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Step 1: Create an account by going to our register page</Accordion.Header>
                  <Accordion.Body>
                  <span>To start being able to join your online sessions held by your organisation, you can start by creating an account on </span>
<Link to="/adminloginregister">our register and login page</Link>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Step 2: Acquire a Linkpad</Accordion.Header>
                  <Accordion.Body>
                  Participants are expected to have access to a linkpad in order to have the full Linkupss meeting automation experience , contact your oraganization about acquiring one.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Step 3: Install the Linkpad Packages</Accordion.Header>
                  <Accordion.Body>
                  Once registration is complete, you should be able to install the necessary packages needed for your Linkpad.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Step 4: Connect Linkpad to your computer</Accordion.Header>
                  <Accordion.Body>
                  As linkpad is an external device, it requires a wired connection to your computer. Using a USB Type-C cable , connect the linkpad to your computer
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>Step 4: You're done ! Just wait for your meeting to start !</Accordion.Header>
                  <Accordion.Body>
                  Once the Linkpad is connected, run the Linkpad packages and the packages will look for any available meetings and allows you to join the meeting through the Linkpad.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default SetUp;
