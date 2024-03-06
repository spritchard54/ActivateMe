import React from 'react';
import ReactDOM from 'react-dom/client';

// Required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import css framework and files
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './App.css'

// import pages the router will use to conditionally show the appropriate views
import App from './App.jsx';
import Home from './pages/Homepage.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LogActivity from './pages/LogNewActivity.jsx';
import CreateActivity from './pages/CreateActivity.jsx';
import ActivityLog from './pages/ActivityLog.jsx';
import ContactUs from './pages/Contact.jsx';
import ContactConfirm from './pages/ContactConfirm.jsx';
import AboutUs from './pages/AboutUs.jsx';

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, // set the home page
        element: <Home />,
      },
      // create paths for all other pages
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/log-activity',
        element: <LogActivity />,
      },
      {
        path: '/create-activity',
        element: <CreateActivity />,
      },
      {
        path: '/activity-log',
        element: <ActivityLog />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/contact-confirmation',
        element: <ContactConfirm />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      }
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
