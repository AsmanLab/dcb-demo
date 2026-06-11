'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT, useLang } from './providers';
import { getBotResponse, getStarterMessage } from '@/lib/chat';
import type { ChatMessage } from '@/lib/chat';

let msgCounter = 0;
function nextId() { return String(++msgCounter); }

export function ChatWidget() {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedLang = useRef<string | null>(null);

  // Listen for external open-chat event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('dcb:open-chat', handler);
    return () => window.removeEventListener('dcb:open-chat', handler);
  }, []);

  // Initialize / reinitialize starter message when language changes
  useEffect(() => {
    if (initializedLang.current !== lang) {
      initializedLang.current = lang;
      const starter = getStarterMessage(lang);
      setMessages([{ ...starter, id: nextId() }]);
    }
  }, [lang]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    setTyping(false);

    const resp = getBotResponse(text, lang);
    const botMsg: ChatMessage = {
      id: nextId(),
      role: 'bot',
      text: resp.text,
      chips: resp.chips,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMsg]);
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChip = (chip: string) => {
    sendMessage(chip);
  };

  // Format bot message text — bold **...**
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // Render line breaks
      return part.split('\n').map((line, j) => (
        <React.Fragment key={`${i}-${j}`}>{j > 0 && <br />}{line}</React.Fragment>
      ));
    });
  };

  return (
    <>
      {/* Launcher button */}
      <div className="fixed bottom-6 right-6 z-40" aria-label="Открыть чат с AI-консультантом">
        <motion.button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Закрыть чат' : 'Открыть AI-консультант'}
          aria-expanded={open}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-brand flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(228,0,43,0.6)] relative"
        >
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[var(--bg)] animate-pulse" aria-hidden="true" />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}
                width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-96 bg-[var(--bg)] rounded-3xl border border-[var(--border)] shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(560px, calc(100vh - 8rem))' }}
            role="dialog"
            aria-modal="true"
            aria-label={t('chat.title')}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(228,0,43,0.5)] flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text)] truncate">{t('chat.title')}</p>
                <p className="text-xs text-[var(--muted)] truncate">{t('chat.subtitle')}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть чат"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" aria-live="polite" aria-relevant="additions">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brand text-white rounded-br-sm'
                          : 'bg-[var(--surface)] text-[var(--text)] rounded-bl-sm border border-[var(--border)]'
                      }`}
                    >
                      {renderText(msg.text)}
                    </div>
                  </div>
                  {/* Quick reply chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                      {msg.chips.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => handleChip(chip)}
                          className="px-3 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--text)] hover:border-brand/50 hover:bg-brand/5 transition-all"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[var(--surface)] border border-[var(--border)] px-4 py-2.5 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1 items-center h-4" aria-label={t('chat.typing')}>
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-[var(--border)] flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                aria-label={t('chat.placeholder')}
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-brand/50 transition-colors"
                disabled={typing}
              />
              <button
                type="submit"
                aria-label={t('chat.send')}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity hover:bg-brand-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none"/>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
