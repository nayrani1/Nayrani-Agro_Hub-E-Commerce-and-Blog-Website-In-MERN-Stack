import React from "react";
import "../css/footer.css";
import { Container, Row, Col } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="foot-wrapper">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <footer className="text-dark py-4">
        <Container style={{ color: "#d0d0d0"}}>
          <Row>
            <Col md={3}>
              <h5>Nayrani Agro Hub</h5>
              <p>Your go-to place for agriculture solutions.</p>
            </Col>
            <Col md={3}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/blogs">Blogs</a>
                </li>
                <li>
                  <a href="/community">Community</a>
                </li>
                <li>
                  <a href="/services">Services</a>
                </li>
                <li>
                  <a href="/help-center">Help Center</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Connect With Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com">
                    <FaIcons.FaFacebook /> &nbsp; Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com">
                    <FaIcons.FaTwitter /> &nbsp; Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com">
                    <FaIcons.FaInstagram /> &nbsp; Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com">
                    <FaIcons.FaLinkedin /> &nbsp; LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                    <FaIcons.FaGoogle /> &nbsp; Google
                  </a>
                </li>
                {/* Add more social media links as needed */}
              </ul>
            </Col>
            <Col md={3}>
              <h5>Contact Us</h5>
              <p>Email: info@nayraniagrohub.com</p>
              <p>Phone: +123 456 7890</p>
            </Col>
          </Row>
        </Container>
        <div className="footer-bottom text-center py-2">
          <Container>
            <p className="mb-0">
              © {currentYear} Nayrani Agro Hub. All Rights Reserved.
            </p>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
