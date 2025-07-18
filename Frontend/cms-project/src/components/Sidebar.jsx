import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const   Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendLink = useSelector((state) => state.prod.link);



  const userLogout = async()=>{
    try{
      
      const response =  await axios.post(`${backendLink}/api/user/logout`,{withCredentials:true})
      if(response.status===200)
      {
        dispatch(logout())
        navigate('/login')
      }
    }catch(err){
      console.log(err)
    }
  }

  

  const sidebarLinks = [
    {
      name: "Dashboard",
      to: "/profile",
    },
    {
      name: "Favourites",
      to: "/profile/favourites",
    },
    
  ];

  return (
    <div className="bg-white shadow-md h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
      </div>
      <div className="flex flex-col">
        {sidebarLinks.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="p-4 hover:bg-gray-200 transition duration-200 ease-in-out text-gray-800"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <button
      onClick={userLogout}
        
        className="p-4 hover:bg-gray-200 transition duration-200 ease-in-out text-gray-800 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;