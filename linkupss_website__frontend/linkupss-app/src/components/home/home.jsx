import React, { Component, useState, useContext,useEffect } from "react";
import AnimatedText from "react-animated-text-content";
import confusion from "../../media/confusion.png";
import arrow from "../../media/arrow2.png";
import understand from "../../media/happy.png";
import hug from "../../media/hug.png";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SecurityIcon from "@mui/icons-material/Security";
import PublicIcon from "@mui/icons-material/Public";
import Jumbotron from "../jumbotron";
import handreact from "../../media/handout.png";
import websiteflow from "../../media/websiteflow.png";
import linkpadflow from "../../media/linkpadflow.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
const Home = () => {
  const title = "Linkupss";
  const [circle1Clicked, setcircle1Clicked] = useState(false);
  const desc =
    "To serve and simplify your community engagements with modern technology";
  const btnText = "Learn more";
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="text-primary display-1">
            <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: "200px",
                y: "-20px",
                scale: 1.1,
                ease: "ease-in-out",
              }}
              animationType="float"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              Here To Serve Your Community Engagements With Technology
            </AnimatedText>
          </h1>
          <h4 className="display-6" >

          <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: "200px",
                y: "-20px",
                scale: 1.1,
                ease: "ease-in-out",
              }}
              animationType="float"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
                        Linkupss is here to bring innovations that are simple,easy-to-use
            for the public. What started as an engineering project, has expanded
            to something a lot more meaningful ....
            </AnimatedText>



          </h4>
        </div>
      </div>
      <div className="container overflow-hidden">
        <div className="col p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5 text-center">
            <span className="text-primary text-center display-1">LinkupS</span>
            <span className="text-secondary text-center display-1">implify</span>
            <span className="text-primary text-center display-1">S</span>
            <span className="text-secondary text-center display-1">ervice</span>



            <div className="row mt-5">
              <img
              data-aos="fade-right"
                src={handreact}
                className="col card-img-homepage"
                alt="..."
              />
              <div className="col">
                <div className="card border-primary home-page-card">
                  <div className="home-page-card-body">
                    {/* <h1 fontSize="25px">What We Value</h1> */}
                    {/* {circle1Clicked && (
                      <span className="card-text-homepage">
                        Technology can be confusing sometimes for new users or
                        people less exposed to technology, which is why Linkupss
                        aims to break that norm and by starting from elderly
                        commmunities
                      </span>
                    )} */}
                    <div className="card border-primary home-circle-1">
                      <span className="display-6 text-secondary">Digital Inclusion</span>
                  </div>
                  <div className="card border-primary home-circle-2">
                      <span className="display-6 text-secondary">Easy and intuituve technology</span>
                  </div>
                  <div className="card border-primary home-circle-3">
                      <span className="display-6 text-secondary">Automation-driven</span>
                  </div>

                  </div>
                </div>

 
              </div>
            </div>
            <hr className="rounded" />

            <div className="card text-center mt-5">
              <div className="card-body row">
                <span className="col">

                <h1 className="display-5">We make it simple</h1>
                </span>
                <span className="col lead"> 
                Technology can be confusing sometimes for new users or
                        people less exposed to technology, which is why Linkupss
                        aims to break that norm and by starting from elderly
                        commmunities
                </span>
              </div>
            </div>

            <div className="card text-center mt-5">
              <div className="card-body row">
                <span className="col">

                <h1 className="display-5">We want to include you</h1>
                </span>
                <span className="col lead"> 
                  Digital inclusion is so important to us, as we believe that
                  nobody deserves to be left out from the benefits of technology
                  and whether you are a senior or a child, we should have equal
                  access to safe technology
                </span>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-body row">
                <span className="col">
                    <h1 className="display-5">We want to hear your voice</h1>
                </span>
                <span className="col lead">
                    The Linkupss team believes everyone's voice is equally valuable when it comes to technology usage, here we promote equal representation in the world of technology. 
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-2">What are we doing right now?</h1>
          {/* <button className="btn btn-primary btn-lg" type="button">
            {"Learn more"}
          </button> */}
          <span className="display-6">
            The Linkupss team has developed this website as a way for hosts of
            online meetings to manage their sessions cleaner and easier. This
            online platform acts as an extension to the Linkpad.
          </span>
          <div className="card home-page-card-diagram  text-center mt-4">
            <div className="card-body">
              <img src={websiteflow} className="" alt="..." />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
              <button type = "button" className="homepage-btn-text btn">
                <span className="admin-intro-text">Designed for the admins of your organization, the Linkupss website serves as an online platform for you to manage your online meetings.</span>
                <Link to="/adminloginregister" className="admin-intro-text">To start using your meeting management tool, click here</Link>
              </button>
          </div>

          <hr className="rounded" />

          <div className=" home-page-card-2 bg-white text-center">
            <div className="card-body">
              <img src={linkpadflow} className="" alt="..." />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <button type = "button" className="homepage-btn-text btn">
              <p className="participant-intro-text">Designed for the participants, the Linkpad is an external device that is connected to the client computer and serves as a simplied interface for online meeting softwares, such as Zoom, Google Meets, etc.</p>
              </button>
              <Link to="/products">
              <button type="button" className="btn btn-lg btn-outline-primary learnmorelinkpad-btn">
                Learn more about Linkpad
              </button>
              </Link>
          </div>


  
        </div>
      </div> 

      <div className="col p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col text-center">
              <SupportAgentIcon className="text-primary home-page-icons" fontSize="large" />
              <h1 className="text-primary">Tech Support</h1>
              <div className="lead text-primary">
            Linkupss is eager to provide a wide range of resources to help users with any problems or concerns they have with our products.
            To see F.A.Q, click here. For more resources, you can contact the Linkupss team direcrly through your organization.
              </div>
            </div>
            <div className="col text-center">
              <PublicIcon className="text-primary home-page-icons" fontSize="large" />
              <h1 className="text-primary" >Eco-friendly</h1>
              <div className="lead text-primary">
              Linkupss truly believes in creating a greener and more sustainble environment, which is why we aim to use recyclable, biodegradable and biosourced materials in our 3D modelling processes as well as minimizing waste or unneeded resources.
              </div>
            </div>
            <div className="col text-center">
              <SecurityIcon className="text-primary home-page-icons" fontSize="large" />
              <h1 className="text-primary">High Security</h1>
              <div className="lead text-primary">
            Linkupss keeps your information secure with base 64 encoding in our database, and disallowing sensitive information to be kept on our website. Linkupss values information security as one of their top priorities and will do everything in their power to keep admins and participants's experience.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <span>
            <h1>Testimonials from our clients</h1>
          </span>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
