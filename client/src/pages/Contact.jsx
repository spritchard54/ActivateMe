import React, { useState } from "react";

export default function Contact(){
  // Define state to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
  
  return(
    <main className="flex-row justify-center my-5">
      <div className={`col-6 col-lg-5 mx-auto my-4 ${formSubmitted ? 'd-none' : ''}`}> 
        <div className="card mt-5 mb-3 sub-form d-flex">
          <h4 className="text-light p-2 mt-3 text-center">Contact Us</h4>
          <div className="card-body pb-4">
            <form onSubmit={handleSubmit}>
              <div className='form-box p-3'>
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
                <label htmlFor="loginInput" className='form-label login-input'>
                  Email
                </label>
                <input
                  className="form-input border d-block mb-3 p-2"
                  placeholder="email@example.com"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="loginInput" className='form-label login-input'>Message</label>
                <textarea
                  className="form-input border d-block mb-3 p-2"
                  placeholder="Enter your message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                className="btn btn-block d-block mx-auto mt-3 submit-btn"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {formSubmitted && (
        <div className="col-6 col-lg-5 mx-auto my-4">
          <div className="alert alert-success">
          <p>Thank you for reaching out, {formData.name}!</p>
          <p>We will get back to you as soon as possible.</p>
          </div>
        </div>
      )}
    </main> 
  );
}