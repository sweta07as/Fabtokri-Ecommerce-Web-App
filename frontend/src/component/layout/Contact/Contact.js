import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactBody">
      <h1>Contact Us</h1>
      <hr></hr>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mbjvrbbg"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              name="username"
              placeholder="Name"
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <input
              type="mobile"
              name="Mobile"
              placeholder="Mobile number"
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              cols="30"
              rows="6"
              placeholder="Write your message"
              autoComplete="off"
              required
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;