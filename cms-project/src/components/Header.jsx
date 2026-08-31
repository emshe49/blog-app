import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCompass, FiZap, FiTrendingUp } from 'react-icons/fi';

const Header = () => {
  const scrollToBlogs = () => {
    const el = document.getElementById('recent-blogs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-sm">
              <FiZap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Modern Technology & Development Hub</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Discover stories, ideas, and{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                engineering insights
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stay ahead in software engineering, AI breakthroughs, and web architecture. Curated tutorials, deep-dives, and guides written for passionate builders.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToBlogs}
                className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Explore Recent Articles</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/all-blogs"
                className="flex items-center space-x-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold rounded-2xl border border-slate-700/80 backdrop-blur-sm transition-all duration-200"
              >
                <FiCompass className="w-4 h-4" />
                <span>Browse Directory</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              
              {/* Card Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

              {/* Glass Showcase Card */}
              <div className="relative bg-slate-900/90 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl p-6 transition-all duration-300 group-hover:translate-y-[-4px]">
                
                <div className="h-52 rounded-2xl bg-gradient-to-tr from-indigo-900 via-slate-800 to-purple-900 overflow-hidden relative mb-5">
                  <img
                    src="/download.jpg"
                    alt="Featured technology"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-sm">
                    Featured
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                    <FiTrendingUp className="w-3.5 h-3.5" />
                    <span>Editor's Pick</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Navigating the Future of Web Architecture
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    An in-depth analysis on modern full-stack patterns, serverless scaling, and modular UI architectures for high-performance applications.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;