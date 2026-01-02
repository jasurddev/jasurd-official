export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-6">Selamat Datang, Minsurd! 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard">
          <h3 className="font-bold text-slate-500">Total Artikel</h3>
          <p className="text-4xl font-black text-slate-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard">
          <h3 className="font-bold text-slate-500">Total User</h3>
          <p className="text-4xl font-black text-slate-900">1,204</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard">
          <h3 className="font-bold text-slate-500">Total Jasa</h3>
          <p className="text-4xl font-black text-slate-900">340</p>
        </div>
      </div>
    </div>
  );
}