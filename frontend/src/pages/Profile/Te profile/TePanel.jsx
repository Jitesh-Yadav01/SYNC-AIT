import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useView } from '../../../context/ViewContext';
import { TeProvider, useTe } from './TeContext';
import TeOverview from './TeOverview';
import TeMembers from './TeMembers';
import TeTasks from './TeTasks';
import TeMessages from './TeMessages';
import TeProfile from './TeProfile';
import { LayoutDashboard, Users, CheckSquare, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';


const DashboardLayout = () => {
    const { activeTab, setActiveTab, logout, profile } = useTe();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'members', label: 'Team Members', icon: Users },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <TeOverview />;
            case 'members': return <TeMembers />;
            case 'tasks': return <TeTasks />;
            case 'messages': return <TeMessages />;
            case 'profile': return <TeProfile />;
            default: return <TeOverview />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                            <span className="font-bold text-white text-lg">TE</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight text-gray-900">TE Panel</h1>
                            <p className="text-xs text-gray-500">Workspace</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                    activeTab === tab.id
                                        ? "bg-blue-50 text-blue-700 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                                )}
                                <tab.icon className={cn(
                                    "h-5 w-5 transition-colors",
                                    activeTab === tab.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                                )} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-gray-200 space-y-4">
                        <div
                            className="flex items-center gap-3 px-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                            onClick={() => {
                                setActiveTab('profile');
                                setIsSidebarOpen(false);
                            }}
                        >
                            <img src={profile.avatar} alt="Profile" className="h-9 w-9 rounded-full border border-gray-200 bg-gray-100 object-cover" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate text-gray-900">{profile.name}</p>
                                <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
                <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                            <span className="font-bold text-white text-xs">TE</span>
                        </div>
                        <span className="font-semibold text-gray-900">Dashboard</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:text-gray-900">
                        <Menu className="h-6 w-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <div className="max-w-6xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

const TePanel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setCurrentView } = useView();

    useEffect(() => {
        setCurrentView('te-dashboard');
        localStorage.setItem('te_dashboard_active', 'true');
    }, [setCurrentView]);

    useEffect(() => {

        if (!location.state?.fromLogin) {

        }
    }, [location, navigate]);

    return (
        <TeProvider>
            <DashboardLayout />
        </TeProvider>
    );
};

export default TePanel;