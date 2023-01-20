import React, { Component, useState, useContext, useEffect } from "react";
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
import styled from "styled-components";
const SeeProductsButtonFunction = (e, name) => {
  alert(`${name} was clicked`);
};
const LoginButtonFunction = (e, name) => {
  alert(`${name} was clicked`);
};

const Admin_Signup_ButtonFunction = (e, name) => {
  alert(`${name} was clicked`);
};
const Admin_Login_ButtonFunction = (e, name) => {
  alert(`${name} was clicked`);
};
const Part_Signup_ButtonFunction = (e, name) => {
  alert(`${name} was clicked`);
};

const HeroSectionRootRootRoot = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;
const Hero_Leftcol = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
  margin: 0px 0px 1.13em 0px;
`;
const Hero_Title = styled.div`
  width: 34.88em;
  height: 301px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px 0px 0px 2.88em;
`;
const Paragraph = styled.div`
  width: 10.8em;
  height: 246px;
  left: 41px;
  top: 0px;
  position: absolute;
  color: #798dac;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
`;
const Paragraph1 = styled.div`
  width: 22.32em;
  height: 85px;
  position: relative;
  color: #798dac;
  font-size: 25px;
  font-family: Outfit;
`;
const Group = styled.div`
  width: 37.75em;
  gap: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const SeeProductsButton = styled.button`
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  padding-top: 0.94em;
  padding-right: 0.63em;
  padding-bottom: 1em;
  padding-left: 1.38em;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Text1 = styled.div`
  width: 7.93em;
  height: 42px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const LoginButton = styled.button`
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px;
  padding-top: 0.94em;
  padding-right: 5.75em;
  padding-bottom: 1em;
  padding-left: 5.13em;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Text2 = styled.div`
  width: 2.86em;
  height: 42px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const Hero_Rightcol = styled.img`
  width: 43.31em;
  height: 458px;
`;
const Text3 = styled.div`
  width: 313px;
  height: 55px;
  color: #798dac;
  font-size: 32px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const RectangleRootRootRoot = styled.div`
  height: 806px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 5.31em 5.31em 5.31em 5.25em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/40EfmtZpTgn1UVCEH9M1.svg");
`;
const Ourvalues = styled.div`
  text-align: center;
  height: 42px;

  color: #798dac;
  font-size: 25px;
  font-family: Outfit;
`;
const Valuestitle = styled.div`
  text-align: center;
  height: 72px;
  margin: 0px 0px 0.88em 0px;
  color: #798dac;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
`;
const Picgroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-start;
  align-items: flex-start;
  margin: 0px 0px 1.56em 0px;
`;
const Pic1 = styled.img`
  width: 21.44em;
  height: 338px;
  margin: 0px 8.93em 0px 0px;
`;
const Pic2 = styled.img`
  width: 21.13em;
  height: 338px;
  margin: 0px 6.81em 0px 0px;
`;
const Pic3 = styled.img`
  width: 21.13em;
  height: 338px;
`;

const Valuedesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left:-60px;
`;
const Group0 = styled.div`
  height: 171px;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 10.63em 0px 0px;
`;
const Desc1 = styled.div`
  width: 14.7em;
  height: 83px;
  align-self: flex-end;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
`;
const Group1 = styled.div`
  height: 171px;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 9.19em 0px 0px;
`;
const Desc2 = styled.div`
  width: 13.9em;
  height: 94px;
  align-self: flex-end;
  margin: 0px 0.85em 0px 0px;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
  white-space: pre-wrap;
`;
const Group2 = styled.div`
  width: 13.69em;
  height: 171px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px 2.94em;
`;
const Text5 = styled.div`
  width: 9.78em;
  height: 55px;
  left: 0px;
  top: 0px;
  position: absolute;
  color: #798dac;
  font-size: 32px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Desc3 = styled.div`
  width: 10.95em;
  height: 120px;
  position: relative;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
`;
const TeamProfileSectionRootRootRoot = styled.div`
  gap: 88px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Team_Leftcol = styled.img`
  width: 43.56em;
  height: 551px;
`;
const Team_Rightcol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 3.44em 0px 0px 0px;
`;
const Teamtitle = styled.div`
  width: 11.66em;
  height: 128px;
  margin: 0px 0px 0.32em 0px;
  color: #798dac;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
`;
const Teamdesc = styled.div`
  width: 21.28em;
  height: 153px;
  margin-bottom: 4em;
  margin: 0px 0px 3em 0px;
  color: #798dac;
  font-size: 25px;
  font-family: Outfit;
  white-space: pre-wrap;
`;

const ViewProfilesButton = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 0px 6em;
  padding: 1em 0.63em 0.94em 4.44em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/eBjZ7vYcw6MIQ14CkDIp.svg");
`;
const ViewOurProfiles = styled.div`
  width: 10.32em;
  height: 42px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const RectangleRootRootRootRoot = styled.div`
  height: 35 0px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 2.69em 0.38em 2.69em 1.88em;
  background-color: #cbd5f8;
`;
const Unititle = styled.div`
  margin-bottom: 15px;
  color: #798dac;
  font-size: 25px;
  font-family: Outfit;
  text-align: center;
`;
const Unipics = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center; !important
  align-items: flex-start;
`;
const Uoft = styled.img`
  width: 27.25em;
  height: 209px;
  margin: 0px 4.19em 0px 0px;
`;
const Hku = styled.img`
  width: 23.06em;
  height: 165px;
  margin: 0px 5.13em 1.56em 0px;
`;
const Ust = styled.img`
  width: 28.19em;
  height: 230px;
`;

const Session_Dummy_1 = styled.div`
  height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 8.89px 18.3px 8.89px 14.4px;
  border-radius: 20px;
  background-color: #f4f0f1;
`;
const Dumy_Short = styled.div`
  height: 15.2px;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 8.89px 0px;
  background-color: #d9d9d9;
`;
const Dummy_Short_Rect = styled.div`
  width: 111px;
  height: 15.2px;
  background-color: #d9d9d9;
`;
const Dummy_Thing = styled.div`
  width: 202px;
  height: 15.2px;
  margin: 0px 0px 6.35px 0px;
  background-color: #d9d9d9;
`;

const Session_Line = styled.img`
  width: 221px;
  height: 1px;
  align-self: flex-end;
  margin: 0px 0px 3.81px 0px;
`;
const Session_1_Bottom = styled.div`
  height: 31.8px;
  gap: 99.5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Start_Dummy = styled.div`
  width: 91.6px;
  height: 27.9px;
  margin: 1.27px 0px 0px 0px;
  border-radius: 20px;
  background-color: #dbe3ff;
`;
const Edit_Dummy = styled.img`
  width: 32.7px;
  height: 31.8px;
`;
const RootRootRootRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Action_Top_Section = styled.div`
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  align-items: flex-start;
  padding: 0px 7.56em 0px 4.5em;
`;
const Action_Title = styled.div`
  text-align: center;

  color: #798dac;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Action_Desc = styled.div`
  text-align: center;
  position: relative;
  color: #798dac;
  font-size: 29px;
  font-family: Outfit;
  text-align: center;
  white-space: pre-wrap;
  padding: 0 10em 0 10em;
`;
const Action_Bot_Section = styled.div`
  width: 90em;
  height: 1885px;
  position: relative;
  gap: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const WireConnectionThingy = styled.img`
  width: 47.63em;
  height: 493px;
  left: 456px;
  top: 662px;
  position: absolute;
`;
const Left_Col = styled.div`
  height: 1597px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const AdminCircle = styled.div`
  width: 39.81em;
  height: 526px;
  position: relative;
  gap: 21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12.69em 0px 12.69em 2.19em;
`;
const Apple_1 = styled.div`
  width: 60em;
  height: 1280px;
  left: -600px;
  top: -180px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18.13em 4.25em 23.63em 2.19em;
  margin-right: 10em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/NYlL2dltkVfcHO0M2yPf.svg");
`;
const Apple_1_Title = styled.div`
  width: 11.66em;
  height: 66px;
  position: relative;
  align-self: flex-end;
  color: rgba(254, 69, 41, 0.44);
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
  margin-left: 80px;
`;
const Apple_1_Text_Section = styled.div`
  position: relative;
  gap: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 30px;
`;
const Apple_1_Desc = styled.div`
  width: 26.6em;
  height: 118px;
  align-self: flex-end;
  margin: 0px 0.5em 1.5em 0px;
  color: #798dac;
  font-size: 27px;
  font-family: Outfit;
  line-height: 30px;
  text-align: center;
`;
const Apple_1_Buttons_Section = styled.div`
  gap: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 50px;
`;
const Apple_1_Buttons_Left = styled.div`
  width: 12.63em;
  height: 120px;
  position: relative;
`;
const Signup_Text = styled.div`
  width: 4.29em;
  height: 42px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const Signup_Button = styled.button`
  width: 7.5em;
  height: 42px;
  left: 0px;
  top: 47px;
  position: absolute;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  padding-top: 1em;
  padding-right: 3.81em;
  padding-bottom: 0.94em;
  padding-left: 4.56em;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  margin-top:2em;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Apple_1_Buttons_Riight = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
`;
const Apple_1_Logindesc = styled.div`
  width: 13.47em;
  height: 24px;
  align-self: flex-end;
  margin: 18px 1.33em 0px 0px;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
`;
const Apple_1_signupdesc = styled.div`
  width: 12em;
  height: 40px;
  justify-content: center;
  align-self: center;
  margin: 0px 1.33em 2em 30px;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
`;
const Login_Button = styled.button`
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top:1.8em;
  align-items: flex-start;
  padding: 0px;
  padding-top: 1em;
  padding-right: 3.38em;
  padding-bottom: 0.94em;
  padding-left: 5em;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Login_Text = styled.div`
  width: 4.29em;
  height: 42px;
  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const Linkpad = styled.div`
  width: 28em;
  gap: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
  margin: 0px 6.88em 0px 0px;
  padding: 1.81em 1em 1.44em 1.13em;
  border-radius: 30px;
  background-color: #fcfcfc;
`;
const Linkpad_Top = styled.div`
  width: 26em;
  gap: 47px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.94em 0em 1.5em 1em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/uy6cm7wE47SGILItmAro.svg");
`;
const Join = styled.img`
  width: 8.69em;
  height: 142px;
  justify-content: center;
  align-self: center;
`;
const Leave = styled.img`
  width: 11em;
  height: 151px;
  justify-content: center;
  align-self: center;
`;
const Linkpad_Bottom = styled.div`
  gap: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-end;
  align-items: flex-start;
`;
const Mic = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Mic_Box = styled.div`
  width: 16em;
  height: 200px;

  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.8em 0em 2em 0em;
  border-radius: 30px;
  background-color: rgba(203, 252, 255, 0.71);
`;
const Mic_Icon = styled.img`
  width: 9em;
  height: 153px;
  position: relative;

`;
const Camera = styled.div`
width:100%;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.44em 1.06em 2.44em 1.5em;
`;
const Camera_Box = styled.div`
width: 12em;
height: 160px;

  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.44em 1.06em 2.44em 1.5em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/SzyUkhyT3faI5V4AQGde.svg");
`;
const Camera_Icon = styled.img`
  width: 9.19em;
  height: 104px;
  position: relative;
`;
const Right_Col = styled.div`
  height: 1737px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-end;
  align-items: flex-start;
`;
const Website_Dummy = styled.div`
  height: 462px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 0px 10em;
  padding: 1.11em 0.66em 1.11em 0.49em;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px rgba(243, 110, 90, 0.44);
`;
const Window_Buttons = styled.img`
  width: 4.58em;
  height: 12.7px;
  margin: 0px 0px 0.67em 0.57em;
`;
const Website_Line = styled.img`
  width: 39.94em;
  height: 2px;
  margin: 0px 0px 1.51em 0px;
`;
const Sessions_Top = styled.div`
  height: 146px;
  gap: 52.4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 1.35em 1.47em;
`;
const Session_Yoga = styled.div`
  height: 128px;
  gap: 10.4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0.56em 0.82em 0.56em 0.74em;
  border-radius: 20px;
  background-color: #f4f0f1;
`;
const Session_Yoga_Top = styled.div`
  gap: 3.81px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 0.16em 0px 0.82em;
`;
const Yoga_Text_Top = styled.div`
  height: 27.9px;
  gap: 7.85px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Yoga_Title = styled.div`
  width: 5.8em;
  height: 27.9px;
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Yoga_Time = styled.div`
  width: 4.58em;
  height: 27.9px;
  color: #798dac;
  font-size: 20px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Yoga_Desc = styled.div`
  width: 12.62em;
  height: 39.4px;
  margin: 0px 0px 0px 0.91em;
  color: #798dac;
  font-size: 13px;
  font-weight: 700;
  font-family: Outfit;
`;
const Session_Yoga_Bottom = styled.div`
  gap: 3.81px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Session_Yoga_Line = styled.img`
  width: 13.81em;
  height: 1px;
  align-self: flex-end;
  margin: 0px 0.16em 0px 0px;
`;
const Session_Yoga_Button_Section = styled.div`
  height: 31.8px;
  gap: 92.9px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Yoga_Start = styled.div`
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0px;
`;
const Yoga_Start_Button = styled.div`
  width: 5.73em;
  height: 27.9px;
  left: 7.85px;
  top: 3.81px;
  position: absolute;
  border-radius: 20px;
  background-color: #dbe3ff;
`;
const StartSession = styled.div`
  width: 8.15em;
  height: 20.3px;
  position: relative;
  color: #97adfa;
  font-size: 13px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Edit_Button = styled.div`
  height: 100%;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.4em 0.41em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/mzL3Qf39xTM1Il5bWZo5.svg");
`;
const Pen = styled.img`
  width: 1.23em;
  height: 19.1px;
`;
const Sessions_Bottom = styled.div`
  height: 146px;
  gap: 52.4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0px 0px 1.67em 1.47em;
`;
const Plus_Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  align-items: flex-start;
  margin: 0px 5em 0px 0px;
  padding: 1.03em 0.98em 0.95em 1.06em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/gCdhYuR0mg3e8SiYhfjn.svg");
`;

const Plus = styled.img`
  width: 1.64em;
  height: 25.4px;
`;
const ParticipantCirrcle = styled.div`
  width: 38.19em;
  height: 596px;
  position: relative;
  gap: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10.5em 0px 10.5em 5.44em;
`;
const Apple_2 = styled.div`
  transform:scale(2.3,2.3);
  right: -300px;
  bottom: 120px;
  width:400px;
  height:600px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10.5em 0px 10.5em 5.44em;
  background-size: cover;
  background-image: url("https://file.rendit.io/n/4ANkZ8YJZNw0cGcPtC4G.svg");
`;
const Apple_2_Top_Section = styled.div`
  height: 323px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 0px 0px 0.63em;
  margin-left:-10em;
  margin-top:-10px;
`;
const Apple_2_Title = styled.div`
  width: 11.66em;
  height: 66px;
  align-self: flex-end;
  color: rgba(254, 69, 41, 0.44);
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
  margin-left:-5em;
`;
const Apple_2_Desc = styled.div`
  width: 26.6em;
  height: 118px;
  color: #798dac;
  font-size: 27px;
  font-family: Outfit;
  line-height: 30px;
  text-align: center;
  margin-top:15px;
`;
const Apple_2_Button_Section = styled.div`
  width: 12.63em;
  height: 117px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 15em 0px 9.94em;
  margin-top: 5px;
  margin-right:10px;
`;
const Part_Signup_Button = styled.button`
  width: 7.5em;
  height: 49px;
  left: 170px;
  top: 44px;
  position: absolute;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px;
  padding-top: 0.75em;
  padding-right: 3.81em;
  padding-bottom: 0.75em;
  padding-left: 4.56em;
  margin-top: 30px;
  border-width: 0px;
  border-radius: 50px;
  box-sizing: content-box;
  background-color: #f4f0f1;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const SignUp = styled.div`
  width: 4.29em;
  height: 42px;

  color: #798dac;
  font-size: 28px;
  font-weight: 700;
  font-family: Outfit;
`;
const Part_Button_Desc = styled.div`
  width: 13.47em;
  height: 71px;
  position: relative;
  color: #798dac;
  font-size: 20px;
  font-family: Outfit;
  text-align: center;
  margin-bottom:3em;
`;
const Apple_2_Bot_Desc = styled.div`
  width: 26.6em;
  height: 118px;
  position: relative;
  color: #798dac;
  font-size: 27px;
  font-family: Outfit;
  text-align: center;
  white-space: pre-wrap;
  margin-left:-5em;
  margin-top:1em;
`;

const FinalSection = styled.div`
  height: 931px;
  gap: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.25em 2em 3.25em 3.19em;
  border-radius: 20px;
  background-color: #ffffff;
  margin: 0 10em 0 10em;
`;
const Final_Card = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Are_You_Ready = styled.div`

  text-align:center;
  justify-self:center;
  align-self: center;
  color: #9cb1ff;
  font-size: 50px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;
const Fnal_Body = styled.div`
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 9.63em 0px 11.31em;
`;
const Final_Text = styled.div`
  width: 14.53em;
  height: 100%;

  color: #9cb1ff;
  font-size: 70px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
  white-space: pre-wrap;
`;
const Linkupsslogo = styled.img`
  width: 42.63em;
  height: 500px;
  position: relative;
`;
const Get_Started_Button = styled.div`
  height:600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  padding: 1.13em 2.63em 2em;
  background-size: cover;
  margin-left:15px;
  background-image: url("https://file.rendit.io/n/bF8TzWo0bdZ7j5E3zvFa.svg");
`;
const Get_Started_Text = styled.div`
  width: 7.15em;
  height: 42px;
  color: #798dac;
  font-size: 40px;
  font-weight: 700;
  font-family: Outfit;
  text-align: center;
`;

const Home = () => {
  return (
    <React.Fragment>
      <div className="space-box-hero" />

      <HeroSectionRootRootRoot>
        <Hero_Leftcol>
          <Hero_Title>
            <Paragraph>
              Reinventing how you connect with your community online
            </Paragraph>
            <Paragraph1>
              Linkupss is here to bring innovations that are simple , easy-to-
              use to the public
            </Paragraph1>
          </Hero_Title>
          <Group>
            <SeeProductsButton
              onClick={(e) => SeeProductsButtonFunction(e, "SeeProductsButton")}
            >
              <Text1>See our products</Text1>
            </SeeProductsButton>
            <LoginButton onClick={(e) => LoginButtonFunction(e, "LoginButton")}>
              <Text2>Login</Text2>
            </LoginButton>
          </Group>
        </Hero_Leftcol>
        <Hero_Rightcol
          src={`https://file.rendit.io/n/IUHvoYJ8rOj9oxACY7kT.png`}
        />
      </HeroSectionRootRootRoot>

      <div className="space-box" />
      <RectangleRootRootRoot>
        <div className="value-topbox">
          <Ourvalues>Our Values</Ourvalues>
          <Valuestitle>You are important to us</Valuestitle>
        </div>
        <div className="container-for-value-desc">
          <Picgroup>
            <Pic1 src={`https://file.rendit.io/n/lZ2xO0dFEbfD1q9HMSvy.png`} />
            <Pic2 src={`https://file.rendit.io/n/xebdsuxrsk2XihOpgT8w.png`} />
            <Pic3 src={`https://file.rendit.io/n/GfU61NVNd1CE4nCtwy7Q.png`} />
          </Picgroup>
        </div>
        <div className="container-for-value-desc">
          <Valuedesc>
            <Group0>
              <Text3>Simplicity, Effortless</Text3>
              <Desc1>
                Linkupss aims to make technology less confusing through
                intuitive designs
              </Desc1>
            </Group0>
            <Group1>
              <Text3>Digital Inclusion</Text3>
              <Desc2>
                Everybody deserves equal access to safe and user-friendly
                technology{" "}
              </Desc2>
            </Group1>
            <Group2>
              <Text5>Universal technology</Text5>
              <Desc3>
                Our technology is designed to be used by anyone , anywhere
                around the world.
              </Desc3>
            </Group2>
          </Valuedesc>
        </div>
      </RectangleRootRootRoot>
      <div className="space-box" />

      <TeamProfileSectionRootRootRoot>
        <div className="container">
          <div className="d-flex justify-content-around">
            <div className="col">
              <Team_Leftcol
                src={`https://file.rendit.io/n/EqUUarbkRrFUDvJSf6NP.png`}
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-6">
              <Team_Rightcol>
                <Teamtitle>A Diverse Team Dedicated To Serve You</Teamtitle>
                <Teamdesc>
                  Our LINKUPSS team of engineers, developers
                  {"  "}
                  and managers has talented individuals all come from different
                  backgrounds and cultures. All here to bring you better
                  technology.
                </Teamdesc>
                <div className="row-md-3" />

                <ViewProfilesButton>
                  <ViewOurProfiles>
                    View Our Profiles
                    <br />
                  </ViewOurProfiles>
                </ViewProfilesButton>
              </Team_Rightcol>
            </div>
          </div>
        </div>
      </TeamProfileSectionRootRootRoot>
      <div className="space-box" />
      <RectangleRootRootRootRoot>
        <div className="container">
          <div className="row">
            <Unititle>Where We Are From</Unititle>
          </div>

          <div className="row">
            <Unipics>
              <Uoft src={`https://file.rendit.io/n/jjNJZVOk9eZT0fTypcrh.png`} />
              <Hku src={`https://file.rendit.io/n/g31dNO8VFF7A342UbXRO.png`} />
              <Ust src={`https://file.rendit.io/n/XfSZjCbtg8LggmUka8p0.png`} />
            </Unipics>
          </div>
        </div>
      </RectangleRootRootRootRoot>
      <div className="space-box" />

      <RootRootRootRoot>
        <Action_Top_Section>
          <div>
            <Action_Title>What we are doing right now</Action_Title>
            <Action_Desc>
              LINKUPSS has developed a way for online meetings on Zoom to
              operate simpler for both end users with our Linkpad and our
              meeting management tool.{" "}
            </Action_Desc>
          </div>
        </Action_Top_Section>
        <Action_Bot_Section>
          <WireConnectionThingy
            src={`https://file.rendit.io/n/EjQg9TlERrnUtA6ICJqK.png`}
          />
          <Left_Col>
            <AdminCircle>
              <Apple_1 />
              <Apple_1_Title>If you’re an admin ...</Apple_1_Title>
              <Apple_1_Text_Section>
                <Apple_1_Desc>
                  Admins can create their sessions by using their Zoom meeting
                  ID and start them on their dashboard. Admins can also add
                  participants to each session that are registered in the
                  organisation
                </Apple_1_Desc>
                <Apple_1_Buttons_Section>
                  <Apple_1_Buttons_Left>
                    <Apple_1_signupdesc>
                      Don't have an account ? Sign up now !
                    </Apple_1_signupdesc>
                    <Signup_Button
                      onClick={(e) =>
                        Admin_Signup_ButtonFunction(e, "signup-button")
                      }
                    >
                      <Signup_Text>Sign Up</Signup_Text>
                    </Signup_Button>
                  </Apple_1_Buttons_Left>
                  <Apple_1_Buttons_Riight>
                    <Apple_1_Logindesc>
                      To access your dahsboard
                    </Apple_1_Logindesc>
                    <Login_Button
                      onClick={(e) =>
                        Admin_Login_ButtonFunction(e, "login-button")
                      }
                    >
                      <Login_Text>Log In</Login_Text>
                    </Login_Button>
                  </Apple_1_Buttons_Riight>
                </Apple_1_Buttons_Section>
              </Apple_1_Text_Section>
            </AdminCircle>
            <Linkpad>
              <Linkpad_Top>
                <Join
                  src={`https://file.rendit.io/n/rZ3otUbTvTL20PN0PR9l.png`}
                />
                <Leave
                  src={`https://file.rendit.io/n/isBJcm4VvVPH6TNIz940.png`}
                />
              </Linkpad_Top>
              <Linkpad_Bottom>
                <Mic>
                  <Mic_Box >
                  <Mic_Icon
                    src={`https://file.rendit.io/n/ObvBey18mdzxURDbaKlP.png`}
                  />
                  </Mic_Box>
                </Mic>
                <Camera>
                  <Camera_Box>

                  <Camera_Icon
                    src={`https://file.rendit.io/n/HeSHX8SraLI79bmcT0jw.png`}
                  />
                  </Camera_Box>
                </Camera>
              </Linkpad_Bottom>
            </Linkpad>
          </Left_Col>
          <Right_Col>
            <Website_Dummy>
              <Window_Buttons
                src={`https://file.rendit.io/n/z0OD2ig3jkQKS8QrMiXI.svg`}
              />
              <Website_Line
                src={`https://file.rendit.io/n/ffOboopAZsrmQ3R4BKMK.svg`}
              />
              <Sessions_Top>
                <Session_Yoga>
                  <Session_Yoga_Top>
                    <Yoga_Text_Top>
                      <Yoga_Title>Yoga Class</Yoga_Title>
                      <Yoga_Time>08:00</Yoga_Time>
                    </Yoga_Text_Top>
                    <Yoga_Desc>
                      Morning stretches with our yoga instructor
                    </Yoga_Desc>
                  </Session_Yoga_Top>
                  <Session_Yoga_Bottom>
                    <Session_Yoga_Line
                      src={`https://file.rendit.io/n/SK0vJlbteCMDDC5Uq9g1.svg`}
                    />
                    <Session_Yoga_Button_Section>
                      <Yoga_Start>
                        <Yoga_Start_Button />
                        <StartSession>
                          Start Session
                          <br />
                        </StartSession>
                      </Yoga_Start>
                      <Edit_Button>
                        <Pen
                          src={`https://file.rendit.io/n/ln0Nu2kgsEJPFhrDfGrr.png`}
                        />
                      </Edit_Button>
                    </Session_Yoga_Button_Section>
                  </Session_Yoga_Bottom>
                </Session_Yoga>
                <Session_Dummy_1>
                  <Dumy_Short>
                    <Dummy_Short_Rect />
                  </Dumy_Short>
                  <Dummy_Thing />
                  <Dummy_Thing />
                  <Session_Line
                    src={`https://file.rendit.io/n/zmitke09jzEwOqrF6BaH.svg`}
                  />
                  <Session_1_Bottom>
                    <Start_Dummy />
                    <Edit_Dummy
                      src={`https://file.rendit.io/n/EFDf0xqPyDE4rNSPHDZB.svg`}
                    />
                  </Session_1_Bottom>
                </Session_Dummy_1>
              </Sessions_Top>
              <Sessions_Bottom>
                <Session_Dummy_1>
                  <Dumy_Short>
                    <Dummy_Short_Rect />
                  </Dumy_Short>
                  <Dummy_Thing />
                  <Dummy_Thing />
                  <Session_Line
                    src={`https://file.rendit.io/n/hjGM7ntQgXUkJFgsFR3X.svg`}
                  />
                  <Session_1_Bottom>
                    <Start_Dummy />
                    <Edit_Dummy
                      src={`https://file.rendit.io/n/L2eIn7nvG0WFCKLFHGC1.svg`}
                    />
                  </Session_1_Bottom>
                </Session_Dummy_1>
                <Session_Dummy_1>
                  <Dumy_Short>
                    <Dummy_Short_Rect />
                  </Dumy_Short>
                  <Dummy_Thing />
                  <Dummy_Thing />
                  <Session_Line
                    src={`https://file.rendit.io/n/jX1gEhWwJ8wnZ0d0vMaS.svg`}
                  />
                  <Session_1_Bottom>
                    <Start_Dummy />
                    <Edit_Dummy
                      src={`https://file.rendit.io/n/DjWX75ow8wpFMh2XQjKd.svg`}
                    />
                  </Session_1_Bottom>
                </Session_Dummy_1>
              </Sessions_Bottom>
              <Plus_Button>
                <Plus
                  src={`https://file.rendit.io/n/UqMK92DjGhizscs0iXdH.png`}
                />
              </Plus_Button>
            </Website_Dummy>
            <ParticipantCirrcle>
              <Apple_2 />
              <Apple_2_Top_Section>
                <Apple_2_Title>If you’re a participant ...</Apple_2_Title>
                <Apple_2_Desc>
                  Participants can join online meetings simply by connecting the
                  Linkpad to your computer. You can register for admins to be
                  able to add you to a session.
                </Apple_2_Desc>
                <Apple_2_Button_Section>
                  <Part_Signup_Button
                    onClick={(e) =>
                      Part_Signup_ButtonFunction(e, "part-signup-button")
                    }
                  >

                  <SignUp>Sign Up</SignUp>
                  </Part_Signup_Button>
                  <Part_Button_Desc>
                    Don’t have a Linkupss account, sign up now !
                  </Part_Button_Desc>
                </Apple_2_Button_Section>
              </Apple_2_Top_Section>
              <Apple_2_Bot_Desc>
                That’s it ! Simply wait for the meeting to start and join with
                the pad !{" "}
              </Apple_2_Bot_Desc>
            </ParticipantCirrcle>
          </Right_Col>
        </Action_Bot_Section>
      </RootRootRootRoot>

      <div className="space-box" />
      <div className="space-box" />

      <FinalSection>
      <Final_Card>
        <Are_You_Ready>Are You Ready ?</Are_You_Ready>
        <Fnal_Body>
          <Final_Text>Be A Part Of The Next Big Thing </Final_Text>
          <Linkupsslogo
            src={`https://file.rendit.io/n/KNedUaO2u2F928DSWGrv.png`}
          />
        </Fnal_Body>
      </Final_Card>
      <Get_Started_Button>
        <Get_Started_Text>Get Started</Get_Started_Text>
      </Get_Started_Button>
    </FinalSection>
    <div className="space-box" />

    </React.Fragment>
  );
};

export default Home;
// const Home = () => {
//   const title = "Linkupss";
//   const [circle1Clicked, setcircle1Clicked] = useState(false);
//   const desc =
//     "To serve and simplify your community engagements with modern technology";
//   const btnText = "Learn more";
//   useEffect(() => {
//     Aos.init({ duration: 1000 });
//   }, []);
//   return (
//     <div className="container py-4">
//       <div className="p-5 mb-4 bg-light rounded-3">
//         <div className="container-fluid py-5">
//           <h1 className="text-primary display-1">
//             <AnimatedText
//               type="words" // animate words or chars
//               animation={{
//                 x: "200px",
//                 y: "-20px",
//                 scale: 1.1,
//                 ease: "ease-in-out",
//               }}
//               animationType="float"
//               interval={0.06}
//               duration={0.8}
//               tag="p"
//               className="animated-paragraph"
//               includeWhiteSpaces
//               threshold={0.1}
//               rootMargin="20%"
//             >
//               Here To Serve Your Community Engagements With Technology
//             </AnimatedText>
//           </h1>
//           <h4 className="display-6" >

//           <AnimatedText
//               type="words" // animate words or chars
//               animation={{
//                 x: "200px",
//                 y: "-20px",
//                 scale: 1.1,
//                 ease: "ease-in-out",
//               }}
//               animationType="float"
//               interval={0.06}
//               duration={0.8}
//               tag="p"
//               className="animated-paragraph"
//               includeWhiteSpaces
//               threshold={0.1}
//               rootMargin="20%"
//             >
//                         Linkupss is here to bring innovations that are simple,easy-to-use
//             for the public. What started as an engineering project, has expanded
//             to something a lot more meaningful ....
//             </AnimatedText>

//           </h4>
//         </div>
//       </div>
//       <div className="container overflow-hidden">
//         <div className="col p-5 mb-4 bg-light rounded-3">
//           <div className="container-fluid py-5 text-center">
//             <span className="text-primary text-center display-1">LinkupS</span>
//             <span className="text-secondary text-center display-1">implify</span>
//             <span className="text-primary text-center display-1">S</span>
//             <span className="text-secondary text-center display-1">ervice</span>

//             <div className="row mt-5">
//               <img
//               data-aos="fade-right"
//                 src={handreact}
//                 className="col card-img-homepage"
//                 alt="..."
//               />
//               <div className="col">
//                 <div className="card border-primary home-page-card">
//                   <div className="home-page-card-body">
//                     {/* <h1 fontSize="25px">What We Value</h1> */}
//                     {/* {circle1Clicked && (
//                       <span className="card-text-homepage">
//                         Technology can be confusing sometimes for new users or
//                         people less exposed to technology, which is why Linkupss
//                         aims to break that norm and by starting from elderly
//                         commmunities
//                       </span>
//                     )} */}
//                     <div className="card border-primary home-circle-1">
//                       <span className="display-6 text-secondary">Digital Inclusion</span>
//                   </div>
//                   <div className="card border-primary home-circle-2">
//                       <span className="display-6 text-secondary">Easy and intuituve technology</span>
//                   </div>
//                   <div className="card border-primary home-circle-3">
//                       <span className="display-6 text-secondary">Automation-driven</span>
//                   </div>

//                   </div>
//                 </div>

//               </div>
//             </div>
//             <hr className="rounded" />

//             <div className="card text-center mt-5">
//               <div className="card-body row">
//                 <span className="col">

//                 <h1 className="display-5">We make it simple</h1>
//                 </span>
//                 <span className="col lead">
//                 Technology can be confusing sometimes for new users or
//                         people less exposed to technology, which is why Linkupss
//                         aims to break that norm and by starting from elderly
//                         commmunities
//                 </span>
//               </div>
//             </div>

//             <div className="card text-center mt-5">
//               <div className="card-body row">
//                 <span className="col">

//                 <h1 className="display-5">We want to include you</h1>
//                 </span>
//                 <span className="col lead">
//                   Digital inclusion is so important to us, as we believe that
//                   nobody deserves to be left out from the benefits of technology
//                   and whether you are a senior or a child, we should have equal
//                   access to safe technology
//                 </span>
//               </div>
//             </div>

//             <div className="card mt-5">
//               <div className="card-body row">
//                 <span className="col">
//                     <h1 className="display-5">We want to hear your voice</h1>
//                 </span>
//                 <span className="col lead">
//                     The Linkupss team believes everyone's voice is equally valuable when it comes to technology usage, here we promote equal representation in the world of technology.
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="col p-5 mb-4 bg-light rounded-3">
//         <div className="container-fluid py-5">
//           <h1 className="display-2">What are we doing right now?</h1>
//           {/* <button className="btn btn-primary btn-lg" type="button">
//             {"Learn more"}
//           </button> */}
//           <span className="display-6">
//             The Linkupss team has developed this website as a way for hosts of
//             online meetings to manage their sessions cleaner and easier. This
//             online platform acts as an extension to the Linkpad.
//           </span>
//           <div className="card home-page-card-diagram  text-center mt-4">
//             <div className="card-body">
//               <img src={websiteflow} className="" alt="..." />
//             </div>
//           </div>
//           <div className="d-flex justify-content-center mt-4">
//               <button type = "button" className="homepage-btn-text btn">
//                 <span className="admin-intro-text">Designed for the admins of your organization, the Linkupss website serves as an online platform for you to manage your online meetings.</span>
//                 <Link to="/adminloginregister" className="admin-intro-text">To start using your meeting management tool, click here</Link>
//               </button>
//           </div>

//           <hr className="rounded" />

//           <div className=" home-page-card-2 bg-white text-center">
//             <div className="card-body">
//               <img src={linkpadflow} className="" alt="..." />
//             </div>
//           </div>

//           <div className="d-flex flex-column justify-content-center align-items-center mt-4">
//               <button type = "button" className="homepage-btn-text btn">
//               <p className="participant-intro-text">Designed for the participants, the Linkpad is an external device that is connected to the client computer and serves as a simplied interface for online meeting softwares, such as Zoom, Google Meets, etc.</p>
//               </button>
//               <Link to="/products">
//               <button type="button" className="btn btn-lg btn-outline-primary learnmorelinkpad-btn">
//                 Learn more about Linkpad
//               </button>
//               </Link>
//           </div>

//         </div>
//       </div>

//       <div className="col p-5 mb-4 bg-light rounded-3">
//         <div className="container-fluid py-5">
//           <div className="row">
//             <div className="col text-center">
//               <SupportAgentIcon className="text-primary home-page-icons" fontSize="large" />
//               <h1 className="text-primary">Tech Support</h1>
//               <div className="lead text-primary">
//             Linkupss is eager to provide a wide range of resources to help users with any problems or concerns they have with our products.
//             To see F.A.Q, click here. For more resources, you can contact the Linkupss team direcrly through your organization.
//               </div>
//             </div>
//             <div className="col text-center">
//               <PublicIcon className="text-primary home-page-icons" fontSize="large" />
//               <h1 className="text-primary" >Eco-friendly</h1>
//               <div className="lead text-primary">
//               Linkupss truly believes in creating a greener and more sustainble environment, which is why we aim to use recyclable, biodegradable and biosourced materials in our 3D modelling processes as well as minimizing waste or unneeded resources.
//               </div>
//             </div>
//             <div className="col text-center">
//               <SecurityIcon className="text-primary home-page-icons" fontSize="large" />
//               <h1 className="text-primary">High Security</h1>
//               <div className="lead text-primary">
//             Linkupss keeps your information secure with base 64 encoding in our database, and disallowing sensitive information to be kept on our website. Linkupss values information security as one of their top priorities and will do everything in their power to keep admins and participants's experience.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="col p-5 mb-4 bg-light rounded-3">
//         <div className="container-fluid py-5">
//           <span>
//             <h1>Testimonials from our clients</h1>
//           </span>
//           <div className="card"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
