'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language } from '@/types';
import { MessageSquare, X, Send, Sparkles, Bot, PhoneCall } from 'lucide-react';

interface AiAssistantWidgetProps {
  language: Language;
  onOpenContact?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({
  language,
  onOpenContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text:
      language === 'ID'
        ? "Halo! 👋 Saya Radya AI Assistant. Tanyakan apa saja tentang arsitektur Cloud Native, solusi AI, atau cara memulai proyek Anda bersama Radya Labs."
        : "Hi! 👋 I'm Radya AI assistant. Ask me about our cloud architecture, AI solutions, or how to get started with Radya Labs.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  useEffect(() => {
    // Reset initial message on language change if only welcome message exists
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([initialMessage]);
    }
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotReply = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('konsultasi') || q.includes('consult') || q.includes('contact') || q.includes('hubungi') || q.includes('gratis') || q.includes('free')) {
      return language === 'ID'
        ? "Anda dapat menjadwalkan konsultasi gratis langsung dengan tim C-Level kami! Silakan klik tombol 'Jadwalkan Konsultasi Gratis' di bagian atas atau bawah halaman untuk mengisi formulir."
        : "You can schedule a free consultation directly with our C-Level team! Click the 'Book a Free Consultation' button to get started.";
    }

    if (q.includes('cloud') || q.includes('aws') || q.includes('kubernetes') || q.includes('gcp') || q.includes('azure') || q.includes('microservice')) {
      return language === 'ID'
        ? "Radya Labs berpengalaman membangun arsitektur Cloud Native modern, migrasi Kubernetes, arsitektur Microservices, serta DevOps CI/CD berstandar enterprise dengan garansi 99.99% uptime."
        : "Radya Labs specializes in modern Cloud Native architectures, Kubernetes migration, Microservices, and enterprise DevOps CI/CD pipelines with 99.99% uptime guarantees.";
    }

    if (q.includes('ai') || q.includes('ocr') || q.includes('llm') || q.includes('chatbot') || q.includes('machine learning')) {
      return language === 'ID'
        ? "Solusi AI kami mencakup Enterprise OCR Intelligent Document Processing (seperti yang digunakan Nestlé), Generative AI Chatbot, Predictive Analytics, serta penyesuaian Custom LLM untuk bisnis Anda."
        : "Our AI solutions include Enterprise OCR Intelligent Document Processing (trusted by Nestlé), Generative AI Chatbots, Predictive Analytics, and Custom LLM integration for your business.";
    }

    if (q.includes('biaya') || q.includes('harga') || q.includes('cost') || q.includes('price') || q.includes('rate')) {
      return language === 'ID'
        ? "Estimasi biaya proyek disesuaikan dengan cakupan arsitektur dan kebutuhan sistem Anda. Hubungi tim kami untuk mendapatkan penawaran & estimasi waktu teknis."
        : "Project estimates are tailored to your architectural scope and technical requirements. Reach out to our team to get a detailed proposal & timeline.";
    }

    if (q.includes('portofolio') || q.includes('portfolio') || q.includes('klien') || q.includes('client') || q.includes('case study')) {
      return language === 'ID'
        ? "Kami telah dipercaya oleh organisasi terkemuka seperti Danone, Nestlé, BINUS University, Trans7, Kompas Gramedia, Kemendikbudristek, dan Anteraja."
        : "We are trusted by industry leaders including Danone, Nestlé, BINUS University, Trans7, Kompas Gramedia, Kemendikbudristek, and Anteraja.";
    }

    return language === 'ID'
      ? "Terima kasih atas pertanyaan Anda! Tim kami siap mendiskusikan tantangan teknis perusahaan Anda secara detail. Klik 'Jadwalkan Konsultasi Gratis' untuk terhubung dengan C-Level kami."
      : "Thank you for reaching out! Our team is ready to evaluate your enterprise technical roadmap. Click 'Book a Free Consultation' to connect with our C-Level team.";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: generateBotReply(userMsg.text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Cyan/Blue Pill Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#29B6F6] hover:bg-[#1793E8] text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-xl shadow-[#1793E8]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border border-white/20"
        >
          <MessageSquare className="w-4 h-4 fill-white/20" />
          <span>
            {language === 'ID' ? 'Chat dengan Asisten AI' : 'Chat with AI Assistant'}
          </span>
        </button>
      </div>

      {/* Popup AI Assistant Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col font-sans">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00D285] text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                R
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Radya AI Assistant</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#00D285] animate-pulse" />
                  <span>Instant enterprise guidance</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Close AI Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 space-y-3.5 h-80 overflow-y-auto bg-slate-50/60 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#1793E8] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    R
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-radya text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none font-normal'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[10px] block mt-1 text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#1793E8] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  R
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1793E8] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1793E8] animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1793E8] animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick CTA Prompt */}
          {onOpenContact && (
            <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-[#1793E8]">
              <span>{language === 'ID' ? 'Butuh diskusi teknis lebih lanjut?' : 'Need in-depth technical discussion?'}</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="hover:underline flex items-center gap-1 font-extrabold text-slate-900"
              >
                <span>{language === 'ID' ? 'Konsultasi' : 'Consult'}</span> →
              </button>
            </div>
          )}

          {/* Footer Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={language === 'ID' ? 'Ketik pesan...' : 'Type a message...'}
              className="flex-1 px-4 py-2.5 rounded-full border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1793E8] focus:ring-1 focus:ring-[#1793E8] placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-full bg-[#1793E8] hover:bg-[#0F172A] disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0 shadow-md"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
