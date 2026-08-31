import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen,
  FiCode,
  FiCpu,
  FiUsers,
  FiGlobe,
  FiAward,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';

const About = () => {
  const stats = [
    { label: 'Active Developers', value: '10K+' },
    { label: 'Published Articles', value: '500+' },
    { label: 'Topic Categories', value: '15+' },
    { label: 'Community Rating', value: '4.9/5' },
  ];

  const coreValues = [
    {
      icon: FiCode,
      title: 'Practical Engineering',
      desc: 'We prioritize real-world code implementations, robust architectural patterns, and production-tested practices over abstract theory.',
    },
    {
      icon: FiCpu,
      title: 'Modern Technology',
      desc: 'Covering bleeding-edge advancements in AI systems, cloud-native infrastructure, full-stack frameworks, and developer tooling.',
    },
    {
      icon: FiUsers,
      title: 'Community-Driven',
      desc: 'Built by developers for developers. An open environment for sharing knowledge, constructive feedback, and continuous learning.',
    },
    {
      icon: FiGlobe,
      title: 'Global Accessibility',
      desc: 'Committed to delivering free, high-performance, and accessible technical content to developers across the globe.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fadeIn">
      
      {/* 1. Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <FiBookOpen className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Empowering builders to create the{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            future of software
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          DevVerse was created with a single vision: to build a premier digital publishing hub where engineers, creators, and tech leaders explore deep technical insights and emerging industry paradigms.
        </p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center space-y-1 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Story Section */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Why We Started DevVerse
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              Bridging the gap between theory and high-scale production systems.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Software engineering moves faster every day. Traditional tutorials often overlook the real-world complexities of distributed microservices, state orchestration, AI agents, and security protocols.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We started DevVerse to provide a sanctuary for engineers who demand deep-dives, reproducible benchmarks, and clean, modular code architectures.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/all-blogs"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Read Our Articles</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 space-y-3">
              <div className="flex items-center space-x-3 text-indigo-400 font-bold text-sm">
                <FiCheckCircle className="w-5 h-5" />
                <span>Zero Clickbait Policy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every published article undergoes review for accuracy, code quality, and actionable technical takeaways.
              </p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 space-y-3">
              <div className="flex items-center space-x-3 text-purple-400 font-bold text-sm">
                <FiCheckCircle className="w-5 h-5" />
                <span>Modern Open Tech Stack</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powered by React, Tailwind CSS, Express, MongoDB, and modern RESTful APIs for fast, seamless reading experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Core Values Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Our Guiding Principles
          </h3>
          <p className="text-sm text-gray-500">
            The core values that shape our editorial standards and technology platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{val.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default About;
