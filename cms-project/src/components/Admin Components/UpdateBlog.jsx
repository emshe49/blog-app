import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateBlog = () => {
  const backendlink = useSelector((state) => state.prod.link);
  const { id } = useParams();
  const [data, setData] = useState({title:"", description:""});
  

  const handleDescriptionClick = async () => {
    try {
      const response = await axios.get(
        `${backendlink}/api/blog/description/${id}`,
        { withCredentials: true }
      );
      const blog = response.data.blog;
      setData(blog);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleDescriptionClick();
  }, []); 

  const changeHandler = (e)=>{  
    const {name, value} = e.target;
    setData({...data, [name]: value});


  }

  const updateBlog = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.put(`${backendlink}/api/admin/update-blog/${id}`,data,{withCredentials:true});
      toast.success(response.data.message);

    }catch(err){
      toast.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {
        data && <form className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name= "title"
            value={data.title}
            onChange={changeHandler}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name ="description"
            value={data.description}
            onChange={changeHandler}
            required
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            className="border border-gray-300 rounded p-2"
          />
        </div>

        <button
          onClick={updateBlog}
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          update Blog
        </button>
      </form>
      }
    </div>
  );
};

export default UpdateBlog;
