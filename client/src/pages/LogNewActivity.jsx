import { useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { QUERY_USER, QUERY_ME, GET_ACTIVITYTYPE } from "../utils/queries";
import { useQuery } from "@apollo/client"; // Import gql from @apollo/client
import Auth from "../utils/auth";

export default function LogActivity() {
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
      <div className="container-fluid w-75 my-5 text-center">
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }

  // State to manage form data
  const [formData, setFormData] = useState({
    when: "",
    category: "",
    activity: "",
    duration: "",
    comments: "",
  });
  
  const { loading: activityTypesLoading, data: activityTypesData } = useQuery(GET_ACTIVITYTYPE);

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
    // Add logic to handle form submission (e.g., logging activity)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Log New Activity</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="when" className="form-label">
              When did you complete this activity?
            </label>
            <input
              type="text"
              className="form-control"
              id="when"
              name="when"
              onChange={handleInputChange}
              value={formData.when}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
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
              <option value="">Choose...</option>
              <option value="exercise">Exercise</option>
              <option value="work">Work</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="activity" className="form-label">Select an activity</label>
            <select className="form-select" id="activity" name="activity" onChange={handleInputChange} value={formData.activity} required>
              {/* Map over activity types data to generate options */}
              {activityTypesData && activityTypesData.activityTypes.map(activityType => (
                <option key={activityType.id} value={activityType.actName}>{activityType.actName}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              How long did you perform this activity (enter time in hours)?
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              onChange={handleInputChange}
              value={formData.duration}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Anything memorable about this activity?
            </label>
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              rows="4"
              onChange={handleInputChange}
              value={formData.comments}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Log Activity
          </button>
        </form>
      </div>
    </>
  );
}
