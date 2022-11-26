import React, { Component, useState } from "react";
import Jumbotron from "../jumbotron";
import AboutUsModal from "./about-us-modal";
import jayson_pic from "../../media/jayson-profile-pic.png";

import nico_pic from "../../media/nico-profile-pic.png";

import ambrose_pic from "../../media/ambrose-profile-pic.png";

import eric_pic from "../../media/eric-profile-pic.png";

import sahil_pic from "../../media/sahil-profile-pic.png";

import andrew_pic from "../../media/andrew-profile-pic.png";

import abaidullah_pic from "../../media/abaidullah-profile-pic.png";

import arman_pic from "../../media/arman-profile-pic.png";

import annie_pic from "../../media/annie-profile-pic.png";
import david_pic from "../../media/david-profile-pic.jpg";
import liza_pic from "../../media/liza-profile-pic.jpg";
const AboutUs = () => {
  const title = "Meet Our Team";
  const desc =
    "The Linkupss team is comprised of talented,innovative individuals from diverse backgrounds,all here to build better communication technology for your organization.";
  const btnText = "Learn more about our team";
  const [aboutUsModalState, setAboutUsModalState] = useState(false);
  const [personName, setPersonName] = useState("");
  const [personRole, setPersonRole] = useState("");
  const [personDesc, setPersonDesc] = useState("");
  const ambrose_desc = "";
  const eric_desc = "";
  const sahil_desc = "";
  const liza_desc = "";
  const david_desc = "";
  const andrew_desc =
    "In the last decade, tech has completely revolutionized the way we operate every day. A lot of emphasis has been put on creating newer and faster things, yet I believe we still have some work to do in terms of accessibility to allow everyone to truly take advantage of the incredible things that tech offers. Working on this project gives me the chance to use my skills to significantly improve the lives of many users. I’m excited to see what we can achieve!";
  const arman_desc =
    "Being able to assist those in need has been a focal point in my life and it drives me forward when trying to come up with new ideas or projects to work on. This project really hits home for me because growing up I always helped my grandparents when it came to devices such as computers, TVs and phones. Nowadays with the rise of online calls and video chats, there is a demand for easier and more user friendly devices and softwares, especially for the elderly who are not so familiar with them. As a mechanical engineering student I really enjoy working with the hardware aspect of the project and ensuring that whomever is using the device I created will be satisfied.";
  const jayson_desc =
    "Hey guys this is Jayson all the way from the Hong Kong. Since high school, Ambrose and I have been involved in building technology for seniors. Thus being a part of linkupss meant a lot to me, especially still being able to contribute to the sector and create more value for our society, where the aging population is a pressing issue to the world. Being able to solve business and operational issues for linkupss, and collaborate with passionate peeps over at Canada is also a valuable experience to me. I hope everyone is enjoying their role in this project.";
  const nico_desc =
    "Hi this is Nico from HKU, I’m studying Econ&Fin and is part of the business team of Linkupss. Being responsible for the marketing and financial management of Linkupss, I could further enhance my soft skills and business sense. It’s great to be working with partners in Canada and all around the world, such a precious opportunity for me to broaden my horizons.";
  const abaidullah_desc =
    "I like this project because I believe that there is a substantial need for a system that allows convenience and ease for the elderly to use virtual platforms and I believe that this device exceptionally fulfills this need. This project means a lot to me because it provides me with the opportunity to make meaningful impact in the lives of others.";
const annie_desc = "Zoompad is not only an application about enhancing adapitibility and bringing conveniences for seniors, it is also a chance for a novice engineer like me to learn and showcase their technical abilities. The most brilliant thing about this project is that we get to apply our knowledge into real practice and corporate with others who share the same ambition with me as a team. With the effort and the dedication we throw into this project, I am certain that our contribution will bring technology one step closer to the community.";
  const handleAboutUsModal = (name, role, desc) => {
    setAboutUsModalState(true);
    setPersonName(name);
    setPersonRole(role);
    setPersonDesc(desc);
  };
  return (
    <div className="container py-4">
      <AboutUsModal
        show={aboutUsModalState}
        hide={() => setAboutUsModalState(false)}
        personName={personName}
        personDesc={personDesc}
        personRole={personRole}
      />
      <Jumbotron desc={desc} title={title} btnText={btnText} />
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <span className="row d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">Software Team</h1>
                </span>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Ambrose Ling",
                          "Developer & Project Leader",
                          ambrose_desc
                        )
                      }
                    >
                      <img
                        src={ambrose_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body bg-succes">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Ambrose Ling
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developer &amp; Project Leader
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal("Eric Li", "Developer", eric_desc)
                      }
                    >
                      <img src={eric_pic} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Eric Li
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developer
                        </h5>
                      </div>
                    </div>
                  </div>





                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Liza Abraham",
                          "Developer",
                          liza_desc
                        )
                      }
                    >
                      <img src={liza_pic} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Liza Abraham
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developer
                        </h5>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <span className="row d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">Software Team</h1>
                </span>
                <div className="row my-3">


                <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Sahil Amin",
                          "Developer",
                          sahil_desc
                        )
                      }
                    >
                      <img src={sahil_pic} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Sahil Amin
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developer
                        </h5>
                      </div>
                    </div>
                  </div>









                <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Annie Li",
                          "Frontend Developer",
                          annie_desc
                        )
                      }
                    >
                      <img
                        src={annie_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body bg-succes">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Annie Li
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Frontend Developer
                        </h5>
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon carousel-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <span className="row d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">Hardware Team</h1>
                </span>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Andrew Abdel Malak",
                          "Developer & Hardware Engineer",
                          andrew_desc
                        )
                      }
                    >
                      <img
                        src={andrew_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Andrew Abdel Malak
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developerer &amp; Hardware engineer
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "David Montes de Oca",
                          "Developer & Hardware Engineer",
                          david_desc
                        )
                      }
                    >
                      <img
                        src={david_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                         David Montes de Oca
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Developerer &amp; Hardware engineer
                        </h5>
                      </div>
                    </div>
                  </div>


                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Arman Ghazaiealamdari",
                          "Developer & Hardware Engineer",
                          arman_desc
                        )
                      }
                    >
                      <img src={arman_pic} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Arman Ghazaiealamdari
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Hardware engineer
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <span className="row d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">
                    Business and Marketing Team
                  </h1>
                </span>
                <div className="row my-3">
                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Jayson Cheung",
                          "Business Operations Manager",
                          jayson_desc
                        )
                      }
                    >
                      <img
                        src={jayson_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Jayson Cheung
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Business operations manager
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Abaidullah Arif",
                          "Business Operations & Marketing",
                          abaidullah_desc
                        )
                      }
                    >
                      <img
                        src={abaidullah_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Abaidullah Arif
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Business operations &amp; Marketing
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex justify-content-center">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                      onClick={() =>
                        handleAboutUsModal(
                          "Nico Ling",
                          "Business Operations & Finanial Supervisor",
                          nico_desc
                        )
                      }
                    >
                      <img src={nico_pic} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h4
                          className="text-primary"
                          style={{ textAlign: "center" }}
                        >
                          Nico Ling
                        </h4>
                        <h5
                          className="text-secondary"
                          style={{ textAlign: "center" }}
                        >
                          Business operation &amp; Financial Supervisor
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
