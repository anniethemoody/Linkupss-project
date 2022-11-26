import React, { Component } from "react";
import Jumbotron from "../jumbotron";
import Accordion from "react-bootstrap/Accordion";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Delectus iusto laboriosam voluptates provident unde. Vitae
                    cupiditate officiis officia beatae quas.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Step 2: Start creating sessions on your dashboard</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Step 3: Add participants to your sessions</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>Step 4: Go ahead and start your meetings !</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Delectus iusto laboriosam voluptates provident unde. Vitae
                    cupiditate officiis officia beatae quas.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Step 2: Acquire a Linkpad</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Step 3: Install the Linkpad Packages</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Step 4: Connect Linkpad to your computer</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>Step 4: You're done ! Just wait for your meeting to start !</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, facilis mollitia doloremque sed iusto dignissimos
                    perferendis consectetur cupiditate earum incidunt.
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
