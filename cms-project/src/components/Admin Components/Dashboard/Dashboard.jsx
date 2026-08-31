import React, { useEffect, useState } from 'react';
import AllBlogs from '../../../pages/AllBlogs';
import { FiActivity, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true });
      setPosts(response.data.blog); // Assuming response.data.blog is an array of posts
    } catch (err) {
      console.error(err);
    }
  };


    const getUserData = async() =>{
    try {
      const response = await axios.get(`${backendLink}/api/user/get-all-users`, { withCredentials: true });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllPosts();
    getUserData();
  }, [backendLink]);




  const stats = [
    {
      title: "Total Posts",
      value: posts.length, // Count of posts
      icon: <FiFileText className="text-purple-500" size={24} />,
      change: "+23% from last month",
    },
    // Add other stats like Total Views, Total Users here if needed
    {
      title: "Total Users",
      value: users.length,
      icon: <FiUsers className="text-blue-500" size={24} />,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiSettings className="text-gray-600" size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Blog Posts</h2>
          </div>
          <div className="p-6">
            <AllBlogs dashboardView={true} />
          </div>
        </div>

        {/* Recent Activity Section (optional) */}
        <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            {/* Recent Activity Content */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;