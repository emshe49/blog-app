import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiHeartStraightFill } from "react-icons/pi";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Description = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [favourites, setFavourites] = useState(false);
 
  const backendLink = useSelector((state) => state.prod.link);
  const { id } = useParams();

  const handleDescriptionClick = async () => {
    try {
      const response = await axios.get(`${backendLink}/api/blog/description/${id}`, { withCredentials: true });
      const blog = response.data.blog;
      setData(blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleDescriptionClick();
  }, []);

  const FavoriteHandler =async ()=>{
    if(!favourites){
      const response =await axios.put(`${backendLink}/api/blog/FavoriteBlogs/${id}`,{}, {withCredentials:true});
      toast.success(response.data.message)
    }else{
      const response =await axios.put(`${backendLink}/api/blog/remove-favorite/${id}`,{}, {withCredentials:true});
      console.log(response)
      setFavourites(!favourites)
    }
    
  }

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen py-10">
      <div className="mx-auto w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">{data.title}</h1>
        </div>
        <div>
          <button onClick={FavoriteHandler} className="flex items-center mb-4">
            {
              favourites ? (
                <PiHeartStraightFill 
                  className="text-yellow-500 text-2xl cursor-pointer" 
                />
              ) : (
                <PiHeartStraightFill 
                  className="text-gray-400 text-2xl cursor-pointer" 
                />
              )}
          </button>
          
        </div>


        <h2 className="text-lg text-gray-500 mb-4">
          {new Date(data.updatedAt).toLocaleDateString()}
        </h2>
        {data.image && (
          <img 
            src={`${backendLink}/upload/${data.image}`} 
            alt="Blog Post" 
            className="w-full max-h-72 object-cover rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 duration-300" 
          />
        )}
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {data.description}
        </p>
        <button onClick={()=>navigate('/all-blogs')} className='bg-blue-500 text-white px-4 py-2 rounded'>back to home</button>
        
      </div>
      <Outlet />
    </div>
  );
};

export default Description;