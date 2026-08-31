import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FiUser, 
  FiBookmark, 
  FiLogOut, 
  FiHome,
  FiShield
} from 'react-icons/fi';

const Sidebar = ({ userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backendLink = useSelector((state) => state.prod.link);

  const userLogout = async () => {
    try {
      const response = await axios.post(`${backendLink}/api/user/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const navItems = [
    {
      name: 'My Profile',
      to: '/profile',
      icon: FiUser,
      exact: true,
    },
    {
      name: 'Saved Favourites',
      to: '/profile/favourites',
      icon: FiBookmark,
    },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.to;
    }
    return location.pathname.startsWith(item.to);
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col justify-between h-full min-h-[calc(100vh-4rem)] p-4 sm:p-5 shadow-sm transition-all duration-300">
      <div className="space-y-6">
        {/* User Mini Profile Header */}
        <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-blue-50/50 border border-indigo-100/60">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-200 overflow-hidden shrink-0">
            {userData?.avatar ? (
              <img
                src={`${backendLink}/upload/${userData.avatar}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              (userData?.username || userData?.email || 'U').charAt(0).toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-gray-900 truncate">
              {userData?.username || 'User Profile'}
            </h4>
            <p className="text-xs text-gray-500 truncate">{userData?.email || 'Active Member'}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
            Navigation
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                      active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Back to Home */}
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
            Explore
          </p>
          <Link
            to="/"
            className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all duration-200 group"
          >
            <FiHome className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={userLogout}
          type="button"
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group cursor-pointer"
        >
          <FiLogOut className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;