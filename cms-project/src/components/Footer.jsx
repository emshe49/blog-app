import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiBookOpen,
  FiMail,
  FiSend,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiCheck
} from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendLink}/api/category/get-category`, {
          withCredentials: true,
        });
        setCategories(response.data.category || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [backendLink]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    toast.success('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 w-full select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <FiBookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">DevVerse</span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An open platform for developers and technology enthusiasts to discover, write, and share in-depth knowledge on software development and modern engineering.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
                aria-label="Twitter"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/all-blogs" className="hover:text-indigo-400 transition-colors">All Articles</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition-colors">User Profile</Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-indigo-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Popular Topics</h4>
            <ul className="space-y-2 text-xs text-slate-400 max-h-40 overflow-y-auto">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat._id}>
                  <Link to={`/cat/${cat._id}`} className="hover:text-indigo-400 transition-colors">
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest developer stories and insights delivered to your inbox weekly.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  {subscribed ? <FiCheck className="w-3.5 h-3.5" /> : <FiSend className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DevVerse Platform. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;