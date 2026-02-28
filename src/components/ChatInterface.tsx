'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  { text: "I have a headache", icon: "🤕" },
  { text: "Check my symptoms", icon: "🩺" },
  { text: "Fever treatment options", icon: "🌡️" },
  { text: "Medicine dosage for children", icon: "👶" },
  { text: "Drug interaction check", icon: "💊" },
  { text: "When should I see a doctor?", icon: "🏥" },
];

// Session storage key for chat history
const CHAT_STORAGE_KEY = 'PeaceMatcher_chat_history';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Save chat to sessionStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error || `HTTP ${response.status}: Failed to get response`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'No response received',
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error sending message:', errorMessage);
      setError(errorMessage);

      const errorMessageDisplay: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I couldn't process your request. Please try again.\n\n_Error: ${errorMessage}_`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessageDisplay]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
  };

  const handleExportPDF = () => {
    if (messages.length === 0) return;
    const content = messages.map(m => {
      const time = m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sender = m.sender === 'user' ? '👤 You' : '🤖 PeaceMatcher AI';
      return `<div style="margin-bottom:16px;padding:12px;border-radius:8px;background:${m.sender === 'user' ? '#f0fdf4' : '#f8fafc'}">
        <div style="font-weight:600;color:${m.sender === 'user' ? '#059669' : '#0d9488'};margin-bottom:4px;font-size:13px">${sender} · ${time}</div>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#1e293b">${m.text}</div>
      </div>`;
    }).join('');

    const html = `<!DOCTYPE html><html><head><title>PeaceMatcher Health Report</title>
      <style>body{font-family:system-ui,-apple-system,sans-serif;max-width:700px;margin:0 auto;padding:32px;color:#1e293b}
      .header{text-align:center;border-bottom:2px solid #059669;padding-bottom:16px;margin-bottom:24px}
      .disclaimer{margin-top:24px;padding:12px;background:#fef3c7;border-radius:8px;font-size:12px;color:#92400e}
      @media print{body{padding:16px}}</style></head>
      <body><div class="header"><h1 style="color:#059669;margin:0">PeaceMatcher</h1><p style="color:#64748b;margin:4px 0">AI Health Consultation Report</p>
      <p style="font-size:12px;color:#94a3b8">${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p></div>
      ${content}
      <div class="disclaimer">⚠️ <strong>Medical Disclaimer:</strong> This report contains AI-generated health information and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</div>
      </body></html>`;

    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">PeaceMatcher AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-500">Online · Powered by Gemini AI</span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleExportPDF}
              className="text-xs text-gray-400 hover:text-emerald-600 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Export as PDF"
            >
              📄 Export
            </button>
            <button
              onClick={handleClearChat}
              className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear chat
            </button>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">How can I help you today?</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
              Ask me about symptoms, medications, dosages, or any health-related questions.
            </p>

            {/* Suggested Prompts */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-emerald-50 rounded-xl text-sm text-gray-700 hover:text-emerald-700 transition-all border border-gray-100 hover:border-emerald-200 text-left"
                >
                  <span className="text-lg">{prompt.icon}</span>
                  <span className="font-medium">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 p-4 bg-gray-50/50">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        <p className="text-[10px] text-gray-400 text-center mt-2">
          PeaceMatcher AI provides health information only. Always consult a doctor for medical decisions.
        </p>
      </div>
    </div>
  );
}