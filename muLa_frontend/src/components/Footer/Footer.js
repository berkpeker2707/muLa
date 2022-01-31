import React from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../../App.css";
import { FaGooglePlay, FaAppStoreIos, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="FooterComponent">
      <hr />
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="FooterIconCol" sm={12} md={6} lg={2}>
            <Link to={{ pathname: "https://tr-tr.facebook.com/" }} target="_blank" >
              <FaFacebook style={{ fontSize: "24px" }} /> Facebook
            </Link>
          </Col>
          <Col className="FooterIconCol" sm={12} md={6} lg={2}>
            <Link to={{ pathname: "https://www.instagram.com/accounts/login/?hl=tr" }} target="_blank" >
              <FaInstagram style={{ fontSize: "24px" }} /> Instagram
            </Link>
          </Col>
          <Col className="FooterIconCol" sm={12} md={2} lg={2}>
            <Link to={"#"}>
            <FaEnvelope style={{ fontSize: "24px" }} />  contact@gmail.com
            </Link>
            </Col>
        </Row>
      </Container>
      <hr />
      <Container fluid>
        <Row className="FooterLinks justify-content-center">
          <Col className="FooterLinkCol" sm={12} md={6} lg={2}>
            <Link to={"/faq"}>F.A.Q.</Link>
          </Col>

          <Col className="FooterLinkCol" sm={12} md={6} lg={2}>
            <Link to={"/"}>Terms of Usage</Link>
          </Col>

          <Col className="FooterLinkCol" sm={12} md={6} lg={2}>
            <Link to={"/"}>Our Cookie Policy</Link>
          </Col>

          <Col className="FooterLinkCol" sm={12} md={6} lg={2}>
            <Link to={"/"}>Our Privacy Policy</Link>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Row className="FooterIcons justify-content-md-center">
          <Col className="FooterIconCol" sm={12} md={6} lg={3}><Link to={"/"}><FaGooglePlay style={{ fontSize: "24px" }} /> Google Play</Link></Col>
          <Col className="FooterIconCol" sm={12} md={6} lg={3}><Link to={"/"}><FaAppStoreIos style={{ fontSize: "24px" }} /> App Store</Link></Col>
        </Row>
      </Container>
    </div >
  );
}
