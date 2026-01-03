'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function NotificationDropdown() {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch & Realtime
  useEffect(() => {
    const fetchNotifs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch Awal
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.is_read).length);
      }

      // Realtime Subscription (Tanpa Filter Server-Side)
      const channel = supabase
        .channel('realtime_notifs')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        }, (payload) => {
          // Filter Client-Side: Cuma proses kalau user_id cocok
          if (payload.new.user_id === user.id) {
            setNotifications(prev => [payload.new, ...prev]);
            setUnreadCount(prev => prev + 1);
          }
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    };

    fetchNotifs();
  }, [supabase]);
  
  const markAsRead = async () => {
    if (unreadCount === 0) return;
    
    // 1. Optimistic Update (Langsung ilangin merahnya di UI)
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 2. Update Database di Background
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
  };

  return (
    <div className="relative">
      {/* Tombol Lonceng */}
      <button 
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) markAsRead(); }}
        className="w-10 h-10 flex items-center justify-center bg-white border-2 border-slate-900 rounded-lg shadow-hard-sm active:translate-y-0.5 transition relative"
      >
        <i className="fa-regular fa-bell text-lg"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-slate-900 rounded-xl shadow-hard z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="bg-slate-50 p-3 border-b-2 border-slate-100 flex justify-between items-center">
              <h4 className="font-black text-sm text-slate-900">Notifikasi</h4>
              <button onClick={markAsRead} className="text-[10px] font-bold text-primary hover:underline">Mark all read</button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <Link 
                    key={notif.id} 
                    href={notif.link || '#'} 
                    onClick={() => setIsOpen(false)}
                    className={`block p-3 border-b border-slate-100 hover:bg-slate-50 transition ${!notif.is_read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${notif.type === 'chat' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        <i className={`fa-solid ${notif.type === 'chat' ? 'fa-comment' : 'fa-bell'} text-xs`}></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 mb-0.5">{notif.title}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-2">{notif.message}</p>
                        <p className="text-[9px] text-slate-400 mt-1">{new Date(notif.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs font-bold">Belum ada notifikasi.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}