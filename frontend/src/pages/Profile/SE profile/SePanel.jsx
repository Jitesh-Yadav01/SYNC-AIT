import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useView } from '@/context/ViewContext';
import { ProfileProvider } from '../Shared/ProfileContext';
import SharedDashboardLayout from '../Shared/DashboardLayout';
import { profileData, membersData, tasksData, messagesData, notificationsData } from './mockData';

const SePanel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const { setCurrentView } = useView();

    // useEffect(() => {
    //     setCurrentView('se-dashboard');
    //     localStorage.setItem('se_dashboard_active', 'true');
    // }, [setCurrentView]);

    const initialData = {
        profile: profileData,
        members: membersData,
        tasks: tasksData,
        messages: messagesData,
        notifications: notificationsData
    };

    return (
        <ProfileProvider initialData={initialData} role="SE">
            <SharedDashboardLayout />
        </ProfileProvider>
    );
};

export default SePanel;
