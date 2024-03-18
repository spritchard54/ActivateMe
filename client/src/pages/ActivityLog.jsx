import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client"
import { DELETE_ACTIVITY } from "../utils/mutations";
import Auth from "../utils/auth";

export default function ActivityLog() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // Test code below, remove if it doesn't work
  const myActivities = data?.me || data?.user || {};
  let reverse = myActivities.activities?.toReversed();

  const [deleteActivity] = useMutation(DELETE_ACTIVITY, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

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

  // Delete Activity Start
  const handleDeleteActivity = async (activityId) => {
    try {
      console.log(activityId)
      const { data } = await deleteActivity({
        variables: { activityId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main id="log-new">
      <div className="container-fluid w-75 mt-4" id="activity-log-main">
        <div className="container p-1">
          <h2 id="recActivities" className="my-3 py-1 text-black">
            Activity Log
          </h2>

          <div className="table-responsive">

            <table className="table table-dark table-striped activities-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Comments</th>
                  <th scope="col" className="text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {reverse.slice(0, 100).map((activity) => {
                  return (
                    <>
                      <tr key={activity._id}>
                        <td>{activity.when}</td>
                        <td>{activity.category.catName}</td>
                        <td>{activity.activityType.actName}</td>
                        <td>{activity.duration}</td>
                        <td>{activity.commentText}</td>
                        <td className="text-center align-middle">
                          <button
                            onClick={() => handleDeleteActivity(activity._id)}
                            className="btn btn-sm btn-danger">
                            <span className="x">X</span>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </main>
  );
}
