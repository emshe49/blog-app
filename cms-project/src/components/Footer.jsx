import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${backendLink}/api/category/get-category`,
          { withCredentials: true }
        );
        setCategories(response.data.category || []);
        console.log(response)
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [backendLink]);

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">TCM Blogger</h3>
            <p className="text-gray-400">
              Bringing you the latest tech trends, coding tips, and industry insights since 2023.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/all-blogs" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/profile" className="hover:text-white transition-colors">Profile</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {categories && categories.map((category) => (
                <li key={category._id}>
                  <Link to={`/cat/${category._id}`} onScroll={()=>navigate(screenTop)} className="hover:text-white transition-colors">
                    {category.title} {/* Assuming each category has a 'name' property */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <FaEnvelope />
                <span>zk074909@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone />
                <span>03189764318</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Subscribe to our newsletter for the latest updates
              </p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TCM Blogger. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;