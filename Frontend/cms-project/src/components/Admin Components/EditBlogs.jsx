import React from "react";
import { Link, } from "react-router-dom";
import axios from 'axios';
import {  useState , useEffect} from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'

;
const EditBlogs = () => {
  // const [update,setUpdate] = useState([]);
  const [getAllBlogs, setGetAllBlogs] = useState([]);
    const backendLink = useSelector((state) => state.prod.link);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${backendLink}/api/blog/get-all-blogs`, { withCredentials: true });
            setGetAllBlogs(response.data.blog);
        } catch (err) {
            console.error(err);
        }
    };
    const {id} = useParams()
    
    useEffect(() => {
        getBlogs();
        
    }, [getAllBlogs]);

  // const data = [
  //   {
  //     img: "/public/download.jpg",
  //     title: "Essa Raza",
  //     description: "This is my personal image I took in Lahore",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Essa Raza",
  //     description: "This is my personal image I took in Lahore",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Essa Raza",
  //     description: "This is my personal image I took in Lahore",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  //   {
  //     img: "/public/download.jpg",
  //     title: "Kamran Khan",
  //     description: "I am Kamran, I clicked this picture",
  //   },
  // ];

  // const handleUpdate = async () => {
  //   try {
  //     const response = await axios.put(`${backendLink}/api/admin/update-blog/${id}`);
  //     console.log(response)
  //     setData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }

    
  // }
  // useEffect(()=>{
  //     handleUpdate();
  //   })
  const deletehandler = async(id)=>{
    try{
      const response  = await axios.delete(`${backendLink}/api/admin/delete-blog/${id}`,{withCredentials:true});
     
      toast.success(response.data.message);
      

    }catch(err){
      console.log(err)
    }
  }



  return (
    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Edit Blogs</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our latest stories and insights
        </p>
      </div>

      {/* Blog Grid */}
      {getAllBlogs && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getAllBlogs.map((items,i) => (
            <div>
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {items.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {items.description}
                  </p>

                  <div className="flex justify-between ">
                    <Link
                     
                      to={`/admin-dashboard/update-blogs/${items._id}`}
                      className="inline-block px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Edit Blog
                    </Link>
                    <button onClick={()=>deletehandler(items._id)} className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/blogs"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
};

export default EditBlogs;
