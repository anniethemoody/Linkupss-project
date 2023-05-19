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
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { upload, useAuth } from "../../contexts/AuthContext";
import { authApp,updateProfile } from "../../firebase";
import {getStorage,uploadBytes,uploadBytesResumable,ref, getDownloadURL} from "firebase/storage"

const LeftSideBar = (props) => {
  const storage = getStorage()
  const auth = useAuth()
  const { currentUser } = useAuth();
  const [offcanvasBody, setOffcanvasBody] = useState({});
  const [offcanvasTitle, setOffcanvasTitle] = useState("");
  const [changePasswordState,setChangePasswordState] = useState(false)
  const [newPassword,setNewPassword] = useState("")
  const [newPasswordConfirm,setNewPasswordConfirm] = useState("")
  const [accountNameState, setAccountNameState] = useState(true);
  const [accountName, setAccountName] = useState(props.userinfo.admin_name);
  const [accountImage,setAccountImage] = useState({})
  const [accountImageURL,setAccountImageURL] = useState("")
  const [accountImageObj,setAccountImageObj] = useState({});
  const [accountEmailState, setAccountEmailState] = useState(true);
  const [accountEmail, setAccountEmail] = useState(props.userinfo.admin_name);
  const [reportProbTitle, setReportProbTitle] = useState("");
  const [reportProbDesc, setReportProbDesc] = useState("");
  const [reportSubmissionState, setReportSubmissionState] = useState(false);
  const [reportSubmissionBtnText, setReportSubmissionBtnText] =
    useState("Submit");

  const [filterByNameStatus, setFilterByNameStatus] = useState(false);
  const [filterByTimeStatus, setFilterByTimeStatus] = useState(false);
  const [filterByCreationStatus, setFilterByCreationStatus] = useState(false);
  
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value)
    //console.log("Password: "+newPassword)
  }
  const handleNewPasswordConfirm = (e) => {
    setNewPasswordConfirm(e.target.value)
    //console.log("New password: "+newPasswordConfirm)

  }

const handleOnImageChange = (e) => {
  var images = []
  images = images.concat([e.target.files[0]])
  setAccountImage(images)
  var imageURL = []
  console.log(e)
  imageURL = imageURL.concat(URL.createObjectURL(e.target.files[0]))
  console.log(imageURL)
  setAccountImageURL(URL.createObjectURL(e.target.files[0]))
  setAccountImageObj(e.target.files[0])
console.log(auth.currentUser.photoURL)
}

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
  const handleAccountEmail = (e) => {
    //console.log(e);
    const email = e.target.value;
    //console.log(name);
    setAccountEmail(email);
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
  const handleFilteringLogic = (type) => {
    if (type === "name") {
      setFilterByNameStatus(true);
      setFilterByTimeStatus(false);
      setFilterByCreationStatus(false);
      props.filterSessionByButton("name");
      props.hide();
    }
    if (type === "time") {
      setFilterByNameStatus(false);
      setFilterByTimeStatus(true);
      setFilterByCreationStatus(false);
      props.filterSessionByButton("time");
      props.hide();
    }
    if (type === "none") {
      setFilterByNameStatus(false);
      setFilterByTimeStatus(false);
      setFilterByCreationStatus(true);
      props.filterSessionByButton("none");
      props.hide();
    }
  };
  const updateProfile = async (e) => {
    console.log(accountImageURL)
    const new_user_details = {
      name: accountName,
      email: accountEmail,
      new_password: newPasswordConfirm,
      photo: accountImageURL
    }
    if(accountImageURL.length!==0){
      upload(accountImageObj,currentUser)
      // currentUser.updateProfile({
      //   photoURL: accountImageURL
      // }).then(function() {
      //   console.log('User photo updated successfully!');
      // }).catch(function(error) {
      //   console.error('Error updating user photo:', error);
      // });
    }
  }

  const updatePassword = async (e) => {
    currentUser.updatePassword(newPassword).then(function() {
      console.log('User password updated successfully!');
    }).catch(function(error) {
      console.error('Error updating user password:', error);
    });
  }

  const saveProfilePhoto = async () =>{
    const fileRef = ref(storage,currentUser.uid)
    const photoURL = await getDownloadURL(fileRef)
    // fileRef.getDownloadURL().then((url) => {
    //   console.log(url)
    //   //setAccountImageURL(url);
    // }).catch((error) => {
    //   // handle error
    // });
    console.log(fileRef)
    console.log(photoURL)
    console.log(currentUser.photoURL)
    setAccountImageURL(photoURL)
  }
  useEffect(()=>{
    saveProfilePhoto()

  },[])


  useEffect(() => {
    //call fetch info to get admin name,email, and let them udpate profile
    const adminUserName = localStorage.getItem("adminUserName");
    const adminEmail = localStorage.getItem("adminUserName");
    const equalPassword = !(newPassword===newPasswordConfirm);

    
    console.log(equalPassword.toString())

    console.log(auth.currentUser)
    if (adminUserName != null) {
      setAccountEmail(adminEmail);
      setAccountName(adminUserName);
    }

    if (props.content === "Account") {
      setOffcanvasTitle("My Account");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Account Details</p>
          <div className = "profile-photo-style">
            
          
          <input
              accept="image/*"
              id="contained-button-file"
              className="hidden"
              type="file"
              style={{display:"none"}}
              onChange = {handleOnImageChange}
            />
            <label htmlFor="contained-button-file">
          <IconButton component="span">
            {
              accountImageURL.length===0 && 
            <Avatar sx={{ width: 100, height: 100}}>{accountName[0].toUpperCase()}</Avatar>
            }
                        {
              accountImageURL.length!==0 && 
            <Avatar src = {accountImageURL}
            sx={{ width: 100, height: 100 }}
         
            />
            }
          </IconButton>
            </label>
            </div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="Admin name"
              aria-label="Admin name"
              aria-describedby="basic-addon1"
              defaultValue={accountName}
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
            <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
              defaultValue={accountEmail}
              disabled={accountEmailState}
              onChange={handleAccountEmail}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setAccountEmailState(!accountEmailState)}
            >
              {console.log(accountEmailState)}
              {accountEmailState ? "Edit" : "Save"}
            </Button>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Organization name
            </InputGroup.Text>
            <Form.Control
              placeholder="Organization name"
              aria-label="Organization name"
              aria-describedby="basic-addon1"
              defaultValue={"SLEC"}
              disabled={true}
            />
          </InputGroup>
{          
!changePasswordState &&
<button className="btn centered w-100 update-password-btn" onClick={() => setChangePasswordState(!changePasswordState)}>
                Change Password
              </button>}

          {
            changePasswordState && 
            <React.Fragment>

            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              New Password
            </InputGroup.Text>
            <Form.Control
              placeholder=" "
              aria-label=" "
              aria-describedby="basic-addon1"
              onChange= {handleNewPassword}

            />
          </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      Confirm Password
                    </InputGroup.Text>
                    <Form.Control
                      placeholder=" "
                      aria-label=" "
                      aria-describedby="basic-addon1"
                      onChange={handleNewPasswordConfirm}
                      isInvalid={equalPassword}
                    />
                  </InputGroup>
            </React.Fragment>

          }
          {changePasswordState && <button className="btn centered w-100 update-password-btn" onClick={() => setChangePasswordState(!changePasswordState)}>
                Cancel
           </button>}


          <button className="btn centered w-100 update-profile-btn" onClick={() => updateProfile()}>
                Update Profile
              </button>

        </Offcanvas.Body>
      );
    } else if (props.content === "Filter") {
      setOffcanvasTitle("Filter");
      setOffcanvasBody(
        <Offcanvas.Body>
          <p>Filter your sessions</p>
          <hr className="rounded" />
          <ListGroup as="ul" defaultActiveKey="#link1">
            <ListGroup.Item
              as="li"
              action
              active={filterByNameStatus}
              onClick={() => handleFilteringLogic("name")}
            >
              Filtered by name
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              action
              active={filterByTimeStatus}
              onClick={() => handleFilteringLogic("time")}
            >
              Filtered by time
            </ListGroup.Item>
            <ListGroup.Item
              action
              as="li"
              active={filterByCreationStatus}
              onClick={() => handleFilteringLogic("none")}
            >
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ex quae iure minus aliquam necessitatibus temporibus vero, saepe praesentium reprehenderit nesciunt voluptatem tempore qui sapiente debitis blanditiis similique nisi deserunt quos explicabo id. Minima distinctio itaque ullam nam quasi nobis corporis illo laborum libero, sequi consectetur accusamus sunt autem praesentium quos fuga nulla magnam, ea omnis ipsam, unde corrupti optio facilis. Autem deserunt quis ut alias laboriosam eveniet ea nam architecto commodi? Sint asperiores consequatur vero iste pariatur. Repudiandae minus debitis, consequuntur impedit nemo, rem hic, labore laboriosam voluptates esse provident quae magnam tempora excepturi cumque. Consectetur quam eos quos!</p>
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
    accountImageURL,
    accountImage,
    accountNameState,
    accountEmailState,
    changePasswordState,
    newPassword,
    newPasswordConfirm,
    reportSubmissionBtnText,
    reportSubmissionState,
    reportProbTitle,
    reportProbDesc,
    filterByNameStatus,
    filterByTimeStatus,
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
