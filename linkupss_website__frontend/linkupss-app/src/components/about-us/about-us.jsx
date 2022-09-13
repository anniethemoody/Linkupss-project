import React, { Component } from "react";
import Jumbotron from "../jumbotron";
import jayson_pic from "../../media/jayson-profile-pic.png";
import nico_pic from "../../media/nico-profile-pic.png";
import ambrose_pic from "../../media/ambrose-profile-pic.png";
import eric_pic from "../../media/eric-profile-pic.png";
import sahil_pic from "../../media/sahil-profile-pic.png";
const AboutUs = () => {
  const title = "Meet Our Team";
  const desc =
    "The Linkupss team is comprised of talented,innovative individuals from diverse backgrounds,all here to build better communication technology for your organization.";
  const btnText = "Learn more about our team";

  return (
    <div className="container py-4">
      <Jumbotron desc={desc} title={title} btnText={btnText} />
      <div className="p-5 mb-4 bg-light rounded-3 container ">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container team">
                <span className="d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">Software Team</h1>
                </span>
                <div className="row my-3">
                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={ambrose_pic}
                        className="card-img-top"
                        alt="..."
                      />
                    <div className="card-body">
                                
                                </div> 
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={eric_pic} className="card-img-top" alt="..." />
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={sahil_pic} className="card-img-top" alt="..." />
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
              <div className="container team">
                <span className="d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">
                    Hardware Team
                  </h1>
                </span>
                <div className="row my-3">
                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={jayson_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      {/* <div className="card-body">
                                
                                </div> */}
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={nico_pic} className="card-img-top" alt="..." />
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={nico_pic} className="card-img-top" alt="..." />
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
              <div className="container team">
                <span className="d-flex justify-content-center mb-3">
                  <h1 className="text-secondary">
                    Business and Marketing Team
                  </h1>
                </span>
                <div className="row my-3">
                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        src={jayson_pic}
                        className="card-img-top"
                        alt="..."
                      />
                      {/* <div className="card-body">
                                
                                </div> */}
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={nico_pic} className="card-img-top" alt="..." />
                    </div>
                  </div>

                  <div className="col">
                    <div
                      className="aboutus-card card"
                      style={{ width: "18rem" }}
                    >
                      <img src={nico_pic} className="card-img-top" alt="..." />
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
