import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";

const RecentBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/blog/get-all-blogs`,
          { withCredentials: true }
        );
        setData(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-10 py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Recent Blogs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest stories and insights
          </p>
        </div>

        {/* Blog Grid */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data
              .slice()
              .reverse()
              .slice(0, 8)
              .map((items, i) => (
                <BlogCard key={i} items={items} />
              ))}
          </div>
        )}

        {/* View All Button */}
        
      </div>
    </section>
  );
};

export default RecentBlogs;
