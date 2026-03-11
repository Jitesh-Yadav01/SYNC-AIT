import React from "react";
import AdminPanel from "@/pages/Profile/organisations/Admin/adminpanel";
import ApplicantPanel from "@/pages/Profile/Applicant/applicantpanel";
import MemberPanel from "@/pages/Profile/organisations/Member/memberPanel";
import MyForms from "@/pages/Forms/MyForms";
import FillForm from "@/pages/Forms/FillForm";
import ResponseDashboard from "@/pages/response/Dashboard";

import { ProfileProvider } from "@/pages/Profile/Shared/ProfileContext";
import SharedDashboardLayout from "@/pages/Profile/Shared/DashboardLayout";
const adminData = { profile: { clubs: [] }, members: [], tasks: [], messages: [], notifications: [] };

const AdminRoute = ({ children }) => (
  <ProfileProvider initialData={adminData} role="Admin">
    <SharedDashboardLayout>{children}</SharedDashboardLayout>
  </ProfileProvider>
);

export const protectedRoutes = [
  { path: "/profile/Admin", element: <AdminPanel /> },
  { path: "/profile/Member", element: <MemberPanel /> },
  { path: "/profile/Applicant", element: <ApplicantPanel /> },

  { path: "/my-forms", element: <AdminRoute><MyForms /></AdminRoute> },
  { path: "/response", element: <AdminRoute><ResponseDashboard /></AdminRoute> },


  { path: "/forms/:formId", element: <FillForm /> },
];
