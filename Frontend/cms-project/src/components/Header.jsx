import React from 'react';

const Header = () => {
  const scrollToBlogs = () => {
    window.scrollTo({
      top: document.getElementById('blogs-section')?.offsetTop || 1000,
      behavior: 'smooth'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 py-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="rounded-lg p-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to The Code Master
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 font-light opacity-90">
            Your premier source for technology insights and innovation
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover expertly curated content that delivers actionable knowledge about the rapidly evolving technology landscape.
          </p>
        </div>

        {/* Featured Blog Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Image Container */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/download.jpg" 
              alt="Emerging technology trends" 
              className="rounded-lg shadow-xl w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Content Container */}
          <div className="w-full lg:w-1/2">
            <span className="text-blue-300 font-semibold">FEATURED ARTICLE</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2">
              Navigating the Future of Technology
            </h1>
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              In an era defined by digital transformation, gain the competitive edge with our expert analysis. We provide comprehensive coverage of AI breakthroughs, software engineering trends, and emerging technologies.
            </p>
            <button 
              onClick={scrollToBlogs}
              className="px-8 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg"
            >
              Explore Recent Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;