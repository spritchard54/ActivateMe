import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME, GET_CATEGORIES } from "../utils/queries";
import { ADD_ACTIVITYTYPE } from '../utils/mutations';
import Auth from '../utils/auth';

export default function CreateActivityType() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours

  const { loading: categoriesLoading, data: categoriesData } =
    useQuery(GET_CATEGORIES);

  const [addActivityType, { error: addActivityTypeError, data: addActivityTypeData }] =
    useMutation(ADD_ACTIVITYTYPE);

    const [formData, setFormData] = useState({
      category: "",
      actName: ""
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
        const { data } = await addActivityType({
          variables: {
            category: formData.category,
            actName: formData.actName,
            user: Auth.getUser().data._id,
          },
        });
        console.log(data);
      } catch (error) {}
      window.location.assign("/log-activity");
      console.log("Form submitted:", formData);
    };

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




  return (

      <main>

        <div className="container my-4 w-50 d-flex align-items-center" id='new-activity-box'>

          <div className="container sub-form pb-3 px-5 pt-4 mt-5" id='new-activity-main'>

            <h2 className="mb-2">
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

                <label htmlFor="actName" className="form-label green-title">
                  Enter the name of the new activity
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="actName"
                  name="actName"
                  onChange={handleInputChange}
                  value={formData.actName}
                  required
                />



                <button type="submit" className="btn btn-primary submit-btn mt-4 w-100">
                  Create
                </button>

              </div>


            </form>

          </div>
        </div>

      </main>

  );
}
