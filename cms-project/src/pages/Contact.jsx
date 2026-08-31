import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiMail,
  FiSend,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiUser,
  FiCheckCircle,
  FiHelpCircle
} from 'react-icons/fi';

const Contact = () => {
  const backendLink = useSelector((state) => state.prod.link);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${backendLink}/api/contact/send`,
        formData
      );

      setSubmitted(true);
      toast.success(response.data?.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How can I submit an article or guest post?',
      a: 'Registered community members and authors can submit drafts through their author dashboard or contact our editorial team with an outline.',
    },
    {
      q: 'Can I suggest new topics or categories?',
      a: 'Yes! Send us a message with the technology or domain you would like covered, and our team will explore creating dedicated series for it.',
    },
    {
      q: 'How do I report technical inaccuracies or errata in an article?',
      a: 'Please use the contact form above with the article title and specific feedback. We promptly review and publish updates.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fadeIn">
      
      {/* 1. Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <FiMail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Contact Our Editorial & Support Team
        </h1>
        <p className="text-sm text-gray-500">
          Have a question, feedback, partnership inquiry, or story pitch? We would love to hear from you.
        </p>
      </div>

      {/* 2. Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reach out through any of the channels below or fill out the form, and our engineering team will respond within 24–48 hours.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <FiMail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                  <a href="mailto:support@devverse.blog" className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">
                    support@devverse.blog
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Support</p>
                  <p className="text-sm font-semibold text-white">+1 (800) 555-DEV-VERSE</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Headquarters</p>
                  <p className="text-sm font-semibold text-white">Silicon Valley / Global Remote</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-indigo-300 font-medium">
                ⚡ Typical response time: Under 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
            <p className="text-xs text-gray-500 mt-1">Please provide details so we can best assist you</p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <FiCheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Thank you! Your message was submitted successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="name">
                  Your Name *
                </label>
                <div className="relative">
                  <FiUser className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/60 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/60 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Story idea / Feedback / General inquiry"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50/60 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="message">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50/60 focus:bg-white border border-gray-200 rounded-xl text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 resize-y"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <FiSend className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* 3. Frequently Asked Questions */}
      <div className="space-y-6 pt-8 border-t border-gray-100">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <FiHelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2">
              <h4 className="text-sm font-bold text-gray-900">{faq.q}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Contact;
