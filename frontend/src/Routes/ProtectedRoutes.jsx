import React from "react";
import TePanel from "@/pages/Profile/Te profile/TePanel";
import FePanel from "@/pages/Profile/FePanel";
import SePanel from "@/pages/Profile/SE profile/SePanel";


export const protectedRoutes = [
  { path: "/profile/TE", element: <TePanel /> },
  { path: "/profile/SE", element: <SePanel /> },
  { path: "/profile/FE", element: <FePanel /> },

];
