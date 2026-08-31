import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiFileText,
  FiUsers,
  FiTag,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiArrowRight,
  FiCheckCircle,
  FiActivity,
  FiExternalLink
} from 'react-icons/fi';

const Dashboard = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [blogsRes, usersRes, catRes] = await Promise.allSettled([
        axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true }),
        axios.get(`${backendLink}/api/user/get-all-users`, { withCredentials: true }),
        axios.get(`${backendLink}/api/category/get-category`, { withCredentials: true }),
      ]);

      if (blogsRes.status === 'fulfilled') {
        setPosts(blogsRes.value.data.blog || []);
      }
      if (usersRes.status === 'fulfilled') {
        setUsers(usersRes.value.data.users || []);
      }
      if (catRes.status === 'fulfilled') {
        setCategories(catRes.value.data.category || []);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [backendLink]);

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const response = await axios.delete(`${backendLink}/api/admin/delete-blog/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data.message || 'Blog deleted successfully');
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete blog.');
    }
  };

  const stats = [
    {
      title: 'Published Blogs',
      value: posts.length,
      icon: FiFileText,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40 border-indigo-800/40',
      to: '/admin-dashboard/edit-blogs',
      label: 'Manage Posts',
    },
    {
      title: 'Registered Users',
      value: users.length,
      icon: FiUsers,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-950/40 border-purple-800/40',
      to: '/admin-dashboard/add-admin',
      label: 'View Directory',
    },
    {
      title: 'Active Categories',
      value: categories.length,
      icon: FiTag,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800/40',
      to: '/admin-dashboard/delete-category',
      label: 'Manage Tags',
    },
    {
      title: 'System Health',
      value: 'Online',
      icon: FiActivity,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-800/40',
      to: '#',
      label: 'JWT & DB Active',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-800/60 rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-slate-800/60 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.02] ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-extrabold text-white mt-1.5">{stat.value}</h3>
                  <Link
                    to={stat.to}
                    className={`inline-flex items-center space-x-1 text-xs font-semibold mt-2.5 hover:underline ${stat.textColor}`}
                  >
                    <span>{stat.label}</span>
                    <FiArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Quick Action Shortcuts */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin-dashboard/add-blogs"
            className="flex items-center space-x-3 p-3.5 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all group"
          >
            <FiPlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">Write Blog</span>
          </Link>

          <Link
            to="/admin-dashboard/delete-category"
            className="flex items-center space-x-3 p-3.5 rounded-2xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 text-amber-300 hover:text-amber-200 transition-all group"
          >
            <FiTag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">Add Category</span>
          </Link>

          <Link
            to="/admin-dashboard/add-admin"
            className="flex items-center space-x-3 p-3.5 rounded-2xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300 hover:text-purple-200 transition-all group"
          >
            <FiUsers className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">Manage Users</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3.5 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-300 hover:text-emerald-200 transition-all group"
          >
            <FiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">View Website</span>
          </Link>
        </div>
      </div>

      {/* 3. Main Data: Recent Articles Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Blog Articles</h2>
            <p className="text-xs text-slate-400">Latest published content across all categories</p>
          </div>
          <Link
            to="/admin-dashboard/edit-blogs"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
          >
            <span>View All ({posts.length})</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <FiFileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-300">No blog posts found</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">Create your first blog to see it listed here.</p>
            <Link
              to="/admin-dashboard/add-blogs"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md"
            >
              <FiPlusCircle className="w-4 h-4" />
              <span>Create Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Blog Details</th>
                  <th scope="col" className="px-6 py-3.5">Category</th>
                  <th scope="col" className="px-6 py-3.5">Favorites</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {posts.slice(0, 5).map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0">
                        {blog.image ? (
                          <img
                            src={`${backendLink}/upload/${blog.image}`}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <FiFileText className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 max-w-sm">
                        <p className="font-bold text-white text-sm truncate">{blog.title}</p>
                        <p className="text-xs text-slate-400 truncate">
                          {blog.description ? blog.description.replace(/<[^>]*>?/gm, '') : 'No description'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/40">
                        {typeof blog.category === 'object' ? blog.category?.title : blog.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">
                      {blog.favouriteBlogByUsers?.length || 0} users
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          to={`/admin-dashboard/update-blogs/${blog._id}`}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                          title="Edit Post"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;