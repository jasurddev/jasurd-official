import Link from 'next/link';
import Image from 'next/image';

export default function InboxPage() {
  // Mock Data Chat List
  const chats = [
    {
      id: 1,
      user: "AlexTech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMsg: "Siap gan, besok jam 10 ya.",
      time: "2m",
      unread: 2,
      online: true
    },
    {
      id: 2,
      user: "Siska",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siska",
      lastMsg: "Tiketnya udah aman kak?",
      time: "1h",
      unread: 0,
      online: false
    },
    {
      id: 3,
      user: "RianRunner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rian",
      lastMsg: "Oke deal 30rb ya.",
      time: "Kemarin",
      unread: 0,
      online: false
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24 pt-16 md:pt-20">
      
      {/* Header */}
      <div className="fixed top-16 md:top-20 left-0 w-full bg-white/95 backdrop-blur border-b-2 border-slate-900 z-30 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">Inbox 💬</h1>
        <button className="text-xs font-bold text-primary hover:underline">Mark all read</button>
      </div>

      {/* Chat List */}
      <div className="mt-14 px-4 md:px-6 max-w-2xl mx-auto space-y-2">
        {chats.map((chat) => (
          <Link 
            key={chat.id}
            href={`/inbox/${chat.id}`}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition cursor-pointer group
              ${chat.unread > 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'}
            `}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chat.avatar} alt={chat.user} className="w-full h-full object-cover" />
              </div>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-black text-slate-900 text-sm truncate">{chat.user}</h3>
                <span className="text-[10px] font-bold text-slate-400">{chat.time}</span>
              </div>
              <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                {chat.lastMsg}
              </p>
            </div>

            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {chat.unread}
              </div>
            )}
          </Link>
        ))}
      </div>

    </div>
  );
}