import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiPlusCircle,
  FiUploadCloud,
  FiFileText,
  FiTag,
  FiCheck,
  FiX,
  FiRefreshCw
} from 'react-icons/fi';

const AddBlog = () => {
  const backendLink = useSelector((state) => state.prod.link);

  // Blog Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);

  // Category Quick Add States
  const [newCatTitle, setNewCatTitle] = useState('');
  const [isSubmittingCat, setIsSubmittingCat] = useState(false);

  // Loaded Categories
  const [categoriesList, setCategoriesList] = useState([]);
  const fileInputRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendLink}/api/category/get-category`, {
        withCredentials: true,
      });
      setCategoriesList(response.data.category || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backendLink]);

  // Image Selection Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit Blog Handler
  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a blog title.');
      return;
    }
    if (!description.trim()) {
      toast.error('Please enter the blog description / content.');
      return;
    }
    if (!category) {
      toast.error('Please select a category.');
      return;
    }
    if (!imageFile) {
      toast.error('Please upload a cover image for the blog.');
      return;
    }

    try {
      setIsSubmittingBlog(true);
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('category', category);
      formData.append('image', imageFile);

      const response = await axios.post(`${backendLink}/api/admin/addBlog`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data?.message || 'Blog published successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      handleRemoveImage();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to publish blog.');
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  // Quick Add Category Handler
  const handleQuickAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatTitle.trim()) {
      toast.error('Please enter a category name.');
      return;
    }

    try {
      setIsSubmittingCat(true);
      const response = await axios.post(
        `${backendLink}/api/category/add-category`,
        { title: newCatTitle.trim() },
        { withCredentials: true }
      );

      toast.success(response.data?.message || 'Category created!');
      setNewCatTitle('');
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create category.');
    } finally {
      setIsSubmittingCat(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      
      {/* Left / Main Column: Create Blog Form */}
      <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
            <FiPlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Create New Blog Article</h2>
            <p className="text-xs text-slate-400">Compose and publish insightful stories</p>
          </div>
        </div>

        <form onSubmit={handleAddBlog} className="space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="title">
              Article Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. The Future of Web Development in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
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
              required
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="" disabled className="bg-slate-900 text-slate-400">
                Select a category
              </option>
              {categoriesList.map((cat) => (
                <option key={cat._id} value={cat.title} className="bg-slate-900 text-white">
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description / Content Body */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5" htmlFor="description">
              Article Content / Description
            </label>
            <textarea
              id="description"
              required
              rows={8}
              placeholder="Write your article content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 leading-relaxed"
            />
          </div>

          {/* Cover Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Cover Image
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 max-h-72 group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-rose-600 text-white rounded-xl backdrop-blur-sm transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/40 hover:bg-slate-950/80 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group"
              >
                <FiUploadCloud className="w-10 h-10 text-slate-500 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-semibold text-slate-300">Click to upload cover image</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Publish Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmittingBlog}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isSubmittingBlog ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  <span>Publishing Blog...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  <span>Publish Article</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Quick Add Category */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Quick Category Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <FiTag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Create Category</h3>
              <p className="text-[11px] text-slate-400">Add a new taxonomy tag</p>
            </div>
          </div>

          <form onSubmit={handleQuickAddCategory} className="space-y-3.5">
            <div>
              <input
                type="text"
                placeholder="e.g. Artificial Intelligence"
                value={newCatTitle}
                onChange={(e) => setNewCatTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingCat}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-amber-600/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmittingCat ? <span>Saving...</span> : <span>+ Add Category</span>}
            </button>
          </form>

          {/* Current Categories Pill List */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Available Categories ({categoriesList.length})
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
              {categoriesList.map((c) => (
                <span
                  key={c._id}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {c.title}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AddBlog;
