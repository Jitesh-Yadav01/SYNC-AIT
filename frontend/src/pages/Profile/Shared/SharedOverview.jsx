import React from 'react';
import { useProfile } from './ProfileContext';
import { Users, CheckSquare, MessageSquare, Bell, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
export default function SharedOverview() {
    const { members, pendingTasksCount, notifications, profile, unreadMessagesCount } = useProfile();
    const { user } = useAuth();

    const stats = [
        { title: "Active Members", value: members.filter(m => m.status === 'Active').length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Pending Tasks", value: pendingTasksCount, icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Unread Messages", value: unreadMessagesCount, icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Notifications", value: notifications.filter(n => !n.isRead).length, icon: Bell, color: "text-purple-600", bg: "bg-purple-50" }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back, {user?.name.split(' ')[0]}</h2>
                    <p className="text-gray-500">Here's what's happening with your team today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-gray-300 transition-all">
                        <div className="flex items-center justify-between pb-2">
                            <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                            <stat.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">Recent Activity</h3>
                    <p className="text-sm text-gray-500 mb-4">Latest actions from your team members.</p>

                    <div className="space-y-6">
                        {notifications.slice(0, 5).map((notification) => (
                            <div key={notification.id} className="flex items-start gap-4">
                                <span className="flex h-2 w-2 mt-2 rounded-full bg-blue-600" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-gray-900">{notification.title}</p>
                                    <p className="text-sm text-gray-500">{notification.message}</p>
                                    <p className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        ))}
                        {notifications.length === 0 && (
                            <p className="text-sm text-gray-500">No recent activity.</p>
                        )}
                    </div>
                </div>

                <div className="col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">Team Status</h3>
                    <p className="text-sm text-gray-500 mb-4">Overview of current sprint.</p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                            <TrendingUp className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Sprint Deadline</p>
                                <p className="text-sm text-gray-500">Next release in 14 days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Daily Standup</p>
                                <p className="text-sm text-gray-500">Today at 4:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
