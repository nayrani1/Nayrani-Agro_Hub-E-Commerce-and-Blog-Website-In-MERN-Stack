import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { MDBTypography } from "mdb-react-ui-kit";
import PricingPlan from "../../layouts/Features/PricingPlan";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import Marque from "../../layouts/Features/Marquee";

const Services = () => {
  const plans = [
    {
      title: "Standard Plan",
      price: "65.99",
      features: [
        "Install a Patio or Pathway",
        "Install Landscaping",
        "Waterproof a Deck Costs",
        "Remove a Tree Stump",
      ],
    },
    {
      title: "Gold Plan",
      price: "105.99",
      features: [
        "Install Landscaping",
        "Remove a Tree Stump",
        "Waterproof a Deck Costs",
        "Waterproof a Deck Costs",
      ],
    },
    {
      title: "Silver Plan",
      price: "85.99",
      features: [
        "Waterproof a Deck Costs",
        "Install a Patio or Pathway",
        "Remove a Tree Stump",
        "Install Landscaping",
      ],
    },
  ];
  return (
    <div>
      <Header />
      <Row className="services-page-top m-0">
        <Col md={12}>
          <h1>Services</h1>
          <br />
          <h5>Home / Services</h5>
        </Col>
      </Row>
      {/* section 1 */}
      <div className="services-page-section-1">
        <Row className="s-s1-top">
          <Col md={5} sm={6} xs={12}>
            <MDBTypography
              tag="h1"
              className="fw-bold text-center"
              style={{ textShadow: "1px 1px 0px #00e476" }}
            >
              What We Offer?
            </MDBTypography>
          </Col>
          <Col md={7} sm={6} xs={12}>
            <MDBTypography tag="p" style={{ color: "#ababab" }}>
              An qualisque constituam cum. Agam unum disputando ius et, mel id
              postea volu ptua, et vel assum graece feugait.
            </MDBTypography>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716842913/AgroHub/SiteAssets/cooking-delicious-food_luzxph.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Growing Fruits and Vegetables{" "}
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    Eos ex habeo assum civibus, odio ex. Sed utinam tamquam cu,
                    his purto cot idieque ei, te zril populo ius essentially
                    unchanged.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716843230/AgroHub/SiteAssets/95_womyth.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Design & Planting
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    Sed ne paulo mnesarchum, habeo bon novum utroque. Ex sed
                    veritus albucius comprehensam, cu dicam eum sheets
                    containing.{" "}
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716843245/AgroHub/SiteAssets/aerial-shot-aerial-view-agriculture_jthwhr.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Spring & Fall Cleanup
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    No utinam dolore vel, ut pro purtontiae voluptatum, utinam
                    philosophia ad quo. Ius ei saepe fierent principesris web
                    page.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716843946/AgroHub/SiteAssets/alone-background-basket_pwfnzp.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Best Products{" "}
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    Id quo meis inermis recteque. Sua partem pertinax pri ad,
                    agam scriptorem te vix, eu vidisse volumus pro semper
                    sapien.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716843942/AgroHub/SiteAssets/peter-gonzalez_sb1xgr.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Clear Water for Irrigation
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    Eu modo labore dolorum duo, ludus intellegam ad, nemore
                    persius mei an. Pri no tota probatus, an duis movet rhoncus
                    dui lectus.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <div className="news-card">
              <div className="news-img">
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1716843962/AgroHub/SiteAssets/blur-bright-dew_hxygri.jpg"
                  alt=""
                />
              </div>
              <div className="blog-card-content">
                <h4 className="text-center mt-4" style={{ color: "white" }}>
                  Eco Product
                </h4>
                <div>
                  <p className="text-center mt-2" style={{ color: "#ababab" }}>
                    Quo inani ornatus ut, assum melius, mel no dicam munere.
                    Probo scripta qui in. No tempor contentiones pro finibus
                    nec.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* section 2  */}
      <div className="services-page-section-2">
        <Row className="s-s2-top">
          <Col md={5} sm={6} xs={12}>
            <MDBTypography tag="h1" className="fw-bold text-black">
              Why Choose Us?
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
          <Col md={3} sm={6} xs={12} style={{ padding: "10px" }}>
            <div className="s-s2-b-left">
              <img
                src="https://res.cloudinary.com/djljb8aby/image/upload/v1716845908/AgroHub/SiteAssets/icon_01_aicyew.png"
                width={50}
                height={55}
                alt=""
              />
              <h4 style={{ textAlign: "right", marginTop: "5px" }}>
                Excellent Service
              </h4>
              <p className="mb-4" style={{ textAlign: "right" }}>
                Mei in delenit denique disen tiunt, ne quodsi repudiare duo terg
                frame.
              </p>
            </div>
            <br />
            <br />
            <br />
            <div className="s-s2-b-left mt-4">
              <img
                src="https://res.cloudinary.com/djljb8aby/image/upload/v1716845899/AgroHub/SiteAssets/icon_02_ima1pv.png"
                width={50}
                height={55}
                alt=""
              />
              <h4 style={{ textAlign: "right", marginTop: "5px" }}>
                Quality And Reliability
              </h4>
              <p style={{ textAlign: "right" }}>
                An qualisque constituam cum. Agam unum disputando ius et, mel id
                luptua.
              </p>
            </div>
          </Col>
          <Col md={6} sm={6} xs={12}>
            <img src="https://res.cloudinary.com/djljb8aby/image/upload/v1716847130/AgroHub/SiteAssets/why-choose-us_mj1fkp.png" alt=""/>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <div className="s-s2-b-right mb-4">
              <img
                src="https://res.cloudinary.com/djljb8aby/image/upload/v1716845896/AgroHub/SiteAssets/icon_03_pfbp7k.png"
                width={50}
                height={55}
                alt=""
              />
              <h4 style={{ marginTop: "5px" }}>Clean Working</h4>
              <p className="mb-4">
                Ex voluptaria intellegebat usu, mea ut discere perciitur aperiri
                cotidiequ.
              </p>
            </div>
            <br />
            <br />
            <br />
            <div className="s-s2-b-right mt-4">
              <img
                src="https://res.cloudinary.com/djljb8aby/image/upload/v1716845892/AgroHub/SiteAssets/icon_04_o16p0j.png"
                width={50}
                height={55}
                alt=""
              />
              <h4 style={{ marginTop: "5px" }}>Expert Farmer</h4>
              <p>
                Id quidam detraxit erroribus eam, qui aliquip patrioque
                accommodare ex.
              </p>
            </div>
          </Col>
        </Row>
      </div>
      {/* section 3 */}
      <div className="services-page-section-3">
        <Row className="s-s1-top">
          <Col md={6} sm={6} xs={12}>
            <MDBTypography tag="h1" className="fw-bold text-center">
              How We Work?
            </MDBTypography>
          </Col>
          <Col md={7} sm={8} xs={12}>
            <MDBTypography tag="p" style={{ color: "#ababab" }}>
              Quo cibo eius cu, mel at magna quaeque apeirian, augue homero
              consectetuer in nam. Eu quo laoreet propriae, malis exerci habemus
              te has, vocent persius ea.
            </MDBTypography>
          </Col>
        </Row>
        <div className="process-steps">
          <div className="step">
            <div className="services-icon contact"></div>
            <h5>01. Contact Us</h5>
            <p>Cu ubique timeam tibique mel, autem tibique cu nec.</p>
          </div>
          <div className="step">
            <div className="services-icon order"></div>
            <h5>02. Place an Order</h5>
            <p>Aperiri discere hendrerit in duo, amet reprehendunt ut sit.</p>
          </div>
          <div className="step">
            <div className="services-icon payment"></div>
            <h5>03. Make a Payment</h5>
            <p>Enim meliore intellegebat ut duo, fastidii gloriatur usu ei.</p>
          </div>
          <div className="step">
            <div className="services-icon receive"></div>
            <h5>04. Receive an Order</h5>
            <p>Legere prodesset mea ei, no illud dicam conclusionemque est.</p>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="pricing-plans">
        <h1>Pricing & Plans</h1>
        <p className="description">
          His accommodare delicatissimi cu, novum simul nominavi ut mea. Et cum
          deserunt definitionem, cu mel cetero dolores. Usu habeo maluisset
          constituo id.
        </p>
        <div className="plans">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </div>
      {/* section 5 */}
      <Marque/>
      <ScrollToTopButton/>
      <Footer />
    </div>
  );
};

export default Services;
