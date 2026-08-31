import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/BlogCard';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiTag, FiArrowLeft, FiFileText, FiFolder } from 'react-icons/fi';

const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getBlogsById = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendLink}/api/category/get-category/${id}`, {
        withCredentials: true,
      });
      setData(response.data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogsById();
  }, [id, backendLink]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <FiFolder className="w-3.5 h-3.5" />
            <span>Category Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Topic Articles
          </h1>
          <p className="text-sm text-gray-500 mt-1">Explore all stories curated under this taxonomy</p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm">
          <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No articles found in this category</h3>
          <p className="text-xs text-gray-500 mt-1 mb-6">Check back later or browse other topics.</p>
          <Link
            to="/all-blogs"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <span>Explore All Articles</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item, i) => (
            <BlogCard key={item._id || i} items={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Categories;