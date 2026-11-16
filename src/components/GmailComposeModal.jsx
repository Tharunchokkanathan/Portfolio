import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  ChevronDown,
  Paperclip,
  Link2,
  Smile,
  Image as ImageIcon,
  Lock,
  MoreVertical,
  Trash2,
  Check,
  Copy
} from 'lucide-react';

// Google Drive SVG Icon
const DriveIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5z" opacity="0.8" />
    <path d="M16.29 3.5H7.71l6.55 11.5h8.59z" opacity="0.6" />
    <path d="M22.85 15l-3.43 6H4.58l3.43-6z" opacity="0.9" />
  </svg>
);

// Formatting 'Aa' SVG Icon
const FormattingIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
  </svg>
);

// Signature Pen SVG Icon
const SignatureIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
  </svg>
);

export default function GmailComposeModal({
  isOpen,
  onClose,
  recipient = 'tharunchokkanc@gmail.com'
}) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSendMenu, setShowSendMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Focus textarea or subject on open
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2400);
  };

  const handleCopyRecipient = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(recipient);
    setCopied(true);
    showToast('Email address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendGmail = (e) => {
    e?.preventDefault();
    setShowSendMenu(false);
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry / Collaboration');
    const cleanBody = encodeURIComponent(
      message.trim() || 'Hi Tharun,\n\nI visited your portfolio and would like to connect regarding...'
    );
    let url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(recipient)}&su=${cleanSubject}&body=${cleanBody}`;
    if (cc.trim()) url += `&cc=${encodeURIComponent(cc.trim())}`;
    if (bcc.trim()) url += `&bcc=${encodeURIComponent(bcc.trim())}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening Gmail compose...');
    setTimeout(() => onClose(), 600);
  };

  const handleSendMailto = (e) => {
    e?.preventDefault();
    setShowSendMenu(false);
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry');
    const cleanBody = encodeURIComponent(message.trim());
    let mailto = `mailto:${recipient}?subject=${cleanSubject}&body=${cleanBody}`;
    if (cc.trim()) mailto += `&cc=${encodeURIComponent(cc.trim())}`;
    if (bcc.trim()) mailto += `&bcc=${encodeURIComponent(bcc.trim())}`;

    window.location.href = mailto;
    showToast('Opening email client...');
    setTimeout(() => onClose(), 600);
  };

  const handleDiscard = () => {
    setSubject('');
    setMessage('');
    setCc('');
    setBcc('');
    setShowCc(false);
    setShowBcc(false);
    onClose();
  };

  const insertEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
    textareaRef.current?.focus();
  };

  // Minimized state: sleek bottom-right dock bar exactly like Gmail minimized window
  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-0 right-6 z-50 flex items-center justify-between w-64 bg-[#f2f6fc] text-[#041e49] border border-[#dadce0] rounded-t-xl px-4 py-2.5 shadow-xl cursor-pointer hover:bg-[#e9eef6] transition-colors select-none"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#0b57d0]" />
          <span className="text-sm font-medium truncate">
            {subject.trim() ? subject : 'New Message'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="p-1 hover:bg-black/10 rounded text-[#444746]"
            title="Restore"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 hover:bg-black/10 rounded text-[#444746]"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-end sm:p-4 p-2">
        {/* Backdrop for mobile */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] sm:hidden pointer-events-auto"
          onClick={onClose}
        />

        {/* Gmail Compose Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className={`pointer-events-auto flex flex-col bg-white text-[#1f1f1f] rounded-t-2xl sm:rounded-2xl border border-[#dadce0] shadow-[0_8px_30px_rgb(0,0,0,0.28)] overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-full max-w-4xl h-[85vh] sm:h-[80vh]'
              : 'w-full max-w-[580px] h-[520px] sm:h-[510px]'
          }`}
        >
          {/* Top Bar Header: Exact Gmail `#f2f6fc` */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#f2f6fc] border-b border-[#e1e3e1] select-none">
            <span className="text-[13px] sm:text-[14px] font-medium text-[#041e49]">
              New Message
            </span>

            {/* Window Action Icons */}
            <div className="flex items-center gap-0.5 text-[#444746]">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 hidden sm:flex items-center justify-center rounded hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                title={isExpanded ? 'Exit full screen' : 'Full screen'}
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
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast notification inside modal */}
          {toastMessage && (
            <div className="bg-[#323232] text-white text-xs px-3 py-1.5 flex items-center justify-between animate-fade-in select-none">
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage('')}
                className="text-zinc-400 hover:text-white ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form Fields Container */}
          <div className="flex flex-col flex-1 bg-white overflow-hidden">
            {/* "To" Field Row */}
            <div className="flex items-center px-4 py-2 border-b border-[#f2f2f2] min-h-[42px] gap-2">
              <span className="text-[#444746] text-sm font-normal select-none w-7 shrink-0">
                To
              </span>

              <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                {/* Modern Contact Chip */}
                <div
                  onClick={handleCopyRecipient}
                  title="Click to copy email address"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] text-[#3c4043] text-xs font-medium cursor-pointer transition-colors group"
                >
                  <span className="w-4 h-4 rounded-full bg-[#0b57d0] text-white text-[10px] flex items-center justify-center font-bold">
                    T
                  </span>
                  <span>Tharun Chokkanathan</span>
                  <span className="text-[#5f6368] font-normal">&lt;{recipient}&gt;</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#5f6368] group-hover:text-black ml-1 opacity-70" />
                  )}
                </div>
              </div>

              {/* Cc / Bcc buttons on far right */}
              <div className="flex items-center gap-2 text-xs text-[#444746] font-medium shrink-0 select-none">
                {!showCc && (
                  <button
                    type="button"
                    onClick={() => setShowCc(true)}
                    className="hover:text-[#1f1f1f] hover:underline"
                  >
                    Cc
                  </button>
                )}
                {!showBcc && (
                  <button
                    type="button"
                    onClick={() => setShowBcc(true)}
                    className="hover:text-[#1f1f1f] hover:underline"
                  >
                    Bcc
                  </button>
                )}
              </div>
            </div>

            {/* Optional Cc row */}
            {showCc && (
              <div className="flex items-center px-4 py-1.5 border-b border-[#f2f2f2] gap-2">
                <span className="text-[#444746] text-sm select-none w-7 shrink-0">Cc</span>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="Recipients"
                  className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowCc(false)}
                  className="text-zinc-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Optional Bcc row */}
            {showBcc && (
              <div className="flex items-center px-4 py-1.5 border-b border-[#f2f2f2] gap-2">
                <span className="text-[#444746] text-sm select-none w-7 shrink-0">Bcc</span>
                <input
                  type="email"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="Recipients"
                  className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowBcc(false)}
                  className="text-zinc-400 hover:text-black text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* "Subject" Field Row */}
            <div className="flex items-center px-4 py-2 border-b border-[#f2f2f2]">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent"
              />
            </div>

            {/* Message Body Area */}
            <div className="flex-1 p-4 flex flex-col bg-white overflow-y-auto">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=""
                className="w-full flex-1 text-sm text-[#1f1f1f] outline-none resize-none bg-transparent leading-relaxed"
              />
            </div>

            {/* Bottom Toolbar: Exact Gmail Action Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-white border-t border-[#f2f2f2] select-none relative">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Send split button */}
                <div className="relative inline-flex items-center shadow-sm rounded-full">
                  <button
                    type="button"
                    onClick={handleSendGmail}
                    className="inline-flex items-center justify-center px-5 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white text-sm font-medium rounded-l-full transition-colors active:scale-[0.98]"
                    title="Send message via modern Gmail"
                  >
                    Send
                  </button>

                  <div className="w-[1px] h-9 bg-[#0842a0]" />

                  <button
                    type="button"
                    onClick={() => setShowSendMenu(!showSendMenu)}
                    className="inline-flex items-center justify-center px-2 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white rounded-r-full transition-colors active:scale-[0.98]"
                    title="More send options"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown for More Send Options */}
                  {showSendMenu && (
                    <div className="absolute bottom-12 left-0 w-60 bg-white border border-[#dadce0] rounded-xl shadow-xl py-1.5 z-50 text-xs text-[#1f1f1f]">
                      <button
                        type="button"
                        onClick={handleSendGmail}
                        className="w-full text-left px-3 py-2 hover:bg-[#f2f2f2] flex items-center justify-between"
                      >
                        <span className="font-medium">Send via Gmail Web App</span>
                        <span className="text-[10px] text-[#5f6368] font-mono">Recommended</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSendMailto}
                        className="w-full text-left px-3 py-2 hover:bg-[#f2f2f2]"
                      >
                        Send via Default Mail App (Desktop/Mobile)
                      </button>
                      <div className="my-1 border-t border-[#f2f2f2]" />
                      <button
                        type="button"
                        onClick={handleCopyRecipient}
                        className="w-full text-left px-3 py-2 hover:bg-[#f2f2f2] text-[#0b57d0] font-medium"
                      >
                        Copy {recipient}
                      </button>
                    </div>
                  )}
                </div>

                {/* Gmail Formatting / Attachment Icons */}
                <div className="hidden sm:flex items-center text-[#444746] ml-2">
                  <button
                    type="button"
                    onClick={() => showToast('Formatting bar active')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Formatting options"
                  >
                    <FormattingIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Ready to attach files')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Attach files"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const link = prompt('Enter URL to insert:');
                      if (link) insertEmoji(` ${link} `);
                    }}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Insert link"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEmoji(' 😊 ')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Insert emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Insert files using Google Drive')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Insert files using Drive"
                  >
                    <DriveIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Insert photo')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Insert photo"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Toggle confidential mode')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Toggle confidential mode"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEmoji('\n\nBest regards,\n')}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="Insert signature"
                  >
                    <SignatureIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSendMenu(!showSendMenu)}
                    className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Side: Trash / Discard Draft Button */}
              <div className="flex items-center text-[#444746]">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                  title="Discard draft"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
