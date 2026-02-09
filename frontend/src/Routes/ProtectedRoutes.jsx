import React from "react";
import TePanel from "@/pages/Profile/Te profile/TePanel";
import FePanel from "@/pages/Profile/FePanel";
import SePanel from "@/pages/Profile/SePanel";


export const protectedRoutes = [
  { path: "/profile/Te", element: <TePanel /> },
  { path: "/profile/Se", element: <SePanel /> },
  { path: "/profile/Fe", element: <FePanel /> },

];
