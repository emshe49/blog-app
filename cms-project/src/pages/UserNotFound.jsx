import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiHome, FiCompass, FiAlertCircle } from 'react-icons/fi';

const UserNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 animate-fadeIn">
        
        {/* 404 Big Badge */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-widest drop-shadow-lg select-none">
            404
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The article, page, or resource you are looking for does not exist or may have been moved.
          </p>
        </div>

        {/* CTA Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <FiHome className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <Link
            to="/all-blogs"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
          >
            <FiCompass className="w-4 h-4" />
            <span>Explore Blogs</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserNotFound;