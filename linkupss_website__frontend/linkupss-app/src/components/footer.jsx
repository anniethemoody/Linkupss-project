import React from "react";

import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./footerStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container container spacing = {2}>
        <Row>
          <Column item xs = {6}>
            <Heading style={{color:"rgb(41,91,248)", alignItems:"center"}}>Linkupss</Heading>
            <p>Linkupss is here to bring innovations that are simple,easy-to-use for the public. What started as an engineering project, has expanded to something a lot more meaningful</p>
          </Column>
          <Column item xs = {3}>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">info@linkupss.org</FooterLink>
            <FooterLink href="#">(+1)123-456-7890</FooterLink>
          </Column>
          <Column item xs = {3}>
            <Heading>Follow Us On</Heading>
            <FooterLink href="#">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
            </FooterLink>
            <FooterLink href="#">
                <span style={{ marginLeft: "10px" }}>
                  Github
                </span>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <hr />
      <div className='text-center text-dark'>
        © 2023 Copyright
      </div>
      </Box>
  );
};
export default Footer;