import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendLink}/api/category/get-category`,
          { withCredentials: true }
        );
        setCategories(response.data.category || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [backendLink]);

  // Custom Skeleton Loader
  const SkeletonLoader = () => (
    <div className="bg-gray-100 animate-pulse rounded-lg h-32 w-full"></div>
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Explore Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse content by topic to find what interests you most
        </p>
      </div>

      {error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block">
            {error}
            <button 
              onClick={() => window.location.reload()} 
              className="ml-3 text-red-700 font-medium hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/cat/${category._id}`}
              className="block group transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-all duration-300 hover:shadow-md h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {category.blogs.length || 0} articles
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;