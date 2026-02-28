'use client';

import { useState } from 'react';
import { Message } from './ChatInterface';

// Simple markdown-like formatting
function formatText(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const processInline = (line: string): React.ReactNode => {
    const parts = line.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('__') && part.endsWith('__')) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      const italicParts = part.split(/(\*[^*]+\*|_[^_]+_)/g);
      return italicParts.map((ip, j) => {
        if ((ip.startsWith('*') && ip.endsWith('*') && !ip.startsWith('**')) ||
          (ip.startsWith('_') && ip.endsWith('_') && !ip.startsWith('__'))) {
          return <em key={`${i}-${j}`} className="italic">{ip.slice(1, -1)}</em>;
        }
        return ip;
      });
    });
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
          {listItems.map((item, i) => (
            <li key={i} className="text-inherit">{processInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h4 key={index} className="font-bold text-base mt-3 mb-1">{processInline(trimmed.slice(4))}</h4>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h3 key={index} className="font-bold text-lg mt-3 mb-1">{processInline(trimmed.slice(3))}</h3>);
    } else if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(<h2 key={index} className="font-bold text-xl mt-3 mb-1">{processInline(trimmed.slice(2))}</h2>);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^[-*]\s|^\d+\.\s/, '');
      listItems.push(content);
    } else if (trimmed === '') {
      flushList();
      elements.push(<div key={index} className="h-2" />);
    } else {
      flushList();
      elements.push(<p key={index} className="my-1">{processInline(trimmed)}</p>);
    }
  });

  flushList();
  return elements;
}

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${isUser
          ? 'bg-gradient-to-br from-blue-500 to-indigo-500'
          : 'bg-gradient-to-br from-emerald-500 to-teal-500'
        }`}>
        {isUser ? 'U' : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </div>

      {/* Message Bubble */}
      <div className="max-w-[80%]">
        <div className={`rounded-2xl px-4 py-3 ${isUser
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-tr-md'
            : 'bg-gray-100 text-gray-800 rounded-tl-md'
          }`}>
          <div className="text-sm leading-relaxed">
            {isUser ? message.text : formatText(message.text)}
          </div>
          <div className={`text-[10px] mt-1.5 ${isUser ? 'text-emerald-100' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Thumbs feedback for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-1 ml-1">
            <button
              onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
              className={`p-1 rounded-md transition-all ${feedback === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'
                }`}
              title="Helpful"
            >
              <svg className="w-3.5 h-3.5" fill={feedback === 'up' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className={`p-1 rounded-md transition-all ${feedback === 'down' ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'
                }`}
              title="Not helpful"
            >
              <svg className="w-3.5 h-3.5" fill={feedback === 'down' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>
            {feedback && (
              <span className="text-[10px] text-gray-400 ml-1">
                {feedback === 'up' ? 'Thanks for the feedback!' : 'We\'ll improve this'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}