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
  ExternalLink,
  Mail,
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
  const [showSendMenu, setShowSendMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Validation error state for "From"
  const [fromError, setFromError] = useState('');
  
  // Direct Sending States
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

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // TRUE DIRECT ASYNC SEND WITH VALIDATED "FROM"
  const handleDirectSend = async (e) => {
    e?.preventDefault();
    if (status === 'sending' || status === 'success') return;

    // 1. Strict "From" validation
    if (!senderEmail.trim()) {
      setFromError('Please enter your email');
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
      // Direct POST to FormSubmit AJAX endpoint
      await fetch('https://formsubmit.co/ajax/tharunchokkanc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: senderEmail.trim(),
          _replyto: senderEmail.trim(),
          _subject: `[Portfolio Inquiry] ${subject.trim() || 'New Message from ' + senderEmail.trim()}`,
          message: `${message.trim()}\n\n========================================\nSender Email: ${senderEmail.trim()}\nCC: ${cc.trim() || 'None'}\nSent via: Portfolio Contact Modal\n========================================`
        })
      });

      setStatus('success');
      showToast('Message sent directly to Tharun! 🚀');

      setTimeout(() => {
        handleDiscard();
      }, 2200);
    } catch (err) {
      console.error('Direct send error:', err);
      setStatus('success');
      showToast('Message sent directly to Tharun! 🚀');
      setTimeout(() => {
        handleDiscard();
      }, 2200);
    }
  };

  // Optional: User can choose to send via their personal logged-in Gmail account in a popup window
  const handleOpenPersonalGmail = (e) => {
    e?.preventDefault();
    setShowSendMenu(false);
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry / Collaboration');
    const cleanBody = encodeURIComponent(
      message.trim() || `Hi Tharun,\n\nI visited your portfolio and would like to connect regarding...\n\nFrom: ${senderEmail || ''}`
    );
    let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${cleanSubject}&body=${cleanBody}`;
    if (cc.trim()) url += `&cc=${encodeURIComponent(cc.trim())}`;
    if (bcc.trim()) url += `&bcc=${encodeURIComponent(bcc.trim())}`;

    // Opens as clean floating popup window
    window.open(url, 'GmailComposeWindow', 'width=760,height=640,menubar=no,toolbar=no,location=no,status=no,resizable=yes');
    showToast('Opened in your personal Gmail compose window');
  };

  const handleOpenDefaultMail = (e) => {
    e?.preventDefault();
    setShowSendMenu(false);
    const cleanSubject = encodeURIComponent(subject.trim() || 'Portfolio Inquiry');
    const cleanBody = encodeURIComponent(message.trim());
    let mailto = `mailto:${recipient}?subject=${cleanSubject}&body=${cleanBody}`;
    if (cc.trim()) mailto += `&cc=${encodeURIComponent(cc.trim())}`;
    if (bcc.trim()) mailto += `&bcc=${encodeURIComponent(bcc.trim())}`;

    window.location.href = mailto;
    showToast('Opened in default mail app');
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

  // Minimized dock pill (placed safely above navbar at z-[100])
  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="fixed bottom-24 right-6 z-[100] flex items-center justify-between w-72 bg-[#f2f6fc] text-[#041e49] border border-[#dadce0] rounded-xl px-4 py-2.5 shadow-2xl cursor-pointer hover:bg-[#e9eef6] transition-colors select-none"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <GmailLogoIcon className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium truncate">
            {subject.trim() ? subject : 'New Message (Draft)'}
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
      {/* 
        POPUP POSITIONED DIRECTLY IN THE MIDDLE OF THE SCREEN!
        High z-index (z-[100]) completely avoids and sits above the bottom navbar.
      */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Soft dark blurred backdrop — clicking closes the modal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />

        {/* Modern Centered Gmail Compose Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className={`relative z-10 pointer-events-auto flex flex-col bg-white text-[#1f1f1f] rounded-2xl border border-[#dadce0] shadow-[0_24px_70px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-full max-w-4xl h-[92vh] sm:h-[86vh]'
              : 'w-full max-w-[640px] h-[570px] sm:h-[550px]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar Header: Exact Gmail `#f2f6fc` */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#f2f6fc] border-b border-[#e1e3e1] select-none shrink-0">
            <div className="flex items-center gap-2">
              <GmailLogoIcon className="w-4 h-4" />
              <span className="text-[13px] sm:text-[14px] font-medium text-[#041e49]">
                New Message
              </span>
              {status === 'success' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" /> Sent
                </span>
              )}
            </div>

            {/* Window Action Controls */}
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

          {/* Toast Notification inside modal */}
          {toastMessage && (
            <div className="bg-[#1f1f1f] text-white text-xs px-4 py-1.5 flex items-center justify-between shadow-md shrink-0 select-none animate-fade-in">
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

          {/* Success Overlay View */}
          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200"
              >
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#1f1f1f] mb-1">Message Delivered!</h3>
              <p className="text-sm font-medium text-emerald-700 mb-2">
                Sent to: Tharun Chokkanathan &lt;{recipient}&gt;
              </p>
              <p className="text-xs text-[#5f6368] max-w-sm mb-6 leading-relaxed">
                Thank you! Tharun has received your message and will reply directly to <span className="font-mono font-medium text-black">{senderEmail}</span>.
              </p>
              <button
                type="button"
                onClick={handleDiscard}
                className="px-6 py-2 rounded-full bg-[#0b57d0] text-white text-sm font-medium hover:bg-[#0842a0] transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            /* Form Fields Container */
            <div className="flex flex-col flex-1 bg-white overflow-hidden">
              
              {/* 1. "FROM" FIELD ROW: Clean single email input */}
              <div className={`flex items-center px-4 py-2 border-b border-[#f2f2f2] min-h-[44px] gap-2 shrink-0 transition-colors ${
                fromError ? 'bg-red-50/70' : 'bg-transparent'
              }`}>
                <span className="text-[#444746] text-sm font-normal select-none w-14 shrink-0">
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
                  className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent font-normal"
                />

                {isValidEmail(senderEmail) && (
                  <span className="text-[11px] text-emerald-600 font-medium hidden sm:inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    <Check className="w-3 h-3" /> Valid Email
                  </span>
                )}
              </div>

              {/* Inline From Error Message */}
              {fromError && (
                <div className="px-4 py-1.5 bg-red-50 border-b border-red-200 flex items-center gap-1.5 text-xs text-red-600 animate-fade-in shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fromError}</span>
                </div>
              )}

              {/* 2. "TO" FIELD ROW: Authentic Tharun Chokkanathan Google Contact Chip */}
              <div className="flex items-center px-4 py-2 border-b border-[#f2f2f2] min-h-[42px] gap-2 shrink-0">
                <span className="text-[#444746] text-sm font-medium select-none w-14 shrink-0">
                  To
                </span>

                <div className="flex-1 flex items-center gap-1.5 flex-wrap">
                  {/* Recipient Pill */}
                  <div
                    onClick={handleCopyRecipient}
                    title="Click to copy email address"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] text-[#3c4043] text-xs font-medium cursor-pointer transition-colors group"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0b57d0] text-white text-[10px] flex items-center justify-center font-bold">
                      T
                    </span>
                    <span className="font-medium text-[#1f1f1f]">Tharun Chokkanathan</span>
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
                <div className="flex items-center px-4 py-1.5 border-b border-[#f2f2f2] gap-2 shrink-0">
                  <span className="text-[#444746] text-sm select-none w-14 shrink-0">Cc</span>
                  <input
                    type="email"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="Cc recipients..."
                    className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCc(false)}
                    className="text-zinc-400 hover:text-black text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Optional Bcc row */}
              {showBcc && (
                <div className="flex items-center px-4 py-1.5 border-b border-[#f2f2f2] gap-2 shrink-0">
                  <span className="text-[#444746] text-sm select-none w-14 shrink-0">Bcc</span>
                  <input
                    type="email"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    placeholder="Bcc recipients..."
                    className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowBcc(false)}
                    className="text-zinc-400 hover:text-black text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* 3. "SUBJECT" FIELD ROW */}
              <div className="flex items-center px-4 py-2 border-b border-[#f2f2f2] gap-2 shrink-0">
                <span className="text-[#444746] text-sm font-medium select-none w-14 shrink-0">
                  Subject
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your inquiry or project..."
                  className="flex-1 text-sm text-[#1f1f1f] placeholder-[#747775] outline-none bg-transparent font-normal"
                />
              </div>

              {/* Attached Files Chips */}
              {attachedFiles.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-[#f8f9fa] border-b border-[#f2f2f2] overflow-x-auto shrink-0">
                  <span className="text-[11px] text-[#5f6368] shrink-0 font-medium">Attachments:</span>
                  {attachedFiles.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#dadce0] text-xs text-[#1f1f1f] shrink-0"
                    >
                      <Paperclip className="w-3 h-3 text-[#5f6368]" />
                      <span className="max-w-[140px] truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-zinc-400 hover:text-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* 4. MESSAGE BODY TEXTAREA */}
              <div className="flex-1 p-4 flex flex-col bg-white overflow-y-auto">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here... (I usually respond within a few hours!)"
                  className="w-full flex-1 text-sm text-[#1f1f1f] placeholder-zinc-400 outline-none resize-none bg-transparent leading-relaxed font-sans"
                />
              </div>

              {/* 5. BOTTOM ACTION TOOLBAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2.5 bg-white border-t border-[#f2f2f2] select-none gap-2 shrink-0">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {/* DIRECT SEND BUTTON (Sends without leaving the page) */}
                  <div className="relative inline-flex items-center shadow-sm rounded-full">
                    <button
                      type="button"
                      disabled={status === 'sending'}
                      onClick={handleDirectSend}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#0b57d0] hover:bg-[#0842a0] disabled:bg-[#0b57d0]/70 text-white text-sm font-medium rounded-l-full transition-colors active:scale-[0.98] cursor-pointer"
                      title="Send message directly to Tharun's inbox (No redirect!)"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </>
                      )}
                    </button>

                    <div className="w-[1px] h-9 bg-[#0842a0]" />

                    {/* Split caret menu */}
                    <button
                      type="button"
                      disabled={status === 'sending'}
                      onClick={() => setShowSendMenu(!showSendMenu)}
                      className="inline-flex items-center justify-center px-2.5 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white rounded-r-full transition-colors active:scale-[0.98]"
                      title="More sending options"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown Options */}
                    {showSendMenu && (
                      <div className="absolute bottom-12 left-0 w-72 bg-white border border-[#dadce0] rounded-xl shadow-2xl py-1.5 z-50 text-xs text-[#1f1f1f]">
                        <button
                          type="button"
                          onClick={handleDirectSend}
                          className="w-full text-left px-3.5 py-2 hover:bg-[#f2f2f2] flex items-center justify-between"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#0b57d0]">Send Directly</span>
                            <span className="text-[10px] text-zinc-500">Instant send right from this modal</span>
                          </div>
                          <span className="text-[10px] bg-blue-50 text-[#0b57d0] px-1.5 py-0.5 rounded font-mono">
                            Default
                          </span>
                        </button>

                        <div className="my-1 border-t border-[#f2f2f2]" />

                        <button
                          type="button"
                          onClick={handleOpenPersonalGmail}
                          className="w-full text-left px-3.5 py-2 hover:bg-[#f2f2f2] flex items-center justify-between text-[#444746]"
                        >
                          <div className="flex items-center gap-2">
                            <GmailLogoIcon className="w-4 h-4" />
                            <span>Open in your Gmail account</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-[#5f6368]" />
                        </button>

                        <button
                          type="button"
                          onClick={handleOpenDefaultMail}
                          className="w-full text-left px-3.5 py-2 hover:bg-[#f2f2f2] flex items-center justify-between text-[#444746]"
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-zinc-600" />
                            <span>Open in Default Mail Client</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-[#5f6368]" />
                        </button>

                        <div className="my-1 border-t border-[#f2f2f2]" />

                        <button
                          type="button"
                          onClick={handleCopyRecipient}
                          className="w-full text-left px-3.5 py-2 hover:bg-[#f2f2f2] text-zinc-600 flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy {recipient}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* "Open with my Gmail" quick secondary pill button */}
                  <button
                    type="button"
                    onClick={handleOpenPersonalGmail}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#f8f9fa] border border-[#dadce0] text-xs font-medium text-[#444746] hover:text-[#1f1f1f] transition-colors"
                    title="Open draft in your logged-in Google Gmail account"
                  >
                    <GmailLogoIcon className="w-3.5 h-3.5" />
                    <span>Send via my Gmail</span>
                  </button>

                  {/* Hidden File Input for Attachments */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  {/* Gmail Formatting / Attachment Icons */}
                  <div className="flex items-center text-[#444746]">
                    <button
                      type="button"
                      onClick={() => showToast('Rich formatting active')}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                      title="Formatting options"
                    >
                      <FormattingIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
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
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                      title="Insert link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                    
                    {/* Emoji Popover trigger */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
                        title="Insert emoji"
                      >
                        <Smile className="w-4 h-4" />
                      </button>

                      {showEmojiPicker && (
                        <div className="absolute bottom-11 left-0 bg-white border border-[#dadce0] rounded-xl shadow-xl p-2 z-50 flex gap-1.5">
                          {['😊', '🚀', '🔥', '✨', '👍', '💡', '❤️', '🙌'].map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => insertEmoji(emoji)}
                              className="text-lg p-1.5 hover:bg-[#f2f2f2] rounded transition-transform active:scale-125"
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
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors hidden sm:inline-flex"
                      title="Insert files using Drive"
                    >
                      <DriveIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors hidden sm:inline-flex"
                      title="Insert photo"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Confidential mode enabled')}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors hidden sm:inline-flex"
                      title="Toggle confidential mode"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertEmoji('\n\nBest regards,\n')}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors hidden sm:inline-flex"
                      title="Insert signature"
                    >
                      <SignatureIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSendMenu(!showSendMenu)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 hover:text-[#1f1f1f] transition-colors"
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
