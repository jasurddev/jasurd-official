// ... imports sama

// Helper Slug (Update biar ada kota)
const createSlug = (title: string, city: string) => {
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const cleanCity = city ? city.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'indonesia';
  const randomString = Math.random().toString(36).substring(2, 7);
  return `${cleanTitle}-${cleanCity}-${randomString}`; // Slug: judul-kota-random
};

export default function ModalPostGig({ onClose }: ModalPostGigProps) {
  // ... state sama
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Jastip',
    price: '',
    unit: 'flat',
    type: 'solver',
    city: '', // Tambah ini
    district: '', // Tambah ini
  });

  // ... generateMagicText sama

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { /* ... */ }

    // ... upload image sama

    // Generate Slug dengan Kota
    const slug = createSlug(formData.title, formData.city);

    const { error } = await supabase
      .from('gigs')
      .insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit,
        type: formData.type,
        image_url: imageUrl,
        is_active: true,
        slug: slug,
        city: formData.city, // Simpan Kota
        district: formData.district // Simpan Kecamatan
      });

    // ... error handling sama
  };

  return (
    // ... wrapper modal sama
          <form className="space-y-5 pb-6" onSubmit={handleSubmit}>
            {/* ... input foto & judul sama */}

            {/* INPUT LOKASI (BARU) */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kota / Kab</label>
                <input 
                  type="text" 
                  value={formData.city} 
                  onChange={(e) => setFormData({...formData, city: e.target.value})} 
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" 
                  placeholder="Jakarta Selatan" 
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kecamatan</label>
                <input 
                  type="text" 
                  value={formData.district} 
                  onChange={(e) => setFormData({...formData, district: e.target.value})} 
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" 
                  placeholder="Tebet" 
                  required
                />
              </div>
            </div>

            {/* ... sisa input (kategori, harga, deskripsi) sama */}
            
            {/* ... button submit sama */}
          </form>
    // ...
  );
}
