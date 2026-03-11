import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const clubName =
    user?.club?.name ||
    (() => {
      try {
        const saved = localStorage.getItem('enteredClub');
        return saved ? JSON.parse(saved).name : null;
      } catch { return null; }
    })() ||
    user?.name ||
    'Admin Panel';

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 pl-12 md:pl-10">
          <span className="font-bold text-gray-800 text-lg tracking-wide select-none">
            {clubName}
          </span>

       
          <button
            onClick={() => navigate('/profile/Admin')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors shadow-sm"
          >
            <span className="text-base leading-none">+</span>
            Add Member
          </button>
        </div>
      </div>


      <div
        className="h-[3px] w-full"
        style={{
          background:
            'linear-gradient(to right, #4285F4 0% 25%, #EA4335 25% 50%, #FBBC04 50% 75%, #34A853 75% 100%)',
        }}
      />
    </div>
  );
}
