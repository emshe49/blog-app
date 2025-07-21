import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate()
  const backendLink = useSelector((state)=>state.prod.link)
  const links = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Add Blog & Category", path: "/admin-dashboard/add-blogs" },
    { name: "Edit Blogs", path: "/admin-dashboard/edit-blogs" },
    {name: "Categories", path: "/admin-dashboard/delete-category"},
    
  ];

  const handleLogout = async()=>{
    try{
      const response =await axios.post(`${backendLink}/api/admin/adminLogout`,{ withCredentials: true })
      toast.success(response.data.message)
      navigate("/admin-login")


    }catch(err){
      toast.error(err)
    }

  }

  return (
    <div className=" h-screen bg-white shadow-md">
      <h2 className="text-xl font-bold text-center p-4 border-b">Admin Panel</h2>
      <ul className="mt-4">
        {links.map((item, i) => (
          <li key={i} className="hover:bg-gray-200">
            <Link to={item.path} className="block p-4 text-gray-700 hover:text-blue-600">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button
        onClick={handleLogout} 
        className='m-3 p-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;