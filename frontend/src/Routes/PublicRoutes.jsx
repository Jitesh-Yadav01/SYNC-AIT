import React from "react";
import MainContent from "../components/MainContent";
import Login from "../pages/Auth/Login";
import Clubs from "../components/Clubs/Clubs";
import SignUp from "@/pages/Auth/SignUp";
import VerifyAccount from "@/pages/Auth/VerifyAccount";


export const publicRoutes = [
  { path: "/", element: <MainContent /> },
  { path: "/clubs", element: <Clubs /> },
  {path : "/signup", element : <SignUp/>},
  { path: "/login", element: <Login /> },
  { path: "/verify-account", element: <VerifyAccount /> },
];
