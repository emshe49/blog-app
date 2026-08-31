import React, { useState } from 'react';
import Sidebar from '../../components/Admin Components/Sidebar';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { FiMenu, FiX, FiShield, FiHome } from 'react-icons/fi';

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin-dashboard':
        return 'System Overview';
      case '/admin-dashboard/add-blogs':
        return 'Create New Blog Post';
      case '/admin-dashboard/edit-blogs':
        return 'Manage Blog Articles';
      case '/admin-dashboard/delete-category':
        return 'Categories Manager';
      case '/admin-dashboard/add-admin':
        return 'User & Admin Accounts';
      default:
        if (location.pathname.includes('/admin-dashboard/update-blogs')) {
          return 'Edit Blog Post';
        }
        return 'Admin Portal';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar mobileClose={() => setMobileOpen(false)} />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/60 min-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {getPageTitle()}
              </h1>
              <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400">
                <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                  <FiHome className="w-3 h-3" />
                  <span>Home</span>
                </Link>
                <span>/</span>
                <span className="text-slate-300 font-medium">{getPageTitle()}</span>
              </div>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Mode</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;