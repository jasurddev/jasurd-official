'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ChatRoomPage() {
  const params = useParams();
  const [msg, setMsg] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock Messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo kak, jasa rakit PC nya masih available?", sender: "me", time: "10:00" },
    { id: 2, text: "Masih dong kak! Mau spek gimana?", sender: "them", time: "10:05" },
    { id: 3, text: "Budget 10jt dapet apa ya?", sender: "me", time: "10:06" },
    { id: 4, text: "Wah mantap tuh. Bisa dapet RTX 3060 + i5 Gen 12. Mau aku buatin rinciannya?", sender: "them", time: "10:10" },
  ]);

  // Auto Scroll to Bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    
    const newMsg = { id: Date.now(), text: msg, sender: "me", time: "Now" };
    setMessages([...messages, newMsg]);
    setMsg('');

    // Simulasi Reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Siap, ditunggu ya kak!", sender: "them", time: "Now" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      
      {/* Header Chat */}
      <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur border-b-2 border-slate-900 z-50 px-4 py-3 flex items-center gap-3 pt-safe-top">
        <Link href="/inbox" className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center hover:bg-slate-100 transition">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden relative">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight">AlexTech</h2>
            <p className="text-[10px] text-green-600 font-bold">Online</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-24 pb-24 space-y-4 bg-pattern">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-3 rounded-2xl border-2 border-slate-900 shadow-sm relative group
              ${m.sender === 'me' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white text-slate-900 rounded-bl-none'
              }
            `}>
              <p className="text-sm font-bold leading-relaxed">{m.text}</p>
              <span className={`text-[9px] font-bold mt-1 block text-right ${m.sender === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-3 pb-6 z-50">
        <form onSubmit={handleSend} className="max-w-2xl mx-auto flex gap-2">
          <button type="button" className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-200 transition">
            <i className="fa-solid fa-plus"></i>
          </button>
          <input 
            type="text" 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Tulis pesan..." 
            className="flex-1 bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 font-bold text-sm outline-none transition-colors"
          />
          <button type="submit" className="w-12 h-12 bg-primary text-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-hard active:shadow-none active:translate-y-0.5 transition">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

    </div>
  );
}