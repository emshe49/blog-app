import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/BlogCard';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Categories = () => {
    const navigate = useNavigate();
    const backendLink = useSelector((state) => state.prod.link);
    const [data, setData] = useState([]);
    const { id } = useParams();

    const getBlogsById = async () => {
        try {
            const response = await axios.get(`${backendLink}/api/category/get-category/${id}`, { withCredentials: true });
            setData(response.data.blogs || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBlogsById();
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-12 bg-blue-50"> {/* Change background color */}
            {/* Section Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">Blogs in This Category</h1> {/* Change header color */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our latest stories and insights in this category.
                </p>
            </div>
            
            {/* Blog Grid */}
            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data.map((item, i) => (
                        <BlogCard key={i} items={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600">No blogs available in this category.</p>
                </div>
            )}
            
            {/* View All Button */}
            <div className="text-center mt-12">
                <buttion
                    onClick={() => navigate('/')}
                    to="/blog" 
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:bg-blue-800 transition duration-300 transform hover:scale-105"
                >
                    back
                </buttion>
            </div>
        </div>
    );
};

export default Categories;