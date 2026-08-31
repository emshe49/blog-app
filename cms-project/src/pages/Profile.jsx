import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${backendLink}/api/user/userData`, {
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [backendLink]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="shrink-0">
        <Sidebar userData={userData} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl">
        <Outlet context={{ userData, setUserData, refreshUserData: fetchUserData }} />
      </main>
    </div>
  );
};

export default Profile;