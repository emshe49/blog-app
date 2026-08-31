import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiTrendingUp, FiArrowRight, FiFileText } from 'react-icons/fi';

const RecentBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendLink}/api/blog/get-all-blogs`, {
          withCredentials: true,
        });
        setData(response.data.blog || []);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [backendLink]);

  return (
    <section id="recent-blogs-section" className="py-16 bg-slate-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-2">
              <FiTrendingUp className="w-3.5 h-3.5" />
              <span>Latest Stories</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Recent Articles</h2>
            <p className="text-sm text-gray-500 mt-1">Discover freshly published thoughts, tutorials, and discussions</p>
          </div>

          <Link
            to="/all-blogs"
            className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl shadow-xs hover:shadow-md transition-all"
          >
            <span>View All ({data.length})</span>
            <FiArrowRight className="w-3.5 h-3.5 text-indigo-600" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse flex flex-col justify-between">
                <div className="h-44 bg-gray-200/80 rounded-2xl" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No blog posts available</h3>
            <p className="text-xs text-gray-500 mt-1">Check back later for newly published stories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.slice(0, 8).map((item) => (
              <BlogCard key={item._id} items={item} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            to="/all-blogs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <span>View All ({data.length}) Articles</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default RecentBlogs;
