import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddBlog = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  console.log("the category is",category)
  const [getCategory, setGetCategory] = useState();
  console.log("set get category are:",getCategory)
  const [categoryID,setCategoryId] = useState("")

  console.log('the category id is',categoryID)
  const fileInputRef = useRef(null);
  console.log(categoryID)

 

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append('category',categoryID) 

    try {
      const res = await axios.post(
        `${backendLink}/api/admin/addBlog`,
        formData,
        { withCredentials: true }
      );
      console.log(res);
      setMessage("Blog added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to add blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendLink}/api/category/add-category`,
        { title: category },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setCategory(""); // Clear category input after submission
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/category/get-category`,
          { withCredentials: true }
        );
        setGetCategory(response.data.category);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCategory()
  }, [backendLink]);


  const handleDelete=async()=>{

  }

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Blog</h2>

        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

        <form onSubmit={handleAddBlog} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <div className="flex item-center justify-between">
            <label className="block text-gray-700 mb-1" htmlFor="file">
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <select
            onChange={(e)=>setCategoryId(e.target.value)}>
              <option value="">Add Category</option>
              {
                getCategory && getCategory.map((item,i)=>(
                    <option key={i} >{item.title}</option>
                ))
              }
            </select>
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Blog"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Category</h2>

        <form onSubmit={handleCategory} className="space-y-4">
          <div>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Add Category"
              className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
            Add Category
          </button>
          <button onClick={handleDelete()}>Delete Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
