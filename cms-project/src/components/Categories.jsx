import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiTag, FiFolder, FiArrowRight } from 'react-icons/fi';

const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendLink}/api/category/get-category`, {
          withCredentials: true,
        });
        setCategories(response.data.category || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [backendLink]);

  const tagColors = [
    'from-blue-500/10 to-indigo-500/10 text-indigo-600 hover:border-indigo-300',
    'from-purple-500/10 to-pink-500/10 text-purple-600 hover:border-purple-300',
    'from-emerald-500/10 to-teal-500/10 text-emerald-600 hover:border-emerald-300',
    'from-amber-500/10 to-orange-500/10 text-amber-600 hover:border-amber-300',
    'from-rose-500/10 to-red-500/10 text-rose-600 hover:border-rose-300',
    'from-cyan-500/10 to-sky-500/10 text-cyan-600 hover:border-cyan-300',
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <FiTag className="w-3.5 h-3.5" />
            <span>Topics</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Browse our collection of articles by curated topics</p>
        </div>

        <Link
          to="/all-blogs"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 transition-colors self-start sm:self-auto"
        >
          <span>View All Articles</span>
          <FiArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-gray-100/80 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 text-sm">
          No categories available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => {
            const colorClass = tagColors[index % tagColors.length];
            const blogCount = cat.blogs?.length || 0;

            return (
              <Link
                key={cat._id}
                to={`/cat/${cat._id}`}
                className={`group p-5 rounded-2xl border border-gray-200/80 bg-gradient-to-br ${colorClass} bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/90 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                  <FiFolder className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {blogCount} {blogCount === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </section>
  );
};

export default Categories;