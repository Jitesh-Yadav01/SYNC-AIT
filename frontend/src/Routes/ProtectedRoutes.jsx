import React from "react";
import TePanel from "@/pages/Profile/Te profile/TePanel";
import FePanel from "@/pages/Profile/FE Profile/FePanel";
import SePanel from "@/pages/Profile/SE profile/SePanel";
import MyForms from "@/pages/Forms/MyForms";
import FillForm from "@/pages/Forms/FillForm";
import ResponseDashboard from "@/pages/response/Dashboard";
import SubmissionDetails from "@/pages/response/SubmissionDetails";
import { ProfileProvider } from "@/pages/Profile/Shared/ProfileContext";
import SharedDashboardLayout from "@/pages/Profile/Shared/DashboardLayout";
import { profileData, membersData, tasksData, messagesData, notificationsData } from "@/pages/Profile/Te profile/mockData";

const teData = { profile: profileData, members: membersData, tasks: tasksData, messages: messagesData, notifications: notificationsData };

const TeSidebar = ({ children }) => (
  <ProfileProvider initialData={teData} role="TE">
    <SharedDashboardLayout>{children}</SharedDashboardLayout>
  </ProfileProvider>
);

export const protectedRoutes = [
  { path: "/profile/TE", element: <TePanel /> },
  { path: "/profile/SE", element: <SePanel /> },
  { path: "/profile/FE", element: <FePanel /> },
  { path: "/my-forms",    element: <TeSidebar><MyForms /></TeSidebar> },
  { path: "/forms/:formId", element: <FillForm /> },
  { path: "/response",      element: <TeSidebar><ResponseDashboard /></TeSidebar> },
  { path: "/response/:id",  element: <TeSidebar><SubmissionDetails /></TeSidebar> },
];
