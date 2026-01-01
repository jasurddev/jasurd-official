'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function InboxPage() {
  const supabase = createClient();
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setMyId(user.id);

      // Fetch Conversations + Data Profile Lawan Bicara
      // Kita ambil profile user1 dan user2 sekaligus
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          profile1:profiles!user1_id(id, full_name, username, avatar_url),
          profile2:profiles!user2_id(id, full_name, username, avatar_url)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching chats:', error);
      } else {
        // Format data biar gampang dipake (Tentukan siapa lawan bicara)
        const formattedChats = data.map((chat: any) => {
          const isUser1 = chat.user1_id === user.id;
          const otherUser = isUser1 ? chat.profile2 : chat.profile1;
          
          return {
            id: chat.id,
            otherUser: otherUser,
            lastMsg: chat.last_message || "Mulai obrolan...",
            time: new Date(chat.updated_at).toLocaleDateString(),
            unread: 0 // Nanti bisa dikembangin logic unread-nya
          };
        });
        setChats(formattedChats);
      }
      setLoading(false);
    };

    fetchChats();
  }, [router, supabase]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-900"></i></div>;

  return (
    <div className="min-h-screen bg-white pb-24 pt-16 md:pt-20">
      
      {/* Header */}
      <div className="fixed top-16 md:top-20 left-0 w-full bg-white/95 backdrop-blur border-b-2 border-slate-900 z-30 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Inbox 💬</h1>
        <button className="text-xs font-bold text-primary hover:underline">Mark all read</button>
      </div>

      {/* Chat List */}
      <div className="mt-14 px-4 md:px-6 max-w-2xl mx-auto space-y-2">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Link 
              key={chat.id}
              href={`/inbox/${chat.id}`}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent hover:border-slate-200 hover:bg-slate-50 transition cursor-pointer group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={chat.otherUser?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-black text-slate-900 text-sm truncate">{chat.otherUser?.full_name || "Unknown"}</h3>
                  <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs truncate font-medium text-slate-500">
                  {chat.lastMsg}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 font-bold text-sm">
            Belum ada chat. Cari jasa dulu gih!
          </div>
        )}
      </div>

    </div>
  );
}