import React, { useEffect, useState } from "react";
import ImageSlider from "../../layouts/Sliders/ImageSlider";
import { Link, useLocation } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as Fa6Icons from "react-icons/fa6";
import { Col, Container, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Title from "../../layouts/Features/CustonTitle";
import Header from "../../layouts/main/Header";
import TestomonialSlider from "../../layouts/Sliders/TestomonialSlider";
import Footer from "../../layouts/main/Footer";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import axios from "axios";
import { MDBTypography } from "mdb-react-ui-kit";
import DOMPurify from "dompurify";
import FlipCard from "../../layouts/Features/FlipCards";
import Marque from "../../layouts/Features/Marquee";
import CardSlider from "../../layouts/Sliders/CardSlider"

const HomePage = () => {
  const toastSuccess = (success) => toast.success(success);
  const [recentBlogs, setRecentBlogs] = useState("");
  const location = useLocation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when the section comes into view
    rootMargin: "-50px 0px", // Adjust this based on when you want the animation to start
  });
  // display message
  const { message } = useSelector((state) => state.forgotPassword);
  if (message) {
    toastSuccess(message);
  }

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const api = `http://localhost:8080/api/v1/recent/blog`;
        const { data } = await axios.get(api, { withCredentials: true });
        setRecentBlogs(data.recentBlog);
      } catch (error) {
        toast.error("Error fetching recent blogs: " + error.message);
      }
    };
    fetchRecentBlogs();
  }, []);

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <>
      <Title
        title={`${
          location.pathname === "/" ? "Home" : location.pathname
        } - Your go-to place for agriculture solutions At`}
      />
      <Header />
      <ToastContainer position="top-left" autoClose={10000} theme="colored" />
      <div className="line"></div>
      <ImageSlider />
      <div className="Container-h">
        {/* section start */}
        <div className="news-section">
          <div className="news-top mb-2">
            <Col md={5} sm={6} xs={12}>
              <MDBTypography
                tag="h1"
                className="fw-bold  text-black"
                style={{ textShadow: "1px 1px 0px #ffbd59" }}
              >
                Latest Blogs
              </MDBTypography>
            </Col>
            <Col md={7} sm={6} xs={12}>
              <MDBTypography tag="p" className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                laboriosam praesentium mollitia odio adipisci dignissimos
                incidunt temporibus placeat unde ratione, minima maiores ad
                veniam magnam, vero perspiciatis iure nesciunt quis!
              </MDBTypography>
            </Col>
          </div>
          <div className="news-main">
            {recentBlogs &&
              recentBlogs.map((blog, index) => (
                <Col md={4} sm={12} xs={12} className="mb-4" key={index}>
                  <div className="news-card">
                    <div className="news-img">
                      <img src={blog.image.url} alt={blog.name} />
                    </div>
                    <div className="blog-card-content">
                      <p style={{ color: "#292d30" }}>
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                        }).format(new Date(blog.createdAt))}{" "}
                        {new Date(blog.createdAt).getDate()} | by{" "}
                        {blog.user.name} | {blog.comments.length}{" "}
                        <Fa6Icons.FaRegMessage />
                      </p>
                      <h6>
                        <Link
                          to={`/blogs/read/${blog._id}`}
                          className="blog-title"
                        >
                          {blog.title}
                        </Link>
                      </h6>
                      <div>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            blog.shortDescription
                          )}
                        />
                      </div>
                      <Link
                        to={`/blogs/read/${blog._id}`}
                        className="blog-read-more"
                      >
                        Read More &#x2192;
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
          </div>
        </div>
        {/* section end */}

        {/* section start */}
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
        {/* section end */}

        {/* section start */}
        <div className="m-0 p-0">
          <MDBTypography
                tag="h1"
                className="fw-bold  text-center mb-4"
                style={{ textShadow: "1px 1px 0px #ffbd59" }}
              >
               Our Latest Products
              </MDBTypography>
            <CardSlider />
        </div>
        {/* section end */}

        {/* section start */}
        <Container className="section-2">
          <Row>
            <Col md={6} className="left-part">
              <div className="sec2-item1">
                <img
                  className="img1"
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1704450332/AgroHub/SiteAssets/9f6b9a7caef6d5bd367e5b1ad1297283_lniujb.jpg"
                  alt=""
                />
                <img
                  className="img2"
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1704450331/AgroHub/SiteAssets/da085bd6e9418897239f27f4e450d6ed_tidgcf.jpg"
                  alt=""
                />
              </div>
            </Col>
            <Col md={6} className="right-part">
              <div className="upper-right-part">
                <div className="sec2-item2-top">
                  <h1>Why Choose Us?</h1>
                  <p>
                    Quo cibo eius cu, mel at magna quaeque apeirian, augue
                    homero consectetuer in nam. Eu quo laoreet propriae, malis
                    exerci habemus te has, vocent persius eum ea.
                  </p>
                </div>
              </div>
              <div className="lower-right-part">
                <div className="icon">
                  <RiIcons.RiServiceFill className="sec2-icon" />
                  <h3>Excellent Service</h3>
                  <p>
                    Mei in delenit denique disen tiunt, ne quodsi repudiare duo
                    terg frame.
                  </p>
                </div>
                <div className="icon">
                  <GiIcons.GiTreeBranch className="sec2-icon" />
                  <h3>Reliability</h3>
                  <p>
                    Mei in delenit denique disen tiunt, ne quodsi repudiare duo
                    terg frame.
                  </p>
                </div>
                <div className="icon">
                  <GiIcons.GiFarmTractor className="sec2-icon" />
                  <h3>Clean Working</h3>
                  <p>
                    Mei in delenit denique disen tiunt, ne quodsi repudiare duo
                    terg frame.
                  </p>
                </div>
                <div className="icon">
                  <GiIcons.GiFarmer className="sec2-icon" />
                  <h3>Expert Farmer</h3>
                  <p>
                    Mei in delenit denique disen tiunt, ne quodsi repudiare duo
                    terg frame.
                  </p>
                </div>
              </div>
              {/* Get In Touch Button */}
              <button className="glow-on-hover" type="button">
                Get in Touch
              </button>
            </Col>
          </Row>
        </Container>
        {/* section end */}
        {/* section start*/}
        <div className="section-3">
          <Col className="sec3-item1">
            <h1>Our Main Services</h1>
            <p>
              Id eos reprimique omittantur, ipsum definiebas per no. Nibh
              necessitatibus vim cu.
            </p>
            <p>
              <span>
                His accommodare delicatissimi cu, novum simul nominavi ut mea.Et
                cum deseruisse definitionem, cu mel cetero dolores. Usu habeo
                maluisset constituto id. Eam no summo euismod suavitate, amet
                iusto posidonium eos ex.
              </span>
            </p>
            <a href="/" style={{ textDecoration: "none", color: "#b2b74a" }}>
              Read More
            </a>{" "}
            <span className="arrow">&#8594;</span>
          </Col>
          <div className="sec3-item2">
            <div className="sec3-item2-data">
              <div>
                <TbIcons.TbPlant2 className="icons" />
              </div>
              <div>
                <p>Growing Fruits and Vegetables</p>
              </div>
            </div>
            <div className="sec3-item2-data">
              <div>
                <GiIcons.GiPlantSeed className="icons" />
              </div>
              <div>
                <p> Designing & planting Trees And Fruits </p>
              </div>
            </div>
            <div className="sec3-item2-data">
              <div>
                <BsIcons.BsMinecartLoaded className="icons" />
              </div>
              <div>
                <p>Spring & Fall Cleanup</p>
              </div>
            </div>
            <div className="sec3-item2-data">
              <div>
                <GiIcons.GiFruitBowl className="icons" />
              </div>
              <div>
                <p> Best Products in the City </p>
              </div>
            </div>
            <div className="sec3-item2-data">
              <div>
                <Fa6Icons.FaCloudRain className="icons" />
              </div>
              <div>
                <p>Clear Water for Irrigation</p>
              </div>
            </div>
            <div className="sec3-item2-data">
              <div>
                <GiIcons.GiHealthPotion className="icons" />
              </div>
              <div>
                <p>ECO Friendly Cultivation</p>
              </div>
            </div>
          </div>
        </div>
        <TestomonialSlider />
        {/* section end */}
        {/* section start*/}
        <Row className="section-5 mt-4" ref={ref}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={12} md={6} lg={3} className="col-canvas">
              <div className={`cnavas-wraper ${inView ? "pie-wrap" : ""}`}>
                <div className="wraped-number">
                  {index === 0 && <h3>45</h3>}
                  {index === 1 && <h3>150+</h3>}
                  {index === 2 && <h3>53</h3>}
                  {index === 3 && <h3>17</h3>}
                </div>
              </div>
              <div className="sec5-text">
                {index === 0 && <h3>Awards Won</h3>}
                {index === 1 && <h3>Regular Customers</h3>}
                {index === 2 && <h3>Points of Sales</h3>}
                {index === 3 && <h3>Completed Projects</h3>}
                <p>Cu ubique timeam tibique mel, autem tibique cu nec.</p>
              </div>
            </Col>
          ))}
        </Row>
        {/* section end */}
        {/* section start */}
       <Marque/>
        {/* section end */}
        {/* section start */}
        <div className="section-6 d-flex justify-content-center">
          <div className="subscribe-sec mt-4">
            <h2>Subscribe for Newsletter</h2>
            <form className="subscribe-form">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <br />
              <div className="buttons">
                <button type="submit" className="btn btn-warning mt-4 ">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* section end */}
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
