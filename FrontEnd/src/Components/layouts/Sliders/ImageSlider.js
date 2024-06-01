import {Carousel } from "react-bootstrap";
import "../css/Slider.css";
import slideData from "./SliderData";
import React, { Fragment, useEffect, useState } from "react";

const ImageSlider = () => {
  const [currentState, setcurrentState] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === 2) {
        setcurrentState(0);
      } else {
        setcurrentState(currentState + 1);
      }
    }, [10000]);
    return () => clearTimeout(timer);
  }, [currentState]);
  const bgImageStyle = {
    backgroundImage: `url(${slideData[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
  };
  const toNext = (currentState) => {
    setcurrentState(currentState);
  };
  const slideUrl = [
    {
      url: "https://res.cloudinary.com/djljb8aby/image/upload/v1705983697/AgroHub/SiteAssets/ImageSlide3_wviygm.jpg"
    },
    {
      url: "https://res.cloudinary.com/djljb8aby/image/upload/v1705983695/AgroHub/SiteAssets/slideshow_zfzhvj.jpg"
    },
    {
      url: "https://res.cloudinary.com/djljb8aby/image/upload/v1705983704/AgroHub/SiteAssets/ImageSlide4_qob3wf.jpg"
    }
  ]
  return (
    <Fragment>
      <div className="container-style">
        <div className="background-color">
          <div style={bgImageStyle}>
            <div className="Description">
              <section className="section">
                <div className="content">
                  <h2>{slideData[currentState].title}</h2>
                  <h2>{slideData[currentState].title}</h2>
                </div>
              </section>
              <br />
              <br />
              <br />
              <p style={{padding:"0 50px", color:"white", textShadow: "1px 1px 0px #ffbd59" }}>{slideData[currentState].content}</p>
            </div>
            <br />
            <div className="carouserl-bulit">
              {slideData.map((slideData, currentState) => (
                <span
                  key={currentState}
                  onClick={() => toNext(currentState)}
                ></span>
              ))}
            </div>
            <br />
            <div className="slider-btn">
              <div>
                <button className="btn1">{slideData[currentState].btn1}</button>
              </div>
              <div>
                <button className="btn2">{slideData[currentState].btn2}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slider-mobile">
        <Carousel>
          <Carousel.Item>
            <div>
              <img src={slideUrl[0].url} alt=""/>
            </div>
            <Carousel.Caption>
              <h2>{slideData[0].title}</h2>
              <p style={{padding:"0 10px", color:"white", textShadow: "1px 1px 0px #ffbd59" }}>
              The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways." - John F. Kennedy                </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div>
              <img src={slideUrl[1].url} alt=""/>
            </div>
            <Carousel.Caption>
              <h2>{slideData[2].title}</h2>
              <p style={{padding:"0 10px", color:"white", textShadow: "1px 1px 0px #ffbd59" }}>
              Your go-to place for agriculture solutions and organic products, We Offer Best And 100% Pure Organic Products
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div>
              <img src={slideUrl[2].url} alt="" />
            </div>
            <Carousel.Caption>
              <h2>{slideData[1].title}</h2>
              <p style={{padding:"0 10px", color:"white", textShadow: "1px 1px 0px #ffbd59" }}>With a focus on innovation, sustainability, and collaboration, we offer a comprehensive range of services, products, and resources designed to support every stage of the agricultural journey..</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Fragment>
  );
};

export default ImageSlider;
