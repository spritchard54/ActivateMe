import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from "../utils/queries"
import Auth from '../utils/auth';

export default function CreateActivity() {

  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data.username === userParam) {
    return <Navigate to="/Dashboard" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (

      <div className='container-fluid w-75 my-5 text-center'>

        <h4>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h4>

      </div>

    );
  }


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
      <div className="container my-5 w-50 d-flex align-items-center" id='new-activity-box'>

        <div className="container sub-form p-5">

          <h2 className="mb-4">
            Create New Activity
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label htmlFor="category" className="form-label green-title">
                Select a category
              </label>

              <select
                className="form-select"
                id="category"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
                required
              >

                {/* Add options for categories */}
                <option value="">
                  Choose...
                </option>

                <option value="exercise">
                  Exercise
                </option>

                <option value="work">
                  Work
                </option>

                {/* Add more options as needed */}

              </select>

            </div>

            <div className="mb-3">

              <label htmlFor="activityName" className="form-label green-title">
                Enter the name of the new activity
              </label>

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

            <button type="submit" className="btn btn-primary submit-btn mt-2">
              Create
            </button>

          </form>

        </div>
      </div>
    </>
  );
}
