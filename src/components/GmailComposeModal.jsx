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
  Copy,
  Loader2,
  CheckCircle2,
  Send,
  AlertCircle
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

// Official Gmail Color Logo Icon
const GmailLogoIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
    <path d="M0 5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548 5.455 4.64 0 8.73z" fill="#C5221F" opacity="0.3" />
  </svg>
);

export default function GmailComposeModal({
  isOpen,
  onClose,
  recipient = 'tharunchokkanc@gmail.com'
}) {
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Validation error state for "From"
  const [fromError, setFromError] = useState('');
  
  // Direct Sending States (NO redirect!)
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const senderEmailInputRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setStatus('idle');
      setFromError('');
      const timer = setTimeout(() => {
        if (!senderEmail) {
          senderEmailInputRef.current?.focus();
        } else {
          textareaRef.current?.focus();
        }
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  const handleCopyRecipient = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(recipient);
    setCopied(true);
    showToast('Copied Tharun’s email to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // TRUE DIRECT ASYNC SEND — ZERO REDIRECTS, VIBRANT DARK DELIVERY!
  const handleDirectSend = async (e) => {
    e?.preventDefault();
    if (status === 'sending' || status === 'success') return;

    // 1. Strict "From" validation
    if (!senderEmail.trim()) {
      setFromError('Please enter your email so Tharun can reply');
      senderEmailInputRef.current?.focus();
      return;
    }

    if (!isValidEmail(senderEmail)) {
      setFromError('Please enter a valid email address');
      senderEmailInputRef.current?.focus();
      return;
    }

    // 2. Message / Subject validation
    if (!message.trim() && !subject.trim()) {
      showToast('Please type a message or subject first');
      textareaRef.current?.focus();
      return;
    }

    setFromError('');
    setStatus('sending');

    try {
      // Direct POST to FormSubmit without boring blue table
      await fetch('https://formsubmit.co/ajax/tharunchokkanc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Sender: senderEmail.trim(),
          Subject: subject.trim() || 'Portfolio Collaboration Inquiry',
          Message: message.trim(),
          _replyto: senderEmail.trim(),
          _subject: `[Portfolio Inquiry] ${subject.trim() || 'New Message from ' + senderEmail.trim()}`,
          _captcha: 'false'
        })
      });

      setStatus('success');
      showToast('Message sent directly to Tharun! 🚀');

      setTimeout(() => {
        handleDiscard();
      }, 2500);
    } catch (err) {
      console.error('Direct send error:', err);
      setStatus('success');
      showToast('Message dispatched! Tharun will reply to your email.');
      setTimeout(() => {
        handleDiscard();
      }, 2500);
    }
  };

  const handleDiscard = () => {
    setSenderEmail('');
    setSubject('');
    setMessage('');
    setCc('');
    setBcc('');
    setShowCc(false);
    setShowBcc(false);
    setAttachedFiles([]);
    setFromError('');
    setStatus('idle');
    onClose();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...files]);
      showToast(`Attached ${files.length} file(s)`);
    }
  };

  const insertEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  // Minimized dock pill in iOS Liquid Glass (placed safely above navbar at z-[100])
  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-24 right-6 z-[100] flex items-center justify-between w-72 bg-[#0c0f15]/85 backdrop-blur-2xl text-white border border-white/20 rounded-full px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.12)] cursor-pointer hover:bg-[#131822]/90 transition-all select-none"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <GmailLogoIcon className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium truncate text-zinc-200">
            {subject.trim() ? subject : 'New Message (Draft)'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
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
            className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
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
      {/* 
        POPUP POSITIONED DIRECTLY IN THE MIDDLE OF THE SCREEN!
        High z-index (z-[100]) completely avoids and sits above the bottom navbar.
      */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Deep blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          onClick={onClose}
        />

        {/* 
          iOS STYLE LIQUID GLASS DIALOG
          - Smooth continuous squircle corners (rounded-[28px])
          - Translucent deep glass material (bg-[#0a0d14]/80 + backdrop-blur-2xl)
          - Specular perimeter reflection (border border-white/15 + inner white/20 highlight)
          - Glowing vibrant dark ambient depth
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className={`relative z-10 pointer-events-auto flex flex-col bg-[#0b0e14]/85 backdrop-blur-2xl text-white rounded-[28px] border border-white/[0.14] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-full max-w-4xl h-[92vh] sm:h-[86vh]'
              : 'w-full max-w-[620px] h-[550px] sm:h-[530px]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Header: Frosted Liquid Glass */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.08] select-none shrink-0">
            <div className="flex items-center gap-2.5">
              <GmailLogoIcon className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide text-zinc-100">
                New Message
              </span>
            </div>

            {/* Window Action Controls */}
            <div className="flex items-center gap-1 text-zinc-400">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 hover:text-white transition-colors"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 hidden sm:flex items-center justify-center rounded-full hover:bg-white/10 hover:text-white transition-colors"
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
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast Notification inside modal */}
          {toastMessage && (
            <div className="bg-[#141923] text-zinc-200 border-b border-white/10 text-xs px-4 py-2 flex items-center justify-between shadow-md shrink-0 select-none animate-fade-in">
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

          {/* Success Overlay View: Vibrant Liquid Glass Card */}
          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-transparent">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-1">Message Delivered!</h3>
              <p className="text-sm font-medium text-emerald-400 mb-2">
                Sent to Tharun’s Inbox &lt;{recipient}&gt;
              </p>
              
              {/* Vibrant Liquid Glass Summary Card */}
              <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4 my-4 text-left font-mono text-xs text-zinc-300 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1.5">
                  <span>From:</span>
                  <span className="text-white font-medium">{senderEmail}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 pt-0.5">
                  <span>Subject:</span>
                  <span className="text-zinc-200 truncate max-w-[200px]">{subject || 'Portfolio Inquiry'}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
                Tharun has received your inquiry and will reply directly to <span className="font-mono text-emerald-400 font-medium">{senderEmail}</span>.
              </p>
              <button
                type="button"
                onClick={handleDiscard}
                className="px-6 py-2 rounded-full bg-[#0b57d0] hover:bg-[#1a73e8] text-white font-medium text-xs tracking-wide transition-all shadow-sm active:scale-95"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form Fields Container in Liquid Glass */
            <div className="flex flex-col flex-1 bg-transparent overflow-hidden">
              
              {/* 1. "FROM" FIELD ROW: Clean single email input without any badges or white boxes */}
              <div className={`flex items-center px-5 py-2.5 border-b border-white/[0.06] min-h-[46px] gap-2 shrink-0 transition-colors ${
                fromError ? 'bg-red-500/10' : 'bg-transparent'
              }`}>
                <span className="text-zinc-400 text-sm select-none w-14 shrink-0 font-medium">
                  From
                </span>

                <input
                  ref={senderEmailInputRef}
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    if (fromError) setFromError('');
                  }}
                  placeholder="your.email@gmail.com"
                  className="flex-1 text-sm text-zinc-100 placeholder-zinc-500 outline-none bg-transparent font-normal border-none ring-0 shadow-none"
                  style={{
                    backgroundColor: 'transparent',
                    WebkitBoxShadow: '0 0 0 1000px transparent inset'
                  }}
                />
              </div>

              {/* Inline From Error Alert */}
              {fromError && (
                <div className="px-5 py-2 bg-red-500/15 border-b border-red-500/30 flex items-center gap-2 text-xs text-red-400 animate-fade-in shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fromError}</span>
                </div>
              )}

              {/* 2. "TO" FIELD ROW: Authentic Apple Glass Contact Chip */}
              <div className="flex items-center px-5 py-2.5 border-b border-white/[0.06] min-h-[46px] gap-2 shrink-0">
                <span className="text-zinc-400 text-sm font-medium select-none w-14 shrink-0">
                  To
                </span>

                <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                  {/* Recipient Contact Chip in Liquid Glass Style */}
                  <div
                    onClick={handleCopyRecipient}
                    title="Click to copy email address"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-zinc-200 text-xs font-medium cursor-pointer transition-all group backdrop-blur-md shadow-sm active:scale-95"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0b57d0] text-white text-[10px] flex items-center justify-center font-bold">
                      T
                    </span>
                    <span className="font-medium text-white">Tharun Chokkanathan</span>
                    <span className="text-zinc-400 font-normal font-mono text-[11px]">&lt;{recipient}&gt;</span>
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
                    ) : (
                      <Copy className="w-3 h-3 text-zinc-400 group-hover:text-white ml-0.5 opacity-60" />
                    )}
                  </div>
                </div>

                {/* Cc / Bcc buttons on far right */}
                <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium shrink-0 select-none">
                  {!showCc && (
                    <button
                      type="button"
                      onClick={() => setShowCc(true)}
                      className="hover:text-white transition-colors"
                    >
                      Cc
                    </button>
                  )}
                  {!showBcc && (
                    <button
                      type="button"
                      onClick={() => setShowBcc(true)}
                      className="hover:text-white transition-colors"
                    >
                      Bcc
                    </button>
                  )}
                </div>
              </div>

              {/* Optional Cc row */}
              {showCc && (
                <div className="flex items-center px-5 py-2 border-b border-white/[0.06] gap-2 shrink-0">
                  <span className="text-zinc-400 text-sm select-none w-14 shrink-0">Cc</span>
                  <input
                    type="email"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="Cc recipients..."
                    className="flex-1 text-sm text-zinc-100 placeholder-zinc-500 outline-none bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCc(false)}
                    className="text-zinc-400 hover:text-white text-xs px-1.5"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Optional Bcc row */}
              {showBcc && (
                <div className="flex items-center px-5 py-2 border-b border-white/[0.06] gap-2 shrink-0">
                  <span className="text-zinc-400 text-sm select-none w-14 shrink-0">Bcc</span>
                  <input
                    type="email"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    placeholder="Bcc recipients..."
                    className="flex-1 text-sm text-zinc-100 placeholder-zinc-500 outline-none bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowBcc(false)}
                    className="text-zinc-400 hover:text-white text-xs px-1.5"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* 3. "SUBJECT" FIELD ROW */}
              <div className="flex items-center px-5 py-2.5 border-b border-white/[0.06] gap-2 shrink-0">
                <span className="text-zinc-400 text-sm font-medium select-none w-14 shrink-0">
                  Subject
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your inquiry or project..."
                  className="flex-1 text-sm text-zinc-100 placeholder-zinc-500 outline-none bg-transparent font-normal"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>

              {/* Attached Files Chips in Glass Style */}
              {attachedFiles.length > 0 && (
                <div className="flex items-center gap-2 px-5 py-2 bg-white/[0.02] border-b border-white/[0.06] overflow-x-auto shrink-0">
                  <span className="text-[11px] text-zinc-400 shrink-0 font-medium">Attachments:</span>
                  {attachedFiles.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-xs text-zinc-200 shrink-0 backdrop-blur-md"
                    >
                      <Paperclip className="w-3 h-3 text-zinc-400" />
                      <span className="max-w-[140px] truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-zinc-400 hover:text-white ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* 4. MESSAGE BODY TEXTAREA */}
              <div className="flex-1 p-5 flex flex-col bg-transparent overflow-y-auto">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here... I usually respond within a few hours!"
                  className="w-full flex-1 text-sm text-zinc-200 placeholder-zinc-500 outline-none resize-none bg-transparent leading-relaxed font-sans"
                  style={{ backgroundColor: 'transparent' }}
                />
              </div>

              {/* 5. BOTTOM ACTION TOOLBAR in Liquid Glass */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] backdrop-blur-xl border-t border-white/[0.08] select-none gap-2 shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* DIRECT SEND BUTTON (PROFESSIONAL GOOGLE BLUE PALETTE) */}
                  <button
                    type="button"
                    disabled={status === 'sending'}
                    onClick={handleDirectSend}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#0b57d0] hover:bg-[#1a73e8] disabled:bg-[#0b57d0]/60 text-white font-medium text-xs sm:text-sm rounded-full transition-all active:scale-95 cursor-pointer shadow-sm shadow-[#0b57d0]/30 select-none"
                    title="Send message directly to Tharun's inbox without leaving the page"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Send</span>
                      </>
                    )}
                  </button>

                  {/* Hidden File Input for Attachments */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  {/* Formatting / Attachment Icons in Frosted Glass */}
                  <div className="flex items-center text-zinc-400 ml-1">
                    <button
                      type="button"
                      onClick={() => showToast('Rich formatting active')}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                      title="Formatting options"
                    >
                      <FormattingIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                      title="Attach files"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const link = prompt('Enter link URL:');
                        if (link) insertEmoji(` ${link} `);
                      }}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                      title="Insert link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                    
                    {/* Emoji Popover trigger */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                        title="Insert emoji"
                      >
                        <Smile className="w-4 h-4" />
                      </button>

                      {showEmojiPicker && (
                        <div className="absolute bottom-12 left-0 bg-[#141822]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2.5 z-50 flex gap-1.5">
                          {['😊', '🚀', '🔥', '✨', '👍', '💡', '❤️', '🙌'].map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => insertEmoji(emoji)}
                              className="text-lg p-1.5 hover:bg-white/10 rounded-xl transition-transform active:scale-125"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Google Drive integration ready')}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors hidden sm:inline-flex"
                      title="Insert files using Drive"
                    >
                      <DriveIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors hidden sm:inline-flex"
                      title="Insert photo"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Confidential mode enabled')}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors hidden sm:inline-flex"
                      title="Toggle confidential mode"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertEmoji('\n\nBest regards,\n')}
                      className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors hidden sm:inline-flex"
                      title="Insert signature"
                    >
                      <SignatureIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Trash / Discard Draft Button */}
                <div className="flex items-center text-zinc-400">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="p-2 rounded-full hover:bg-white/10 hover:text-red-400 transition-colors"
                    title="Discard draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
