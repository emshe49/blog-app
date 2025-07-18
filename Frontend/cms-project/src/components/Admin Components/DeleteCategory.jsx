import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'
const Categories = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [cat, setGetCategory] = useState([]);
  const {id} = useParams();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendLink}/api/category/delete-category/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      getAllCategory();
    } catch (err) {
      console.error(err);
    }
  };
  
  const getAllCategory = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/category/get-category`,
          { withCredentials: true }
        );
        setGetCategory(response.data.category);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    getAllCategory();    
  }, []);

  const handleEdit = (id) => {
    // Logic to handle edit
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cat && cat.map((items, i) => (
          <div key={i} className="relative block p-6 bg-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105 text-center border border-gray-200">
            <div className="absolute top-2 left-2 flex space-x-1">
              <button 
                onClick={() => handleEdit(items._id)} 
                className="p-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Edit
              </button>
            </div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <button 
                onClick={() => handleDelete(items._id)} 
                className="p-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition duration-200"
              >
                Delete
              </button>
            </div>
            <span className="text-lg font-semibold text-gray-800 mt-8">{items.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;