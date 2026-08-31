import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiSearch, FiCompass, FiFileText } from 'react-icons/fi';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const backendLink = useSelector((state) => state.prod.link);

  const fetchBlogsAndCategories = async () => {
    try {
      setLoading(true);
      const [blogRes, catRes] = await Promise.allSettled([
        axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true }),
        axios.get(`${backendLink}/api/category/get-category`, { withCredentials: true }),
      ]);

      if (blogRes.status === 'fulfilled') {
        setAllBlogs(blogRes.value.data.blog || []);
      }
      if (catRes.status === 'fulfilled') {
        setCategories(catRes.value.data.category || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsAndCategories();
  }, [backendLink]);

  const filteredBlogs = allBlogs.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const catName = typeof item.category === 'object' ? item.category?.title : item.category;
    const matchesCategory =
      selectedCategory === 'all' || (catName && catName.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <FiCompass className="w-3.5 h-3.5" />
          <span>Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore All Articles
        </h1>
        <p className="text-sm text-gray-500">
          Search, filter, and discover insightful articles published across our developer community.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <FiSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keywords or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50/60 focus:bg-white border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-semibold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
            }`}
          >
            All Topics ({allBlogs.length})
          </button>

          {categories.map((cat) => {
            const active = selectedCategory.toLowerCase() === cat.title?.toLowerCase();
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-4 py-2 rounded-xl font-semibold shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm">
          <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">No matching articles found</h3>
          <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or selecting a different topic.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs.map((item) => (
            <BlogCard key={item._id} items={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AllBlogs;