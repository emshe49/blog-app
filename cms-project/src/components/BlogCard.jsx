import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const BlogCard = ({ items }) => {
  const backendLink = useSelector((state) => state.prod.link);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img 
          src={`${backendLink}/upload/${items.image}`} 
          alt={items.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{items.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{items.description}</p>
        
        <Link 
          to={`/description/${items._id}`} 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Read Blog →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;