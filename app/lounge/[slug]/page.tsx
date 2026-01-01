{/* Title Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-slate-900">
                  {gig.category}
                </span>
                {/* TAMPILKAN LOKASI */}
                {(gig.city || gig.district) && (
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                    <i className="fa-solid fa-location-dot text-red-500"></i> {gig.district}, {gig.city}
                  </span>
                )}
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                  <i className="fa-solid fa-clock"></i> {gig.unit === 'flat' ? 'Sekali Bayar' : `Per ${gig.unit}`}
                </span>
              </div>
              {/* ... */}
              