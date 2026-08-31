import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { logout } from '../../Features/auth';
import {
  FiGrid,
  FiPlusCircle,
  FiFileText,
  FiTag,
  FiUsers,
  FiInbox,
  FiLogOut,
  FiExternalLink,
  FiShield
} from 'react-icons/fi';

const Sidebar = ({ mobileClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backendLink = useSelector((state) => state.prod.link);

  const links = [
    { name: 'Overview', path: '/admin-dashboard', icon: FiGrid, exact: true },
    { name: 'Add New Blog', path: '/admin-dashboard/add-blogs', icon: FiPlusCircle },
    { name: 'Manage Blogs', path: '/admin-dashboard/edit-blogs', icon: FiFileText },
    { name: 'Categories', path: '/admin-dashboard/delete-category', icon: FiTag },
    { name: 'Users & Admins', path: '/admin-dashboard/add-admin', icon: FiUsers },
    { name: 'Inbox / Messages', path: '/admin-dashboard/messages', icon: FiInbox },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendLink}/api/admin/adminLogout`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message || 'Logged out successfully');
      dispatch(logout());
      navigate('/admin-login');
    } catch (err) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between h-full min-h-screen p-5 border-r border-slate-800 shadow-xl select-none">
      <div className="space-y-6">
        {/* Logo & Portal Header */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <FiShield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Admin Portal</h2>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
              Management Suite
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div>
          <p className="px-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">
            Main Menu
          </p>
          <nav className="space-y-1">
            {links.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={mobileClose}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Links */}
        <div>
          <p className="px-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-2">
            Shortcuts
          </p>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-all duration-200 group"
          >
            <FiExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>View Live Site</span>
          </Link>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all duration-200 group cursor-pointer"
        >
          <FiLogOut className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;