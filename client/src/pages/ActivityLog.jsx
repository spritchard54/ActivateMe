import { useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

export default function ActivityLog() {
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
    <div className="container-fluid w-75 mt-4">
      <h2>Activity Log</h2>
      <div className="row">
        <p className="my-4">
          This should contain a table that displays all data from the activty log. This is different from the dashboard where we only see the 5-10 most recent activities.
        </p>
      </div>
    </div>
  );
}
