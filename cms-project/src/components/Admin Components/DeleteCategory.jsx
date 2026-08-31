import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FiTag,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiFileText,
  FiRefreshCw
} from 'react-icons/fi';

const DeleteCategory = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Category Form
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendLink}/api/category/get-category`, {
        withCredentials: true,
      });
      setCategories(response.data.category || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backendLink]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error('Please enter a category title');
      return;
    }

    try {
      setIsAdding(true);
      const response = await axios.post(
        `${backendLink}/api/category/add-category`,
        { title: newTitle.trim() },
        { withCredentials: true }
      );
      toast.success(response.data?.message || 'Category added!');
      setNewTitle('');
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add category');
    } finally {
      setIsAdding(false);
    }
  };

  const handleStartEdit = (cat) => {
    setEditingId(cat._id);
    setEditingTitle(cat.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) {
      toast.error('Category title cannot be empty');
      return;
    }

    try {
      setIsUpdating(true);
      const response = await axios.put(
        `${backendLink}/api/category/update-category/${id}`,
        { title: editingTitle.trim() },
        { withCredentials: true }
      );
      toast.success(response.data?.message || 'Category updated!');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update category');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteCategory = async (id, blogCount) => {
    if (blogCount > 0) {
      toast.error(`Cannot delete category: it still contains ${blogCount} article(s). Please reassign them first.`);
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await axios.delete(
        `${backendLink}/api/category/delete-category/${id}`,
        { withCredentials: true }
      );
      toast.success(response.data?.message || 'Category deleted!');
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Header & New Category Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <FiTag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Categories & Taxonomy</h2>
            <p className="text-xs text-slate-400">Organize articles into thematic subjects</p>
          </div>
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter new category name (e.g. Technology, Lifestyle, AI)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={isAdding}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-amber-600/20 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isAdding ? (
              <>
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <FiPlus className="w-4 h-4" />
                <span>Add Category</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Categories Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          All Categories ({categories.length})
        </h3>

        {loading ? (
          <div className="p-12 text-center text-slate-400 animate-pulse">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
            <FiTag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-300">No categories found</h4>
            <p className="text-xs text-slate-500 mt-1">Add your first category above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((item) => {
              const blogCount = item.blogs?.length || 0;
              const isEditingThis = editingId === item._id;

              return (
                <div
                  key={item._id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  {isEditingThis ? (
                    /* Inline Editing Mode */
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-amber-500 rounded-xl text-white text-xs focus:outline-none"
                        autoFocus
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSaveEdit(item._id)}
                          disabled={isUpdating}
                          className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <FiCheck className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <>
                      <div className="flex items-start justify-between">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                          <FiFileText className="w-3 h-3 mr-1 text-slate-400" />
                          {blogCount} {blogCount === 1 ? 'Article' : 'Articles'}
                        </span>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(item._id, blogCount)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete Category"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <h4 className="text-base font-bold text-white tracking-wide truncate">
                          {item.title}
                        </h4>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default DeleteCategory;