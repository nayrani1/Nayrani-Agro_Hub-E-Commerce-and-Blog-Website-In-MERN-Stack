import React from "react";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { Col, Row } from "react-bootstrap";
import ContactInfo from "../../layouts/Features/ContactInfo";
import { MDBCard } from "mdb-react-ui-kit";
import SimpleMap from "../../layouts/Features/SimpleMap";

const ContactUsPage = () => {
  const contacts = [
    {
      location: "Chicago",
      address: "8500, Lorem Street, Chicago, IL, 55030",
      phone: "800 853 2538",
      email: "email@example.com",
      hours: "Mon – Thu: 10.00 am – 6.00 pm\nSat – Sun: 10.00 am – 5.00 pm",
    },
    {
      location: "Madrid",
      address: "Ronda de Valencia, 13, 60015 Madrid, Spain",
      phone: "800 853 2538",
      email: "email@example.com",
      hours: "Mon – Thu: 10.00 am – 6.00 pm\nSat – Sun: 10.00 am – 5.00 pm",
    },
    {
      location: "Melbourne",
      address: "123 6th St.Melbourne, Fl 32904",
      phone: "800 863 1229",
      email: "email@example.com",
      hours: "Mon – Thu: 10.00 am – 6.00 pm\nSat – Sun: 10.00 am – 5.00 pm",
    },
  ];
  return (
    <div>
      <Header />
      <Row className="contact-page-top m-0">
        <Col md={12}>
          <h1>Contact Us</h1>
          <br />
          <h5>Home / Contact</h5>
        </Col>
      </Row>
      <div>
        <div className="contact-list">
          {contacts.map((contact, index) => (
            <ContactInfo
              key={index}
              location={contact.location}
              address={contact.address}
              phone={contact.phone}
              email={contact.email}
              hours={contact.hours}
            />
          ))}
        </div>
      </div>
     <Row>
      <Col md={2} sm={1} sx={1}></Col>
      <Col md={8} sm={10} sx={10}>
         <MDBCard style={{border:"none", boxShadow:"0 0 8px #ababab", margin:"20px 0"}}>
        <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>
          We respect your privacy and do not tolerate spam and will never sell,
          rent, lease or give away your information. We are here to answer any
          questions you may have.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name *"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-Mail *"
              required
            />
          </div>
          <div className="form-group full-width">
            <textarea
              id="message"
              name="message"
              rows="2"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="form-group full-width">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
      </MDBCard>
      </Col>
      <Col md={2} sm={1} sx={1}></Col>
     </Row>
     {/*  */}
     <div>
     </div>
     <div>
      <SimpleMap/>
     </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
