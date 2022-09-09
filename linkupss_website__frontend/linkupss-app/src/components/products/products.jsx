import React, { Component } from "react";
import Jumbotron from "../jumbotron";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LocalPhone from "@mui/icons-material/LocalPhone";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
const Products = () => {
  const title = "Products";
  const desc =
    "See latest Linkupss products that change how your community connects";
  const btnText = "Learn more";
  return (
    <div className="container py-4 product-content">
      <Jumbotron desc={desc} title={title} btnText={btnText} />
      {/*Put zoompad spline model in here */}
      <div className="mb-4 bg-light rounded-3 container ">
        <div className="row my-3 linkpad-col">
          <div className="col">
            <div
              className="linkpad border border-5 border-secondary bg-light container flex-column justify-content-around align-items-center"
              style={{ width: "500px", height: "900px" }}
            >
              <button
                className="row border border-5 border-danger bg-danger rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <LocalPhone
                  style={{ width: "300px", height: "300px", color: "white" }}
                />
              </button>
              <div
                className="row border border-2 border-primary bg-primary rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <VideocamIcon
                  style={{ width: "300px", height: "300px", color: "white" }}
                />
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center flex-column justify-content-start">
            <Card
              className="mb-3 bg-success border border-success"
              style={{ width: "100%" }}
            >
              <Card.Body>
                <Card.Title
                  style={{ color: "white", fontWeight: "", fontSize: "25px" }}
                >
                  Easy to use and Intuitive
                </Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very straight forward controls, very intuitive
                  to operate, it does not require extra knowledge to use and
                  users can simply click on the 4 buttons to control meetings
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3 bg-primary border border-success" style={{ width: "100%",fontSize:"35px" }}>
              <Card.Body>
                <Card.Title
                style={{ color: "white", fontWeight: "", fontSize: "25px" }}
                >Visually contrasting and noticeable</Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very straight forward controls, very intuitive
                  to operate, it does not require extra knowledge to use and
                  users can simply click on the 4 buttons to control meetings
                </Card.Text>
              </Card.Body>

            </Card>
            <Card className="mb-3 bg-warning" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title
                style={{ color: "white", fontWeight: "", fontSize: "25px" }}>
                  No memorization or previous knowledge required
                </Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very straight forward controls, very intuitive
                  to operate, it does not require extra knowledge to use and
                  users can simply click on the 4 buttons to control meetings
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3 bg-danger" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title
                 style={{ color: "white", fontWeight: "", fontSize: "25px" }}>
                  Easy implementation at your organization
                </Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very simple implementation steps, simply connect the pad to your computer and start accessing your sessions right away
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3 container">
        <span>
          <h1 style={{ textAlign: "center" }}>Linkpad Functionality</h1>
        </span>
        <div className="row">
          <div className="col p-2">
            <Card
              className="bg-success"
              style={{ width: "18rem", height: "6rem" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <LocalPhone style={{ color: "white" }} />
                <Card.Title className="text-white">
                  Answer or start video calls
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col p-2">
            <Card
              className="bg-danger"
              style={{ width: "18rem", height: "6rem" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <CallEndIcon style={{ color: "white" }} />
                <Card.Title className="text-white">End video calls</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col p-2">
            <Card
              className="bg-primary"
              style={{ width: "18rem", height: "6rem" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <VideocamIcon style={{ color: "white" }} />
                <Card.Title
                  className="d-flex justify-content-center text-white"
                  style={{ textAlign: "center" }}
                >
                  Turning your camera on or off in video calls
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col p-2">
            <Card
              className="bg-secondary"
              style={{ width: "18rem", height: "6rem" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <MicIcon style={{ color: "white" }} />
                <Card.Title
                  className="text-white align-self"
                  style={{ textAlign: "center" }}
                >
                  Turning your mic on or off in video calls
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
