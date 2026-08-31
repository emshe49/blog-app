import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FiUsers,
  FiUserPlus,
  FiMail,
  FiLock,
  FiShield,
  FiSearch,
  FiUser,
  FiCheck,
  FiRefreshCw
} from 'react-icons/fi';

const AddAdmin = () => {
  const backendLink = useSelector((state) => state.prod.link);

  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Users List State
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const response = await axios.get(`${backendLink}/api/user/get-all-users`, {
        withCredentials: true,
      });
      setUsers(response.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to load user directory');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [backendLink]);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('Email and Password are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${backendLink}/api/admin/add-admin`,
        {
          username: username.trim() || email.split('@')[0],
          email: email.trim().toLowerCase(),
          password,
          role,
        },
        { withCredentials: true }
      );

      toast.success(response.data?.message || 'Account created successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('admin');
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.email?.toLowerCase().includes(term) ||
      u.username?.toLowerCase().includes(term) ||
      u.role?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <FiUsers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Users & Team Directory</h2>
            <p className="text-xs text-slate-400">Manage administrator privileges and user accounts</p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-400 border border-purple-800/40 self-start sm:self-auto">
          {users.length} Total Registered Accounts
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Create Account Form */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl h-fit">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <FiUserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create Account</h3>
              <p className="text-xs text-slate-400">Provision a new user or administrator</p>
            </div>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-4">
            
            {/* Username / Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="username">
                Full Name / Username
              </label>
              <div className="relative">
                <FiUser className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="password">
                Temporary Password
              </label>
              <div className="relative">
                <FiLock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="role">
                Assigned Role
              </label>
              <div className="relative">
                <FiShield className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="admin" className="bg-slate-900 text-white">Administrator (Full Access)</option>
                  <option value="user" className="bg-slate-900 text-white">Standard User (Member)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/25 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: User Directory Table */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">User Accounts</h3>

              {/* Search */}
              <div className="relative">
                <FiSearch className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48 placeholder:text-slate-500"
                />
              </div>
            </div>

            {isLoadingUsers ? (
              <div className="p-12 text-center text-slate-400 animate-pulse">Loading directory...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No matching users found.</div>
            ) : (
              <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800 sticky top-0">
                    <tr>
                      <th scope="col" className="px-5 py-3">User</th>
                      <th scope="col" className="px-5 py-3">Role</th>
                      <th scope="col" className="px-5 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-3.5 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white text-xs truncate">
                              {user.username || 'Unnamed'}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${
                              user.role === 'admin'
                                ? 'bg-purple-950/80 text-purple-300 border-purple-800/50'
                                : 'bg-slate-800 text-slate-400 border-slate-700/60'
                            }`}
                          >
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="inline-flex items-center text-[11px] text-emerald-400 font-medium space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Active</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AddAdmin;