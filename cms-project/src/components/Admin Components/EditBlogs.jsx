import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiGrid,
  FiList,
  FiExternalLink,
  FiFileText,
  FiPlusCircle
} from 'react-icons/fi';

const EditBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [categories, setCategories] = useState([]);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const [blogRes, catRes] = await Promise.allSettled([
        axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true }),
        axios.get(`${backendLink}/api/category/get-category`, { withCredentials: true }),
      ]);

      if (blogRes.status === 'fulfilled') {
        setBlogs(blogRes.value.data.blog || []);
      }
      if (catRes.status === 'fulfilled') {
        setCategories(catRes.value.data.category || []);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [backendLink]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this blog?')) return;
    try {
      const response = await axios.delete(`${backendLink}/api/admin/delete-blog/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data?.message || 'Blog deleted successfully');
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete blog.');
    }
  };

  // Filtered Blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const catName = typeof blog.category === 'object' ? blog.category?.title : blog.category;
    const matchesCategory =
      selectedCategory === 'all' || (catName && catName.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Blog Articles</h2>
          <p className="text-xs text-slate-400">Total: {blogs.length} articles</p>
        </div>

        {/* Search, Filter, and View Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 sm:w-56"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950/60 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <FiList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Create Blog Button */}
          <Link
            to="/admin-dashboard/add-blogs"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <FiPlusCircle className="w-3.5 h-3.5" />
            <span>Create</span>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 animate-pulse">Loading articles...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
          <FiFileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-300">No blog posts found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try changing your search keywords or filter.'
              : 'Start by publishing your first blog post.'}
          </p>
          <Link
            to="/admin-dashboard/add-blogs"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md"
          >
            <FiPlusCircle className="w-4 h-4" />
            <span>Write New Blog</span>
          </Link>
        </div>
      ) : viewMode === 'table' ? (
        
        /* 1. TABLE VIEW */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Blog</th>
                  <th scope="col" className="px-6 py-3.5">Category</th>
                  <th scope="col" className="px-6 py-3.5">Favourites</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogs.map((blog) => (
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
                      <div className="min-w-0 max-w-md">
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
                      {blog.favouriteBlogByUsers?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          to={`/description/${blog._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                          title="View on site"
                        >
                          <FiExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin-dashboard/update-blogs/${blog._id}`}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete"
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
        </div>
      ) : (
        
        /* 2. GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col group"
            >
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                {blog.image ? (
                  <img
                    src={`${backendLink}/upload/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <FiFileText className="w-10 h-10" />
                  </div>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/90 backdrop-blur-md text-indigo-400 border border-slate-700">
                  {typeof blog.category === 'object' ? blog.category?.title : blog.category || 'General'}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base line-clamp-2 mb-2">{blog.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {blog.description ? blog.description.replace(/<[^>]*>?/gm, '') : 'No description'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/description/${blog._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-indigo-400 flex items-center space-x-1"
                  >
                    <span>View Post</span>
                    <FiExternalLink className="w-3 h-3" />
                  </Link>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin-dashboard/update-blogs/${blog._id}`}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                      title="Edit"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default EditBlogs;
