import React from 'react';
import Sidebar from '../../components/Admin Components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex  bg-gray-100 ">
      <div className='w-1/6'></div>
      {/* Sidebar */}
      <div className="w-1/5 fixed bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 ml-10">
          <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;