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

import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AppleIcon from "@mui/icons-material/Apple";
import MicIcon from "@mui/icons-material/Mic";
import Carousel from "react-bootstrap/Carousel";
import WindowIcon from "@mui/icons-material/Window";
import Figure from "react-bootstrap/Figure";
import linkpad_prototype from "../../media/linkpad-prototype.jpeg";
import linkpad_diagram from "../../media/linkpad-diagram.jpeg";
import elderly_zoom from "../../media/elderly-zoom.png";
import elderly_tech from "../../media/elderly-tech.png";
import flutter_logo from "../../media/flutter_logo_2.webp";
import windows_logo from "../../media/windows-logo.svg";
import arduinopython from "../../media/arduinopython.webp";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Button } from "bootstrap";
const Products = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const title = "Products";
  const desc =
    "See latest Linkupss products that change how your community connects";
  const btnText = "Learn more";
  return (
    <div className="container py-4 product-content">
      <Jumbotron desc={desc} title={title} btnText={btnText} />
      {/*Put zoompad spline model in here */}
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block rounded rounded-3 w-100"
              src={linkpad_prototype}
              alt="First slide"
              style={{ width: "8rem", height: "55rem" }}
            />
            <Carousel.Caption>
              <h3>Prototype</h3>
              <p>The first version of the fully assembled prototype</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block rounded rounded-3 w-100"
              style={{ width: "8rem", height: "55rem" }}
              src={linkpad_diagram}
              alt="First slide"
            />

            <Carousel.Caption>
              <h3 className="text-secondary">Diagram</h3>
              <p className="text-secondary">
                The conceptual design of the v1 prototype
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div data-aos="fade-up" className="p-5 mb-4 bg-light rounded-3 container">
        <span>
          <h1 className="text-secondary" style={{ textAlign: "center" }}>
            Linkpad Functionality
          </h1>
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
              className="bg-warning"
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
      <div className="p-5 mb-4 bg-light rounded-3 container">
        <span>
          <h1 className="text-secondary" style={{ textAlign: "center" }}>
            How does it work?
          </h1>
        </span>

        <div className="container">
          <div className="row how-does-it-work-row">
            <div className="col d-flex align-items-center">
              <div>
                <h1 className="text-primary">
                  Join your organization in virtual meetings
                </h1>
                <p style={{ fontSize: "20px" }}>
                  As online meetings have become more prevalent across the past few years under COVID-19, Linkupss believes there are groups,from seniors to young children, that struggle with such an experience due to confusing user interfaces that are not intuitive. Hence the linkpad is the bridge betwwen you and your meeting. 
                    </p>
              </div>
            </div>
            <div className="col-6">
              <div>
                <img
                  className="how-does-it-work-img1 d-block w-100"
                  src={elderly_zoom}
                  alt="First slide"
                />
              </div>
            </div>
          </div>
          <div className="row how-does-it-work-row">
            <div className="col-7">
              <div>
                <img
                  className="how-does-it-work-img2 d-block w-100 "
                  src={elderly_tech}
                  alt="First slide"
                />
              </div>
            </div>
            <div className="col d-flex align-items-center">
              <div>
                <h1 className="text-primary" style={{ textAlign: "right" }}>
                  Linkpad will do everything for you
                </h1>
                <p style={{ fontSize: "20px", textAlign: "right" }}>
                The Linkpad is a way of simplifying everything a participant sees when they want to join their online meetings. With literally a push of a button on the pad, ir direcrly brings you into the meeting without any extra effort in understadning interfaces, learning the software.

                </p>
                {/* <span
                  className="learn-more-section d-flex align-items-center justify-content-around"
                  style={{ float: "right" }}
                >
                  <span>
                    <h4 className="learn-more-text text-warning">Learn more</h4>
                  </span>

                  <ArrowRightAltIcon className="learn-more-icon" />
                </span> */}
              </div>
            </div>
          </div>
          <div className="row how-does-it-work-row">
            <div className="col">
              <div>
                <h1 className="text-primary">
                  Start using Linkpad with the Linkpad packages
                </h1>
                <p style={{ fontSize: "20px" }}>
In order to operate the Linkpad, users will need to install the packages from the Linkupss website for the Linkpad to have the proper software requirements. The package includes scripts which drive the Linkpad as well as browser automation software.
                </p>
                <span className="learn-more-section d-flex align-items-center">
                  <button className="btn btn-lg btn-primary download-app-btn d-flex align-items-center">
                    <span className="windows-text">Download on Windows</span>
                    <img className="windows-icon" src={windows_logo}></img>
                  </button>
                  <button className="btn btn-lg btn-primary download-app-btn d-flex align-items-center">
                    <span className="mac-text">Download on macOS</span>
                    <AppleIcon fontSize="large" />
                  </button>
{/* 
                  <span className="d-flex justify-content-between align-items-center">
                    <h4 className="learn-more-text text-warning">Learn more</h4>
                    <ArrowRightAltIcon className="learn-more-icon" />
                  </span> */}
                </span>
              </div>
            </div>
            <div className="col-4">
              <div>
                <img
                  className="how-does-it-work-img3 d-block w-100 "
                  src={arduinopython}
                  alt="First slide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-light rounded-3 container ">
        <div className="linkpadcol row my-3">
          <div className="col linkpadcol-child">
            <div
              data-aos="fade-right"
              className="linkpad bg-light d-flex flex-column justify-content-around align-items-center"
              style={{ width: "500px", height: "900px" }}
            >
              <div
                className="linkpad-product-icons-expand linkpad-product-phone-icon row rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <CallEndIcon
                  className="linkpad-product-phone-icon-color"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <div
                className="linkpad-product-icons-expand linkpad-product-camera-icon row rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <VideocamIcon
                  className="linkpad-product-camera-icon-color"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center flex-column justify-content-center">
            <Card
              className="mb-3 bg-success border border-success text-center"
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
            <Card
              className="mb-3 bg-primary border border-success text-center"
              style={{ width: "100%", fontSize: "35px" }}
            >
              <Card.Body>
                <Card.Title
                  style={{ color: "white", fontWeight: "", fontSize: "25px" }}
                >
                  Visually contrasting and noticeable
                </Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very straight forward controls, very intuitive
                  to operate, it does not require extra knowledge to use and
                  users can simply click on the 4 buttons to control meetings
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="linkpadcol-second row my-3">
          <div className="col d-flex align-items-center flex-column justify-content-center">
            <Card className="mb-3 bg-warning text-center " style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title
                  style={{ color: "white", fontWeight: "", fontSize: "25px" }}
                >
                  No memorization or previous knowledge required
                </Card.Title>
                <Card.Text style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very straight forward controls, very intuitive
                  to operate, it does not require extra knowledge to use and
                  users can simply click on the 4 buttons to control meetings
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3 bg-danger align-middle" style={{ width: "100%" }}>
              <Card.Body className="">
                <Card.Title
                className="text-center align-center"
                  style={{ color: "white", fontWeight: "", fontSize: "25px" }}
                >
                  Easy implementation at your organization
                </Card.Title>
                <Card.Text className = "text-center" style={{ color: "white", fontSize: "22px" }}>
                  The Linkpad has very simple implementation steps, simply
                  connect the pad to your computer and start accessing your
                  sessions right away
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col linkpadcol-child-second">
            <div
              data-aos="fade-left"
              className="linkpad-second bg-light d-flex flex-column justify-content-around align-items-center"
              style={{ width: "500px", height: "900px" }}
            >
              <div
                className="linkpad-product-icons-expand linkpad-product-answer-icon row rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <LocalPhone
                  className="linkpad-product-answer-icon-color"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <div
                className="linkpad-product-icons-expand linkpad-product-mic-icon row rounded-3"
                style={{ width: "300px", height: "300px" }}
              >
                <MicIcon
                  className="linkpad-product-mic-icon-color"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
