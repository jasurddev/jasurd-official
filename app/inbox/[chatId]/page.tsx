'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [msgText, setMsgText] = useState('');
  const [myId, setMyId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Init Data (User & Messages)
  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      setMyId(user.id);

      // Ambil Info Conversation (Buat tau siapa lawan bicaranya)
      const { data: conversation } = await supabase
        .from('conversations')
        .select(`
          *,
          profile1:profiles!user1_id(*),
          profile2:profiles!user2_id(*)
        `)
        .eq('id', params.chatId)
        .single();

      if (conversation) {
        const isUser1 = conversation.user1_id === user.id;
        setOtherUser(isUser1 ? conversation.profile2 : conversation.profile1);
      }

      // Ambil Pesan Lama
      const { data: oldMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', params.chatId)
        .order('created_at', { ascending: true });

      if (oldMessages) setMessages(oldMessages);
    };

    initChat();
  }, [params.chatId, router, supabase]);

  // 2. Realtime Subscription
  useEffect(() => {
    const channel = supabase
      .channel(`chat_room_${params.chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${params.chatId}`,
        },
        (payload) => {
          // Kalau ada pesan baru masuk, tambahkan ke state
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.chatId, supabase]);

  // Auto Scroll ke Bawah
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. Kirim Pesan
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim() || !myId) return;

    const textToSend = msgText;
    setMsgText(''); // Kosongkan input biar cepet (Optimistic UI)

    // Insert ke Database
    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: params.chatId,
        sender_id: myId,
        content: textToSend
      });

    if (error) {
      console.error('Gagal kirim:', error);
      alert('Gagal kirim pesan');
    } else {
      // Update Last Message di Conversation (Biar di list inbox update)
      await supabase
        .from('conversations')
        .update({ 
          last_message: textToSend,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.chatId);
    }
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
            <img src={otherUser?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight">{otherUser?.full_name || "Loading..."}</h2>
            <p className="text-[10px] text-slate-500 font-bold">@{otherUser?.username}</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-24 pb-24 space-y-4 bg-pattern">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender_id === myId ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-3 rounded-2xl border-2 border-slate-900 shadow-sm relative group
              ${m.sender_id === myId 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white text-slate-900 rounded-bl-none'
              }
            `}>
              <p className="text-sm font-bold leading-relaxed">{m.content}</p>
              <span className={`text-[9px] font-bold mt-1 block text-right ${m.sender_id === myId ? 'text-indigo-200' : 'text-slate-400'}`}>
                {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-3 pb-6 z-50">
        <form onSubmit={handleSend} className="max-w-2xl mx-auto flex gap-2">
          <input 
            type="text" 
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            placeholder="Tulis pesan..." 
            className="flex-1 bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 font-bold text-sm outline-none transition-colors h-12"
          />
          <button type="submit" className="w-12 h-12 bg-primary text-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-hard active:shadow-none active:translate-y-0.5 transition">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

    </div>
  );
}
