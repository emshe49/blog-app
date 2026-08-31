import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowRight, FiClock, FiFileText, FiHeart } from 'react-icons/fi';

const BlogCard = ({ items }) => {
  const backendLink = useSelector((state) => state.prod.link);

  if (!items) return null;

  const categoryName = typeof items.category === 'object' ? items.category?.title : items.category;
  const descriptionSnippet = items.description
    ? items.description.replace(/<[^>]*>?/gm, '')
    : 'No description available.';

  return (
    <div className="group bg-white rounded-3xl border border-gray-100/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden">
      
      {/* Cover Image Container */}
      <div className="h-52 bg-slate-100 relative overflow-hidden">
        {items.image ? (
          <img
            src={`${backendLink}/upload/${items.image}`}
            alt={items.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-50 text-indigo-300">
            <FiFileText className="w-12 h-12" />
          </div>
        )}

        {/* Category Badge */}
        {categoryName && (
          <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-indigo-700 shadow-sm border border-white/50">
            {categoryName}
          </span>
        )}

        {/* Likes / Favorites Indicator if any */}
        {items.favouriteBlogByUsers?.length > 0 && (
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/40 backdrop-blur-md text-white flex items-center space-x-1 shadow-sm">
            <FiHeart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>{items.favouriteBlogByUsers.length}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          
          {/* Metadata */}
          {items.createdAt && (
            <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium">
              <FiClock className="w-3.5 h-3.5" />
              <span>{new Date(items.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {items.title}
          </h3>

          {/* Snippet */}
          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
            {descriptionSnippet}
          </p>
        </div>

        {/* Read More Footer */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <Link
            to={`/description/${items._id}`}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors"
          >
            <span>Read Article</span>
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default BlogCard;