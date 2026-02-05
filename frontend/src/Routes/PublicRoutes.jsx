import React from "react";
import MainContent from "../components/MainContent";
import Login from "../pages/Auth/Login";
import Clubs from "../components/Clubs/Clubs";


export const publicRoutes = [
  { path: "/", element: <MainContent /> },
  { path: "/clubs", element: <Clubs /> },
  { path: "/login", element: <Login /> },
];
