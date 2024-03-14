import React, { useState, Component } from "react";
import { Navigate } from 'react-router-dom';
import background from '../assets/images/contactUsPage.jpg';

// Styling for pop-up
const styles = {
  alert: {
    position: "relative",
  },
  // location of the "X" in pop-up
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: "0.5rem 0.75rem",
  },
};

export default function Contact() {
  // Define state to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Define the route after submitting form
  const [redirectTo, setRedirectTo] = useState(null);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Return form data after submitting
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setFormSubmitted(true);
  };

  // Redirect user to the Dashboard after closing pop-up confirmation
  const handleClose = () => {
    setRedirectTo("/Dashboard")
  };

  return (
    <main id='contact-img' className="pt-2">
      <div className={`col-6 col-lg-5 mx-auto my-4 ${formSubmitted ? 'd-none' : ''}`}>
        <div className="container mt-5 sub-form d-flex p-3">
          <div className="card-body">

            <form onSubmit={handleSubmit}>
              <div className='form-box p-3'>
                <h2 className="text-white mb-2">
                  Contact Us
                </h2>
                <label htmlFor="loginInput" className='form-label login-input'>
                  Name
                </label>
                <input
                  className="form-input border mb-3 p-2"
                  placeholder="Enter your name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="loginInput" className='form-label login-input'>Email Address</label>
                <input
                  className="form-input border d-block mb-3 p-2"
                  placeholder="email@example.com"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="loginInput" className='form-label login-input'>How can we help?</label>
                <textarea
                  className="form-input border d-block mb-3 p-2"
                  placeholder="Enter your message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button
                  className="btn btn-primary submit-btn mt-2"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>

              </div>



            </form>
          </div>
        </div>
      </div>
      <div>
        {formSubmitted && (
          <div className="col-sm-4 mx-auto my-4">
            <div style={styles.alert} className="alert alert-success alert-dismissible fade-in">
              <a href="#" style={styles.close} className="close" onClick={handleClose} aria-label="close">&times;</a>
              <h4 className="alert-heading">Thank you, {formData.name}!</h4>
              <p>We will get back you as soon as possible.</p>
            </div>
          </div>
        )}
        {redirectTo && <Navigate to="/Dashboard" />}
      </div>
    </main>
  );
}