import React from 'react';
import { FaLocationDot } from "react-icons/fa6";


const ContactInfo = ({ location, address, phone, email, hours }) => {
    return (
        <div className="contact-info">
            <h2><FaLocationDot style={{color:"#a2c823"}}/> {location}</h2>
            <p><strong>Address:</strong><br />{address}</p>
            <p><strong>Phone:</strong><br />{phone}</p>
            <p><strong>Email:</strong><br /><a href={`mailto:${email}`}>{email}</a></p>
            <p><strong>Opening Hours:</strong><br />{hours}</p>
        </div>
    );
}

export default ContactInfo;
