import { MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Footer from "../../layouts/main/Footer";
import Header from "../../layouts/main/Header";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import { useInView } from "react-intersection-observer";
import ProgressItem from "../../layouts/Features/ProgressItem";
import FlipCard from "../../layouts/Features/FlipCards";
import TestomonialSlider from "../../layouts/Sliders/TestomonialSlider";
import Marque from "../../layouts/Features/Marquee";

const AboutUsPage = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  return (
    <div>
      <Header />
      <Row className="about-page-top m-0">
        <Col md={12}>
          <h1>About</h1>
          <br />
          <h5>Home / About</h5>
        </Col>
      </Row>
      {/* section 1*/}
      <div className="about-page-section-1">
        <Row className="s-s2-top">
          <Col md={5} sm={6} xs={12}>
            <MDBTypography
              tag="h1"
              className="fw-bold text-black"
              style={{ textShadow: "1px 1px 2px #00bf63" }}
            >
              Our Best Team
            </MDBTypography>
          </Col>
          <Col md={7} sm={8} xs={12}>
            <MDBTypography tag="p" style={{ color: "#8a8a8a" }}>
              An qualisque constituam cum. Agam unum disputando ius et, mel id
              postea volu ptua, et vel assum graece feugait.
            </MDBTypography>
          </Col>
        </Row>
        <Row className="a-s-1-b-card-container">
          <Col md={2} sm={4} xs={12}>
            <div className="a-s-1-t-card">
              <div class="zoom-container">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716853529/AgroHub/SiteAssets/BOB_ypbpkn.jpg"
                  alt=""
                />
              </div>
              <h5>Jason Fiord</h5>
              <p>Founder/ Farme</p>
            </div>
          </Col>
          <Col md={2} sm={4} xs={12}>
            <div className="a-s-1-t-card">
              <div class="zoom-container">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716854836/AgroHub/SiteAssets/_fef0a692-a5ff-4c14-b6f0-af66595d65ab_qa7t8i.jpg"
                  alt=""
                />
              </div>
              <h5>Artur Sunday</h5>
              <p>Mechanic</p>
            </div>
          </Col>
          <Col md={2} sm={4} xs={12}>
            <div className="a-s-1-t-card">
              <div class="zoom-container">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716855021/AgroHub/SiteAssets/_2612640c-a0ae-43f0-9bd6-0b25da576628_ubmvpn.jpg"
                  alt=""
                />
              </div>
              <h5>Lusi Jackson</h5>
              <p>Milking Operator</p>
            </div>
          </Col>
          <Col md={2} sm={4} xs={12}>
            <div className="a-s-1-t-card">
              <div class="zoom-container">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716856508/AgroHub/SiteAssets/_fc8a3d1c-b01c-4efe-8f26-f304d9cccf58_jrwmgs.jpg"
                  alt=""
                />
              </div>
              <h5>John Stone</h5>
              <p>LiveStock Breeder</p>
            </div>
          </Col>
          <Col md={2} sm={4} xs={12}>
            <div className="a-s-1-t-card">
              <div class="zoom-container">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716856540/AgroHub/SiteAssets/_e6cf3404-e6e0-4972-b655-39ce62bde569_emp1it.jpg"
                  alt=""
                />
              </div>
              <h5>Donald Banjamin</h5>
              <p>Poultry House</p>
            </div>
          </Col>
        </Row>
      </div>
      <TestomonialSlider />
      {/* section 2 */}
      <Row>
        <Col md={6} sm={10} xs={12}>
          <div className="experience" ref={ref}>
            <h2 className="mb-4" style={{ textShadow: "1px 1px 2px #00bf63" }}>
              Our Experience
            </h2>
            <p className="mb-4 mt-4">
              Quo cibo eius cu, mel at magna quaeque apeirian, augue homero
              consectetuer in nam. Eu quo laoreet propriae, malis exerci habemus
              te has, vocent persius eum ea.
            </p>
            <br />
            <br />
            <br />
            {inView && (
              <div className="progress-container mt-4">
                <ProgressItem label="Product Purity" target={98} />
                <ProgressItem label="Farmers Competence" target={89} />
                <ProgressItem label="Equipment" target={90} />
                <ProgressItem label="Satisfied Customers" target={99} />
              </div>
            )}
            <button className="get-in-touch">GET IN TOUCH</button>
          </div>
        </Col>
        <Col md={6} sm={10} xs={12}>
          <div className="a-s2-img">
            <img
              src="https://res.cloudinary.com/djljb8aby/image/upload/v1716894517/AgroHub/SiteAssets/about_img_01_ubk8cu.png"
              alt=""
            />
          </div>
        </Col>
      </Row>
      {/*section 3 */}
      <div>
        <Row className="sec-3-top">
          <Col md={7} sm={6} xs={12}>
            <MDBTypography
              tag="h1"
              className="fw-bold text-black"
              style={{ textShadow: "1px 1px 2px #00bf63" }}
            >
              Innovation in Agriculture
            </MDBTypography>
          </Col>
          <Col md={7} sm={8} xs={12}>
            <MDBTypography tag="p" style={{ color: "#8a8a8a" }}>
              An qualisque constituam cum. Agam unum disputando ius et, mel id
              postea volu ptua, et vel assum graece feugait.
            </MDBTypography>
          </Col>
        </Row>
        <Row>
          <FlipCard />
        </Row>
      </div>
      {/* section 4 */}
      <div>
        <Marque/>
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutUsPage;
