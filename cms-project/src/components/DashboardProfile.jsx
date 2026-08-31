import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiShield,
  FiBookmark,
  FiHeart,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiCopy,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';

const DashboardProfile = () => {
  const context = useOutletContext();
  const backendLink = useSelector((state) => state.prod.link);

  const [data, setData] = useState(context?.userData || null);
  const [loadingUser, setLoadingUser] = useState(!context?.userData);

  // Avatar Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  // Password Change States
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync with outlet context if updated
  useEffect(() => {
    if (context?.userData) {
      setData(context.userData);
      setLoadingUser(false);
    }
  }, [context?.userData]);

  const getUserData = async () => {
    try {
      setLoadingUser(true);
      const response = await axios.get(`${backendLink}/api/user/userData`, {
        withCredentials: true,
      });
      setData(response.data.user);
      if (context?.setUserData) {
        context.setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.response?.data?.message);
      toast.error('Failed to load profile data.');
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (!context?.userData) {
      getUserData();
    }
  }, []);

  // Avatar Handlers
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error('Image size must be less than 3MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) return;

    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.put(`${backendLink}/api/user/change-avatar`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setData((prev) => ({
        ...prev,
        avatar: response.data.user?.avatar || prev?.avatar,
      }));

      if (context?.refreshUserData) {
        context.refreshUserData();
      }

      toast.success('Avatar updated successfully!');
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error(error.response?.data?.message || 'Failed to update avatar.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCancelPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Password Handlers
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '', text: '' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
      default:
        return { score: 15, label: 'Too short', color: 'bg-red-400', text: 'text-red-400' };
    }
  };

  const newPassStrength = getPasswordStrength(passwordForm.newPassword);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordForm.password) {
      toast.error('Please enter your current password.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await axios.patch(
        `${backendLink}/api/user/change-password`,
        {
          password: passwordForm.password,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data?.message || 'Password changed successfully!');
      setPasswordForm({
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.response?.data?.message || 'Failed to change password. Please check your credentials.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const copyEmail = () => {
    if (data?.email) {
      navigator.clipboard.writeText(data.email);
      setCopied(true);
      toast.info('Email copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loadingUser && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-56 bg-gray-200/80 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200/80 rounded-2xl" />
          <div className="h-32 bg-gray-200/80 rounded-2xl" />
          <div className="h-32 bg-gray-200/80 rounded-2xl" />
        </div>
        <div className="h-80 bg-gray-200/80 rounded-3xl" />
      </div>
    );
  }

  const avatarSrc = previewUrl || (data?.avatar ? `${backendLink}/upload/${data.avatar}` : null);
  const displayName = data?.username || (data?.email ? data.email.split('@')[0] : 'Member');

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Hero Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl shadow-slate-100 transition-all duration-300">
        
        {/* Banner Top Gradient */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/20" />
          
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
              <FiShield className="w-3.5 h-3.5 mr-1" />
              {data?.role === 'admin' ? 'Administrator' : 'Standard Member'}
            </span>
          </div>
        </div>

        {/* User Content Info */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            
            {/* Avatar with Interactive Upload Overlay */}
            <div className="flex items-end space-x-4">
              <div className="relative group">
                <div
                  onClick={handleAvatarClick}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white bg-slate-100 shadow-xl overflow-hidden cursor-pointer relative transition-transform duration-300 group-hover:scale-105"
                >
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-4xl">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Hover Camera Icon Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-xs font-medium">
                    <FiCamera className="w-6 h-6 mb-1 drop-shadow" />
                    <span>Change</span>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* User Title and Role */}
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {displayName}
                  </h1>
                  <FiCheckCircle className="w-5 h-5 text-indigo-600" title="Verified Account" />
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-0.5">
                  <FiMail className="w-4 h-4" />
                  <span>{data?.email}</span>
                  <button
                    onClick={copyEmail}
                    className="hover:text-indigo-600 transition-colors p-1"
                    title="Copy Email"
                  >
                    {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FiCopy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Avatar Preview Action Buttons */}
            {selectedFile && (
              <div className="flex items-center space-x-2 bg-indigo-50/90 border border-indigo-100 p-2 rounded-2xl animate-fadeIn">
                <button
                  onClick={handleUploadAvatar}
                  disabled={isUploadingAvatar}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all disabled:opacity-60 cursor-pointer flex items-center space-x-1.5"
                >
                  {isUploadingAvatar ? (
                    <>
                      <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-3.5 h-3.5" />
                      <span>Save Photo</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelPreview}
                  disabled={isUploadingAvatar}
                  className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl border border-gray-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Stats Grid Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Stat 1: Favourites */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Favourites</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                {data?.favoritesBlog?.length || 0}
              </h3>
              <p className="text-xs text-indigo-600 font-medium mt-1">Saved articles</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FiBookmark className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Stat 2: Liked Articles */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Liked Blogs</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                {data?.LikedBlog?.length || 0}
              </h3>
              <p className="text-xs text-rose-600 font-medium mt-1">Total appreciation</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FiHeart className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Stat 3: Security Health */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Security</p>
              <h3 className="text-xl font-extrabold text-emerald-600 mt-1 flex items-center space-x-1.5">
                <span>Active</span>
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">JWT Authenticated</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FiShield className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Account Settings & Password Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Change Password Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FiLock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
              <p className="text-xs text-gray-500">Update your security credentials</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="current-password">
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  name="password"
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  placeholder="Enter current password"
                  value={passwordForm.password}
                  onChange={handlePasswordInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showCurrentPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="new-password">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  name="newPassword"
                  type={showNewPass ? 'text' : 'password'}
                  required
                  placeholder="Minimum 6 characters"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showNewPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {passwordForm.newPassword && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Strength:</span>
                    <span className={`font-medium ${newPassStrength.text}`}>{newPassStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${newPassStrength.color} transition-all duration-300 rounded-full`}
                      style={{ width: `${newPassStrength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  placeholder="Repeat new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className={`w-full px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-gray-400 ${
                    passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword
                      ? 'border-emerald-300 focus:ring-emerald-500'
                      : 'border-gray-200 focus:ring-indigo-500'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center space-x-1.5">
                  {passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && (
                    <FiCheck className="w-4 h-4 text-emerald-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showConfirmPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Password Change Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full flex items-center justify-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all duration-200 disabled:opacity-60 cursor-pointer"
              >
                {isChangingPassword ? (
                  <div className="flex items-center space-x-2">
                    <FiRefreshCw className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Account Information Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FiUser className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Account Details</h2>
                <p className="text-xs text-gray-500">Your profile summary</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Username</span>
                <span className="text-gray-900 font-semibold">{displayName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="text-gray-900 font-semibold truncate max-w-[180px]">{data?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Role</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 capitalize">
                  {data?.role || 'user'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardProfile;