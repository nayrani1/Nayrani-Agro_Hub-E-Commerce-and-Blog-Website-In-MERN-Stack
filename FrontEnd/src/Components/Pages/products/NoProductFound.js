import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import Title from "../../layouts/Features/CustonTitle";

const NoProductFound = () => {
  const navigate = useNavigate();
  return (
      <div>
        <Title title={"No Product Found"} />
        <div className="animation-container">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <Row>
              <Col>
                <div className="text-center">
                  <h1>No Product Found !</h1>
                  <p>Related to your search....</p>
                  <Button className="view-details" onClick={()=>navigate("/products")}>
                    Go Back
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
  );
};

export default NoProductFound;
