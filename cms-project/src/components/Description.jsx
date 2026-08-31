import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiArrowLeft,
  FiClock,
  FiBookmark,
  FiHeart,
  FiShare2,
  FiTag,
  FiCheck
} from 'react-icons/fi';

const Description = () => {
  const navigate = useNavigate();
  const backendLink = useSelector((state) => state.prod.link);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendLink}/api/blog/description/${id}`, {
        withCredentials: true,
      });
      const blog = response.data.blog;
      setData(blog);

      // Check if user has bookmarked this
      if (isLoggedin) {
        try {
          const userRes = await axios.get(`${backendLink}/api/user/userData`, { withCredentials: true });
          const userFavs = userRes.data.user?.favoritesBlog || [];
          const hasFav = userFavs.some((fav) => (typeof fav === 'object' ? fav._id === id : fav === id));
          setIsFavorited(hasFav);
        } catch (e) {
          // Silent catch for auth
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id, backendLink]);

  const handleToggleFavorite = async () => {
    if (!isLoggedin) {
      toast.info('Please sign in to save articles to your favourites');
      navigate('/login');
      return;
    }

    try {
      if (!isFavorited) {
        const res = await axios.put(`${backendLink}/api/blog/FavoriteBlogs/${id}`, {}, { withCredentials: true });
        toast.success(res.data?.message || 'Added to favourites!');
        setIsFavorited(true);
      } else {
        const res = await axios.put(`${backendLink}/api/blog/remove-favourite/${id}`, {}, { withCredentials: true });
        toast.success(res.data?.message || 'Removed from favourites');
        setIsFavorited(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favourite status');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.info('Article link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded w-3/4" />
        <div className="h-96 bg-gray-200 rounded-3xl" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">Article not found</h2>
        <button
          onClick={() => navigate('/all-blogs')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
        >
          Return to Blogs
        </button>
      </div>
    );
  }

  const categoryName = typeof data.category === 'object' ? data.category?.title : data.category;

  return (
    <article className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Back Button & Share / Bookmark Actions */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-xs cursor-pointer flex items-center space-x-1.5 text-xs font-semibold"
            title="Share article"
          >
            {copied ? <FiCheck className="w-4 h-4 text-emerald-600" /> : <FiShare2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleFavorite}
            className={`p-2.5 rounded-xl border transition-all shadow-xs cursor-pointer flex items-center space-x-1.5 text-xs font-semibold ${
              isFavorited
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
            }`}
            title={isFavorited ? 'Remove from favourites' : 'Save to favourites'}
          >
            <FiHeart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span className="hidden sm:inline">{isFavorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        {categoryName && (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700">
            <FiTag className="w-3 h-3" />
            <span>{categoryName}</span>
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
          {data.title}
        </h1>

        <div className="flex items-center space-x-4 text-xs text-gray-400 font-medium pt-1">
          <div className="flex items-center space-x-1.5">
            <FiClock className="w-3.5 h-3.5" />
            <span>
              {data.createdAt
                ? new Date(data.createdAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {data.image && (
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-slate-100 max-h-[480px]">
          <img
            src={`${backendLink}/upload/${data.image}`}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm leading-relaxed text-gray-800 text-base sm:text-lg whitespace-pre-line font-normal space-y-4">
        {data.description}
      </div>

      {/* Bottom CTA & Return */}
      <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
        <Link
          to="/all-blogs"
          className="inline-flex items-center space-x-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Browse more articles</span>
        </Link>
      </div>

    </article>
  );
};

export default Description;