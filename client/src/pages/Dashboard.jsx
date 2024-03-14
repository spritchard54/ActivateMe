// export default function Dashboard() {
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import "../css/dash.css";

import QuickChart from "quickchart-js";
// import { Chart } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// Chart.register(ChartDataLabels);

const myChart = new QuickChart();
myChart.setWidth(200).setHeight(200).setBackgroundColor("transparent");
myChart.setConfig({
  type: "doughnut",
  data: {
    labels: ["Work", "Meals", "Sleep", "Exercise", "Mindfulness"],
    datasets: [
      {
        label: "Catgeory",
        data: [8, 1, 2, 2, 4],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      labels: {
        fontSize: 7,
        fontColor: "white",
        boxWidth: 15,
      },
    },
    title: {
      display: true,
      text: "Today",
      fontColor: "#ffffff",
    },
    plugins: {
      datalabels: {
        color: "white",
      },
    },
  },
});

const myChartTwo = new QuickChart();
myChartTwo.setWidth(200).setHeight(200).setBackgroundColor("transparent");
myChartTwo.setConfig({
  type: "doughnut",
  data: {
    labels: ["Work", "Meals", "Sleep", "Exercise", "Mindfulness"],
    datasets: [
      {
        label: "Catgeory",
        data: [4, 4, 4, 2, 4],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      labels: {
        fontSize: 7,
        fontColor: "white",
        boxWidth: 15,
      },
    },
    title: {
      display: true,
      text: "Weekly",
      fontColor: "#ffffff",
    },
    plugins: {
      datalabels: {
        color: "white",
      },
    },
  },
});

const myChartThree = new QuickChart();
myChartThree.setWidth(200).setHeight(200).setBackgroundColor("transparent");
myChartThree.setConfig({
  type: "doughnut",
  data: {
    labels: ["Work", "Meals", "Sleep", "Exercise", "Mindfulness"],
    datasets: [
      {
        label: "Catgeory",
        data: [160, 93, 240, 28, 4],
      },
    ],
  },
  options: {
    legend: {
      display: true,
      labels: {
        fontSize: 7,
        fontColor: "white",
        boxWidth: 15,
      },
    },
    title: {
      display: true,
      text: "Monthly",
      fontColor: "#ffffff",
    },
    plugins: {
      datalabels: {
        color: "white",
      },
    },
  },
});

// console.log(myChart.getUrl());

const Dashboard = () => {
  let navigate = useNavigate();

  const logButton = () => {
    let path = `/log-activity`;
    navigate(path);
  };

  const viewActivityLog = () => {
    let path = `/activity-log`;
    navigate(path);
  };

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
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="container sub-form p-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="white-text">Dashboard</h2>

          <div className="d-flex align-items-center gap-3">
            <button onClick={logButton} className="logAct">
              Log Activity
            </button>

            <button onClick={viewActivityLog} className=" logAct">
              View Activities
            </button>
          </div>
        </div>

        <div className="container py-5 d-flex justify-content-around align-items-center">
          <div className="text-light">
            <img src={myChart.getUrl()} />
          </div>
          <div className="text-light">
          <img src={myChartTwo.getUrl()} />
          </div>
          <div className="text-light">
          <img src={myChartThree.getUrl()} />
          </div>
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
