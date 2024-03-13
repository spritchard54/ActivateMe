// export default function Dashboard() {
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import '../css/dash.css';

const Dashboard = () => {

  let navigate = useNavigate();

  const logButton = () => {
    let path = `/log-activity`;
    navigate(path);
  };

  const viewActivityLog = () => {
    let path = `/activity-log`;
    navigate(path);
  }

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

  return (

    <div className="container-fluid d-flex justify-content-center align-items-center my-5">

      <div className="container sub-form p-5 my-5">

        <div className="d-flex justify-content-between align-items-center">

          <h2 className="white-text">Dashboard</h2>


          <div className="d-flex align-items-center gap-3">

            <button onClick={logButton} className="logAct">
              Log Activity
            </button>

            <button onClick={viewActivityLog} className=" logAct">View Activities</button>

          </div>


        </div>

        <div className="container mt-2 py-5 d-flex justify-content-around align-items-center">

          <div className="text-light">Daily Breakdown</div>
          <div className="text-light">Weekly Breakdown</div>
          <div className="text-light">Monthly Breakdown</div>
          
        </div>

        <div className="container p-1">

          <h4 id="recActivities" className="my-3 py-1 text-black">
            Recent Activities
          </h4>

          <table className="table-dark  activities-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Category</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4/10/2024</td>
                <td>Meals</td>
                <td>Dinner</td>
                <td>1</td>
                <td>Made chicken parm tn. mmmm.</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
