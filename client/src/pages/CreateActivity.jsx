import React, { useState } from 'react';

export default function CreateActivity() {
  // State to manage form data
  const [formData, setFormData] = useState({
    category: '',
    activityName: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., create new activity)
    console.log('Form submitted:', formData);
    // Reset form data after submission
    setFormData({
      category: '',
      activityName: '',
    });
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Create New Activity</h2>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="w-50">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Select a category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
                required
              >
                {/* Add options for categories */}
                <option value="">Choose...</option>
                <option value="exercise">Exercise</option>
                <option value="work">Work</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="activityName" className="form-label">Enter the name of the new activity</label>
              <input
                type="text"
                className="form-control"
                id="activityName"
                name="activityName"
                onChange={handleInputChange}
                value={formData.activityName}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
