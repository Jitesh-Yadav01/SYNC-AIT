import React, { createContext, useContext, useState, useEffect } from 'react';
import { useView } from '../../../context/ViewContext';
import { profileData, membersData, tasksData, messagesData, notificationsData } from './mockData';

const TeContext = createContext();

export const useTe = () => {
  const context = useContext(TeContext);
  if (!context) {
    throw new Error('useTe must be used within a TeProvider');
  }
  return context;
};

export const TeProvider = ({ children }) => {
  const [profile, setProfile] = useState(profileData);
  const [members, setMembers] = useState(membersData);
  const [tasks, setTasks] = useState(tasksData);
  const [messages, setMessages] = useState(messagesData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState('overview');


  const unreadMessagesCount = 3;
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;

  const addMember = (member) => {
    const newMember = { ...member, id: `m${Date.now()}`, avatar: '' };
    setMembers([...members, newMember]);
    addNotification({ title: 'New Member', message: `${member.name} added to the team.`, type: 'success' });
  };

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const editMember = (updatedMember) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    addNotification({ title: 'Member Updated', message: `${updatedMember.name}'s details have been updated.`, type: 'info' });
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `t${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      assignedToName: members.find(m => m.id === task.assignedTo)?.name || 'Unknown'
    };
    setTasks([...tasks, newTask]);
    addNotification({ title: 'Task Created', message: `Task "${task.title}" assigned to ${newTask.assignedToName}.`, type: 'info' });
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    addNotification({ title: 'Task Updated', message: `Task "${updatedTask.title}" has been updated.`, type: 'info' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const sendMessage = (content, receiverId = null) => {
    const newMsg = {
      id: `msg${Date.now()}`,
      senderId: profile.id,
      senderName: profile.name,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      avatar: profile.avatar
    };
    setMessages([...messages, newMsg]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const addNotification = ({ title, message, type }) => {
    const newNotif = {
      id: `n${Date.now()}`,
      title,
      message,
      type,
      isRead: false,
      timestamp: new Date().toISOString()
    };
    setNotifications([newNotif, ...notifications]);
  };

  const { setCurrentView } = useView();

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem('te_dashboard_active');
    setCurrentView('default');
    window.location.href = '/';
  };

  const value = {
    profile, setProfile,
    members, addMember, removeMember, editMember,
    tasks, addTask, updateTaskStatus, deleteTask, editTask,
    messages, sendMessage,
    notifications, markNotificationRead,
    activeTab, setActiveTab,
    unreadMessagesCount, unreadNotificationsCount, pendingTasksCount,
    logout
  };

  return <TeContext.Provider value={value}>{children}</TeContext.Provider>;
};
