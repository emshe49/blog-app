import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AllBlogs = () => {
    const [getAllBlogs, setGetAllBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const backendLink = useSelector((state) => state.prod.link);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true });
            setGetAllBlogs(response.data.blog);
            setFilteredBlogs(response.data.blog); // Initialize filteredBlogs with all blogs
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const filter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = getAllBlogs.filter((item) => 
            item.title.toLowerCase().includes(searchValue)
        );
        setFilteredBlogs(filtered);
    }

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-100">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">All Blogs</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our latest stories and insights
                </p>
            </div>
            {/* Input for filtering blogs */}
            <input 
                type="text" 
                onChange={filter} 
                placeholder="Search by title" 
                className="mb-8 p-2 border rounded w-full"
            />
            
            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14 gap-8">
                    {filteredBlogs.map((item, i) => (
                        <div className="transition-transform transform hover:scale-105" key={i}>
                            <BlogCard items={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">No blogs available at the moment.</p>
                </div>
            )}
            
            {/* View All Button (optional) */}
            {/* <Link to="/all-blogs" className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded">View All</Link> */}
        </div>
    );
}

export default AllBlogs;