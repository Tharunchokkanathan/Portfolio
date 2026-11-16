import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2, Send, Copy, Check, Trash2, Mail } from 'lucide-react';

export default function GmailComposeModal({ isOpen, onClose, recipient = 'tharunchokkanc@gmail.com' }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(recipient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendGmail = (e) => {
    e?.preventDefault();
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry / Collaboration');
    const cleanBody = encodeURIComponent(message.trim() || 'Hi Tharun,\n\nI visited your portfolio and would like to connect regarding...');
    // Modern Gmail Web Compose URL (clean view=cm without legacy extsrc=mailto parameter)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(recipient)}&su=${cleanSubject}&body=${cleanBody}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleSendMailto = (e) => {
    e?.preventDefault();
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry');
    const cleanBody = encodeURIComponent(message.trim());
    window.location.href = `mailto:${recipient}?subject=${cleanSubject}&body=${cleanBody}`;
    onClose();
  };

  const handleDiscard = () => {
    setSubject('');
    setMessage('');
    onClose();
  };

  // Minimized Floating Pill docked at bottom-right
  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1e2024] hover:bg-[#25282d] border border-white/15 px-4 py-2.5 rounded-full shadow-2xl shadow-black/80 cursor-pointer text-xs font-medium text-white transition-all active:scale-95"
        onClick={() => setIsMinimized(false)}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
          <span>New Message {subject ? `— ${subject.slice(0, 18)}...` : '(Draft)'}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-zinc-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 ml-1"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-end sm:p-6 p-3">
        {/* Subtle tap-to-dismiss backdrop on mobile screens */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] sm:hidden pointer-events-auto"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className={`pointer-events-auto flex flex-col bg-[#141619] border border-white/15 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-full max-w-2xl h-[75vh]'
              : 'w-full max-w-lg sm:h-[480px] h-[450px]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e2126] border-b border-white/10 select-none">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-100">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#EA4335]/15 text-[#EA4335]">
                <Mail className="w-3 h-3" />
              </span>
              <span>New Message</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Direct Gmail
              </span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-zinc-400">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                title="Minimize"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors hidden sm:block"
                title={isExpanded ? 'Restore' : 'Expand'}
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex flex-col flex-1 bg-[#141619] text-xs font-sans">
            {/* "To" Field */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[11px] w-12">
                To
              </span>
              <div className="flex-1 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-zinc-200">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[9px] flex items-center justify-center">
                    T
                  </span>
                  <span className="font-medium text-xs">Tharun Chokkanathan</span>
                  <span className="text-zinc-400 font-mono text-[11px]">&lt;{recipient}&gt;</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors px-2 py-0.5 rounded hover:bg-white/5"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* "Subject" Field */}
            <div className="flex items-center px-4 py-2 border-b border-white/5">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[11px] w-12">
                Subject
              </span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject of your message..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none"
              />
            </div>

            {/* "Message" Body */}
            <div className="flex-1 p-4 flex flex-col">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here... I usually respond within a few hours!"
                className="w-full flex-1 bg-transparent text-zinc-200 placeholder-zinc-600 text-xs sm:text-sm resize-none focus:outline-none leading-relaxed"
                autoFocus
              />
            </div>

            {/* Footer Action Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#181a1d] border-t border-white/10">
              <div className="flex items-center gap-2">
                {/* Send via Modern Gmail Button */}
                <button
                  type="button"
                  onClick={handleSendGmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-[#1a73e8]/20"
                  title="Compose in modern Gmail Web App"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send in Gmail</span>
                </button>

                {/* Default Mail App Option */}
                <button
                  type="button"
                  onClick={handleSendMailto}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                  title="Open in your default desktop/mobile email client"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Default App</span>
                </button>
              </div>

              {/* Discard Draft */}
              <button
                type="button"
                onClick={handleDiscard}
                className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-colors"
                title="Discard message"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
