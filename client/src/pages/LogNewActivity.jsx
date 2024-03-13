import { useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { QUERY_USER, QUERY_ME, GET_ACTIVITYTYPE, GET_CATEGORIES } from "../utils/queries";
import { ADD_ACTIVITY } from '../utils/mutations';
import { useQuery, useMutation } from "@apollo/client"; // Import gql from @apollo/client
import Auth from "../utils/auth";

export default function LogActivity() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES);

  const { loading: activityTypesLoading, data: activityTypesData } = useQuery(GET_ACTIVITYTYPE);

  const [addActivity, {error: addActivityError, data: addActivityData}] = useMutation(ADD_ACTIVITY);

  const [formData, setFormData] = useState({
    when: "",
    category: "",
    activity: "",
    duration: 0,
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Form submitted:", formData);
      const { data } = await addActivity({
        variables: {
          category: formData.category,
          activityType: formData.activity,
          duration: parseFloat(formData.duration),
          commentText: formData.comments
        }
      })
      // console.log(data);
    } catch (error) {
      
    }
    console.log("Form submitted:", formData);
  };

  if (Auth.loggedIn() && Auth.getUser().data.username === userParam) {
    return <Navigate to="/Dashboard" />;
  }

  if (loading || categoriesLoading || activityTypesLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="container-fluid w-75 my-5 text-center">
        <h4>You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>
      </div>
    );
  }

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
              type="date"
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
              <option value="">Choose...</option>
              {categoriesData &&
                categoriesData.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.catName}
                  </option>
                ))}
            </select>
          </div>

            <div className="mb-3">

              <label htmlFor="activity" className="form-label green-title">
                Select an activity
              </label>

              <label htmlFor="activity" className="form-label float-end">

                <Link to="/create-activity">
                  Create a new Activity
                </Link>

              </label>

            <select className="form-select" id="activity" name="activity" onChange={handleInputChange} value={formData.activity} required>
              {/* Map over activity types data to generate options */}
              {activityTypesData && activityTypesData.activityTypes.map(activityType => (
                <option key={activityType._id} value={activityType._id}>{activityType.actName}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              How long did you perform this activity (enter time in hours)?
            </label>
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              onChange={handleInputChange}
              value= {formData.duration}
              required
            />
          </div>

            <div className="mb-3">

              <label htmlFor="comments" className="form-label green-title">
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

            <button type="submit" className="btn btn-primary submit-btn mt-2">
              Log Activity
            </button>

          </form>

        </div>

      
    </>
  );
}
