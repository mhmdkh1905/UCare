import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import Emergency from "./components/emergency";
import Appoinment from "./components/appoinment";
import Medication from "./components/medication";
import HealthCare from "./components/healthCare";
import Documents from "./components/documents";
import Settings from "./components/settings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/emergency",
    element: <Emergency />,
  },
  {
    path: "/appoinment",
    element: <Appoinment />,
  },
  {
    path: "/medication",
    element: <Medication />,
  },
  {
    path: "/healthCare",
    element: <HealthCare />,
  },
  {
    path: "/documents",
    element: <Documents />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
