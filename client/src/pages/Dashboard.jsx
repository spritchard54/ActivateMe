// export default function Dashboard() {
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { DELETE_ACTIVITY } from "../utils/mutations";
import Auth from "../utils/auth";
import dayjs from "dayjs";
import "../css/dash.css";
import QuickChart from "quickchart-js";

const myChart = new QuickChart();

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
  // console.log(data);
  const user = data?.me || data?.user || {};
  const myActivities = data?.me || data?.user || {};
  let reverse = myActivities.activities?.toReversed();

  const today = dayjs().format("YYYY-MM-DD");
  const lastSeven = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const lastThirty = dayjs().subtract(30, "day").format("YYYY-MM-DD");
  // console.log("30 Days ago was", lastThirty);
  // console.log("Seven days ago ", lastSeven);

  // Today Chart
  const myObject = {};
  if (data?.me) {
    // returns the categories
    for (let index = 0; index < data.me.activities.length; index++) {
      if (data?.me.activities[index].when === today) {
        myObject[data.me.activities[index].category.catName] = 0;
      }
    }
    // returns the duration of the categories if they have activities for current day
    for (let index = 0; index < data.me.activities.length; index++) {
      if (data?.me.activities[index].when === today) {
        myObject[data.me.activities[index].category.catName] +=
          data.me.activities[index].duration;
      }
    }
  }
  const myLables = Object.keys(myObject);
  const myData = Object.values(myObject);
  myChart.setWidth(180).setHeight(180).setBackgroundColor("transparent");
  myChart.setConfig({
    type: "doughnut",
    data: {
      labels: myLables,
      datasets: [
        {
          label: "Catgeory",
          data: myData,
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

  // Week Chart
  const myObjectWeek = {};
  if (data?.me) {
    // returns the categories
    for (let index = 0; index < data.me.activities.length; index++) {
      if (
        data?.me.activities[index].when >= lastSeven &&
        data?.me.activities[index].when <= today
      ) {
        myObjectWeek[data.me.activities[index].category.catName] = 0;
      }
    }
    // returns the duration of the categories if they have activities for current day
    for (let index = 0; index < data.me.activities.length; index++) {
      if (
        data?.me.activities[index].when >= lastSeven &&
        data?.me.activities[index].when <= today
      ) {
        myObjectWeek[data.me.activities[index].category.catName] +=
          data.me.activities[index].duration;
      }
    }
  }
  const myLablesWeek = Object.keys(myObjectWeek);
  const myDataWeek = Object.values(myObjectWeek);
  const myChartTwo = new QuickChart();
  myChartTwo.setWidth(180).setHeight(180).setBackgroundColor("transparent");
  myChartTwo.setConfig({
    type: "doughnut",
    data: {
      labels: myLablesWeek,
      datasets: [
        {
          label: "Catgeory",
          data: myDataWeek,
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
        text: "Last 7 Days",
        fontColor: "#ffffff",
      },
      plugins: {
        datalabels: {
          color: "white",
        },
      },
    },
  });

  // Month Chart
  const myObjectMonth = {};
  if (data?.me) {
    // returns the categories
    for (let index = 0; index < data.me.activities.length; index++) {
      if (
        data?.me.activities[index].when >= lastThirty &&
        data?.me.activities[index].when <= today
      ) {
        myObjectMonth[data.me.activities[index].category.catName] = 0;
      }
    }
    // returns the duration of the categories if they have activities for current day
    for (let index = 0; index < data.me.activities.length; index++) {
      if (
        data?.me.activities[index].when >= lastThirty &&
        data?.me.activities[index].when <= today
      ) {
        myObjectMonth[data.me.activities[index].category.catName] +=
          data.me.activities[index].duration;
      }
    }
  }
  const myLablesMonth = Object.keys(myObjectMonth);
  const myDataMonth = Object.values(myObjectMonth);
  const myChartThree = new QuickChart();
  myChartThree.setWidth(180).setHeight(180).setBackgroundColor("transparent");
  myChartThree.setConfig({
    type: "doughnut",
    data: {
      labels: myLablesMonth,
      datasets: [
        {
          label: "Catgeory",
          data: myDataMonth,
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
        text: "Last 30 Days",
        fontColor: "#ffffff",
      },
      plugins: {
        datalabels: {
          color: "white",
        },
      },
    },
  });

  const [deleteActivity] = useMutation(DELETE_ACTIVITY, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });
  

  // Autho Code Begin
  if (Auth.loggedIn() && Auth.getUser().data.username === userParam) {
    return <Navigate to="/Dashboard" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <div className="container-fluid w-75 my-5 mt-5 text-center">
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }
  // Auth Code End

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



  // Delete Activity End

  return (
    <main>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="container sub-form p-5 mt-4" id="dashboard-main">
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

          <div className="container py-5 d-flex justify-content-around align-items-center flex-wrap">
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
                {reverse.slice(0, 5).map((activity) => {
                  return (
                    <>
                      <tr>
                        <td>{activity.when}</td>
                        <td>{activity.category.catName}</td>
                        <td>UPDATE</td>
                        <td>{activity.duration}</td>
                        <td>{activity.commentText}</td>
                        <td className="d-flex justify-content-center">
                          <button
                            onClick={() => handleDeleteActivity(activity._id)}
                            className="btn btn-sm btn-secondary"
                          >
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
};

export default Dashboard;
