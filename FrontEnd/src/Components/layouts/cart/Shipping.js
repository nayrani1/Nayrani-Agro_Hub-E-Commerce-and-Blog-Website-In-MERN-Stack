import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../Redux/Actions/cartAction";
import { ToastContainer, toast } from "react-toastify";


const ShippingInfo = () => {
    const toastSuccess=(message)=> toast.success(message)
    const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [name, setName] = useState(shippingInfo.name);
  const [email, setEmail] = useState(shippingInfo.email);
  const [address, setAddress] = useState(shippingInfo.address);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const [country, setCountry] = useState(shippingInfo.country);
  const [city, setCity] = useState(shippingInfo.city);
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({name, email, address, phone, country, city, zipCode}));
    toastSuccess("Shipping info saved Successfully!")
    window.location.href = "/cart"
  };
  return (
    <div style={{fontFamily:"serif", background:"#d0d0d0"}}>
        <ToastContainer
          position="top-left"
            autoClose={10000}
            theme="colored"
            closeOnClick={false}
          />
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} sm={10} xs={11}>
            <Form className="shipping-info-form" onSubmit={handleSubmit}>
            <h1 className="text-center mt-1 mb-1">Shipping Address</h1>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Your Address"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <CountryDropdown
                  id="country"
                  name="country"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  className="CountryDropdown"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter Your City"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="00000"
                  style={{boxShadow: "inset 0 0 0 1px #ffc107"}}

                />
              </Form.Group>
              <button type="submit" className="btn btn-warning mt-3" style={{width:"100%"}}>
                Save & Continue
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShippingInfo;
