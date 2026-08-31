import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiEdit,
  FiUploadCloud,
  FiCheck,
  FiArrowLeft,
  FiRefreshCw,
  FiX
} from 'react-icons/fi';

const UpdateBlog = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const fetchBlogDetails = async () => {
    try {
      setIsLoadingBlog(true);
      const [blogRes, catRes] = await Promise.allSettled([
        axios.get(`${backendLink}/api/blog/description/${id}`, { withCredentials: true }),
        axios.get(`${backendLink}/api/category/get-category`, { withCredentials: true }),
      ]);

      if (catRes.status === 'fulfilled') {
        setCategoriesList(catRes.value.data.category || []);
      }

      if (blogRes.status === 'fulfilled') {
        const blog = blogRes.value.data.blog;
        if (blog) {
          setTitle(blog.title || '');
          setDescription(blog.description || '');
          setCategory(typeof blog.category === 'object' ? blog.category?.title : blog.category || '');
          setExistingImage(blog.image || '');
        }
      }
    } catch (err) {
      console.error('Error fetching blog details:', err);
      toast.error('Failed to load blog details');
    } finally {
      setIsLoadingBlog(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id, backendLink]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelNewImage = () => {
    setNewImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    if (!description.trim()) {
      toast.error('Description cannot be empty');
      return;
    }

    try {
      setIsUpdating(true);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category,
      };

      const response = await axios.put(
        `${backendLink}/api/admin/update-blog/${id}`,
        payload,
        { withCredentials: true }
      );

      toast.success(response.data?.message || 'Blog updated successfully!');
      navigate('/admin-dashboard/edit-blogs');
    } catch (err) {
      console.error('Error updating blog:', err);
      toast.error(err.response?.data?.message || 'Failed to update blog.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingBlog) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center text-slate-400 animate-pulse">
        Loading blog post details...
      </div>
    );
  }

  const currentDisplayImage = imagePreview || (existingImage ? `${backendLink}/upload/${existingImage}` : null);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Back Button & Header */}
      <div className="flex items-center justify-between pb-2">
        <Link
          to="/admin-dashboard/edit-blogs"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Manage Blogs</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <FiEdit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Edit Blog Post</h2>
            <p className="text-xs text-slate-400">Update content and attributes</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="title">
              Article Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">
                Select category
              </option>
              {categoriesList.map((cat) => (
                <option key={cat._id} value={cat.title} className="bg-slate-900 text-white">
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="description">
              Article Content
            </label>
            <textarea
              id="description"
              required
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all leading-relaxed"
            />
          </div>

          {/* Cover Image Display */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Cover Image
            </label>
            {currentDisplayImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 max-h-72">
                <img src={currentDisplayImage} alt="Cover" className="w-full h-full object-cover" />
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleCancelNewImage}
                    className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-rose-600 text-white rounded-xl backdrop-blur-sm transition-colors cursor-pointer"
                    title="Cancel new photo"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/40 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <FiUploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-300">Upload new image</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-3 pt-3">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Update Article</span>
                </>
              )}
            </button>

            <Link
              to="/admin-dashboard/edit-blogs"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
};

export default UpdateBlog;
