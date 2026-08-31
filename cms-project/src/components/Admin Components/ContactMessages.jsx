import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  FiInbox,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiTrash2,
  FiSearch,
  FiExternalLink,
  FiUser,
  FiRefreshCw
} from 'react-icons/fi';

const ContactMessages = () => {
  const backendLink = useSelector((state) => state.prod.link);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Active message detail modal / state
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendLink}/api/contact/messages`, {
        withCredentials: true,
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [backendLink]);

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.replyMessage || '');
  };

  const handleSaveReply = async () => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply message before saving');
      return;
    }

    try {
      setIsSubmittingReply(true);
      const response = await axios.put(
        `${backendLink}/api/contact/reply/${selectedMessage._id}`,
        { replyMessage: replyText.trim() },
        { withCredentials: true }
      );

      toast.success(response.data?.message || 'Reply recorded successfully!');
      
      // Update local state
      setMessages((prev) =>
        prev.map((m) =>
          m._id === selectedMessage._id
            ? { ...m, status: 'replied', replyMessage: replyText.trim(), repliedAt: new Date() }
            : m
        )
      );

      setSelectedMessage((prev) => ({
        ...prev,
        status: 'replied',
        replyMessage: replyText.trim(),
        repliedAt: new Date(),
      }));
    } catch (error) {
      console.error('Error saving reply:', error);
      toast.error('Failed to record reply');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleSendEmailViaClient = () => {
    if (!selectedMessage) return;
    const subject = encodeURIComponent(`Re: ${selectedMessage.subject || 'Your Inquiry on DevVerse'}`);
    const body = encodeURIComponent(
      `Hello ${selectedMessage.name},\n\nThank you for reaching out to DevVerse.\n\n${replyText}\n\nBest regards,\nDevVerse Editorial Team`
    );
    window.open(`mailto:${selectedMessage.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`${backendLink}/api/contact/message/${id}`, {
        withCredentials: true,
      });
      toast.success('Message deleted');
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      msg.name?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term) ||
      msg.subject?.toLowerCase().includes(term) ||
      msg.message?.toLowerCase().includes(term);

    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = messages.filter((m) => m.status === 'pending').length;
  const repliedCount = messages.filter((m) => m.status === 'replied').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Header & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <FiInbox className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{messages.length}</p>
            <p className="text-xs text-slate-400">Total Inquiries</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <FiAlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
            <p className="text-xs text-slate-400">Pending Replies</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">{repliedCount}</p>
            <p className="text-xs text-slate-400">Answered Inquiries</p>
          </div>
        </div>

      </div>

      {/* 2. Main Inbox Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Messages List */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-3 border-b border-slate-800">
            {/* Status Pills */}
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({messages.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterStatus === 'pending' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setFilterStatus('replied')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  filterStatus === 'replied' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Replied ({repliedCount})
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchMessages}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer self-end sm:self-auto"
              title="Refresh messages"
            >
              <FiRefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by sender, email, subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
            />
          </div>

          {/* Message List */}
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-xs animate-pulse">Loading inquiries...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">No inquiries found.</div>
          ) : (
            <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage?._id === msg._id;
                return (
                  <div
                    key={msg._id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-white">{msg.name}</span>
                        <span className="text-[11px] text-slate-500">• {msg.email}</span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          msg.status === 'replied'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-200 truncate">{msg.subject}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{msg.message}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center space-x-1">
                        <FiClock className="w-3 h-3" />
                        <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(msg._id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Active Message Inspector & Reply Composer */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          {selectedMessage ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedMessage.status === 'replied'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">{selectedMessage.subject}</h3>
                  <p className="text-xs text-slate-400">
                    From: <span className="text-slate-200 font-semibold">{selectedMessage.name}</span> ({selectedMessage.email})
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
                  title="Delete message"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inquiry Content */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {selectedMessage.message}
              </div>

              {/* Reply Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                    <FiMail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Admin Reply</span>
                  </label>

                  {selectedMessage.repliedAt && (
                    <span className="text-[11px] text-slate-500">
                      Last replied: {new Date(selectedMessage.repliedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <textarea
                  rows={5}
                  placeholder={`Write your response to ${selectedMessage.name}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500 resize-y"
                />

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleSaveReply}
                    disabled={isSubmittingReply}
                    className="w-full sm:flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmittingReply ? (
                      <span>Saving Reply...</span>
                    ) : (
                      <>
                        <FiSend className="w-3.5 h-3.5" />
                        <span>Save & Mark Replied</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSendEmailViaClient}
                    className="w-full sm:w-auto flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                    title="Open your default email client to send this message"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    <span>Send via Email</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-16 text-center text-slate-500 space-y-2">
              <FiInbox className="w-12 h-12 text-slate-700 mx-auto" />
              <h4 className="text-sm font-bold text-slate-400">Select an inquiry</h4>
              <p className="text-xs text-slate-600">Choose a message from the left list to read and send a reply.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ContactMessages;
