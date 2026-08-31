import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiBookmark, FiTrash2, FiArrowRight, FiClock, FiFileText } from 'react-icons/fi';

const Favourites = () => {
  const context = useOutletContext();
  const backendLink = useSelector((state) => state.prod.link);
  const favorites = context?.userData?.favoritesBlog || [];

  const handleRemoveFavorite = async (blogId) => {
    try {
      await axios.put(`${backendLink}/api/blog/remove-favourite/${blogId}`, {}, {
        withCredentials: true,
      });
      toast.success('Removed from favourites');
      if (context?.refreshUserData) {
        context.refreshUserData();
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast.error('Failed to remove from favourites');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <FiBookmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saved Favourites</h1>
              <p className="text-sm text-gray-500">Articles you've bookmarked for later reading</p>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 self-start sm:self-auto">
          {favorites.length} Saved {favorites.length === 1 ? 'Article' : 'Articles'}
        </span>
      </div>

      {/* Content Grid */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
            <FiBookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No favourites yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Explore articles and click the bookmark icon to save them to your personal reading list.
          </p>
          <Link
            to="/all-blogs"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <span>Explore Blogs</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Blog Image */}
              <div className="h-44 overflow-hidden bg-gray-100 relative">
                {blog.image ? (
                  <img
                    src={`${backendLink}/upload/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FiFileText className="w-12 h-12" />
                  </div>
                )}

                {/* Category Badge */}
                {blog.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-800 shadow-sm">
                    {typeof blog.category === 'object' ? blog.category.name : blog.category}
                  </span>
                )}
              </div>

              {/* Blog Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                    {blog.description ? blog.description.replace(/<[^>]*>?/gm, '') : 'No description available.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={`/description/${blog._id}`}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleRemoveFavorite(blog._id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove from favourites"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;