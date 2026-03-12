"use client";

import { useState } from "react";

//BIKIN TIPE DATA DULU NIH
type Book = { id: number; title: string; author: string; category: string; status: "Tersedia" | "Dipinjam"; owner: string; coverColor: string; };
type Wishlist = { id: number; title: string; author: string; votes: number; isVoted: boolean; };
type Review = { id: number; bookTitle: string; reviewer: string; rating: number; comment: string; date: string; };

export default function PustakaUserCreamAesthetic() {
  // STATE BUAT PINDAH-PINDAH MENU
  const [activeMenu, setActiveMenu] = useState<"katalog" | "rak-ku" | "ulasan" | "wishlist">("katalog");
  const [searchQuery, setSearchQuery] = useState("");
  
  // STATE BUAT NAMPILIN POP-UP DONASI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Umum");

  //DATA BOHONGAN (DUMMY) buat contoh
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", status: "Tersedia", owner: "Sistem", coverColor: "bg-[#F59E0B]" }, 
    { id: 2, title: "Bumi Manusia", author: "Pramoedya A. Toer", category: "Fiksi", status: "Dipinjam", owner: "Sistem", coverColor: "bg-[#1E293B]" }, 
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiksi", status: "Tersedia", owner: "Sistem", coverColor: "bg-[#659A6E]" }, 
    { id: 4, title: "Sapiens", author: "Yuval Noah Harari", category: "Sejarah", status: "Tersedia", owner: "Sistem", coverColor: "bg-[#8B5CF6]" }, 
    { id: 5, title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Tersedia", owner: "Sistem", coverColor: "bg-[#EAB308]" }, 
  ]);

  const [wishlists, setWishlists] = useState<Wishlist[]>([
    { id: 1, title: "Madilog", author: "Tan Malaka", votes: 24, isVoted: false },
    { id: 2, title: "Psychology of Money", author: "Morgan Housel", votes: 18, isVoted: false },
    { id: 3, title: "Laut Bercerita", author: "Leila S. Chudori", votes: 12, isVoted: false },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, bookTitle: "Atomic Habits", reviewer: "Nadia Larasati", rating: 5, comment: "Buku ini benar-benar mengubah cara saya membangun rutinitas pagi. Sangat praktis dan mudah diaplikasikan!", date: "2 Hari yang lalu" },
    { id: 2, title: "Bumi Manusia", bookTitle: "Bumi Manusia", reviewer: "Bima Arya", rating: 5, comment: "Karya sastra yang luar biasa. Membaca ini seperti masuk ke mesin waktu.", date: "5 Hari yang lalu" },
    { id: 3, title: "The Great Gatsby", bookTitle: "The Great Gatsby", reviewer: "Sarah Wijaya", rating: 4, comment: "Klasik yang indah, tapi butuh waktu untuk mencerna gaya bahasanya.", date: "1 Minggu yang lalu" },
  ]);

  // STATE BUAT NYIMPEN ISIAN FORM ULASAN
  const [reviewBookTitle, setReviewBookTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // LOGIKA CRUD-NYA DISINI
  const handleSubmitDonasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle && newAuthor) {
      const newBook: Book = { id: Date.now(), title: newTitle, author: newAuthor, category: newCategory, status: "Tersedia", owner: "Kamu", coverColor: ["bg-[#F59E0B]", "bg-[#659A6E]", "bg-[#8B5CF6]", "bg-[#0284C7]", "bg-[#BE123C]"][Math.floor(Math.random() * 5)] };
      setBooks([newBook, ...books]); setNewTitle(""); setNewAuthor(""); setNewCategory("Umum"); setIsModalOpen(false);
    }
  };

  const handlePinjam = (id: number) => setBooks(books.map(b => b.id === id ? { ...b, status: "Dipinjam" } : b));
  const handleKembalikan = (id: number) => setBooks(books.map(b => b.id === id ? { ...b, status: "Tersedia" } : b));
  const handleHapusDonasi = (id: number) => { if (confirm("Yakin ingin menarik buku ini?")) setBooks(books.filter(b => b.id !== id)); };

  const handleAddWishlist = () => {
    const title = prompt("Judul buku yang kamu inginkan:");
    const author = prompt("Nama Penulis:");
    if (title && author) setWishlists([{ id: Date.now(), title, author, votes: 1, isVoted: true }, ...wishlists]);
  };

  const handleUpvote = (id: number) => {
    setWishlists(wishlists.map(w => w.id === id ? (w.isVoted ? { ...w, votes: w.votes - 1, isVoted: false } : { ...w, votes: w.votes + 1, isVoted: true }) : w).sort((a, b) => b.votes - a.votes));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewBookTitle && reviewComment) {
      setReviews([{ id: Date.now(), bookTitle: reviewBookTitle, reviewer: "Kamu", rating: reviewRating, comment: reviewComment, date: "Baru saja" }, ...reviews]);
      setReviewBookTitle(""); setReviewComment(""); setReviewRating(5);
      alert("Ulasan berhasil dikirim!");
    }
  };

  //  FITUR PENCARIAN BUKU
  const displayedBooks = books.filter(b => {
    if (activeMenu === "rak-ku") return b.status === "Dipinjam" || b.owner === "Kamu";
    return b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex h-screen bg-[#F8F6F0] font-sans text-stone-800 selection:bg-[#659A6E]/20">
      
      
      <aside className="w-64 bg-[#F8F6F0] border-r border-[#E8E6DF] flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#659A6E] text-white p-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <span className="text-xl font-bold text-stone-800 tracking-tight">SOBATBACA</span>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <button onClick={() => setActiveMenu("katalog")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeMenu === "katalog" ? "bg-[#659A6E] text-white shadow-sm" : "text-stone-500 hover:bg-[#EAE8E0]"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg> Katalog Buku
          </button>
          <button onClick={() => setActiveMenu("rak-ku")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeMenu === "rak-ku" ? "bg-[#659A6E] text-white shadow-sm" : "text-stone-500 hover:bg-[#EAE8E0]"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg> Rak Pribadi
          </button>
          
          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Komunitas</span>
          </div>
          
          <button onClick={() => setActiveMenu("ulasan")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeMenu === "ulasan" ? "bg-amber-100 text-amber-800 shadow-sm" : "text-stone-500 hover:bg-[#EAE8E0]"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> Ruang Ulasan
          </button>
          <button onClick={() => setActiveMenu("wishlist")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeMenu === "wishlist" ? "bg-blue-100 text-blue-800 shadow-sm" : "text-stone-500 hover:bg-[#EAE8E0]"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg> Wishlist Buku
          </button>
        </nav>

        <div className="p-4 border-t border-[#E8E6DF] bg-stone-50/50">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 bg-[#7B927D] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">MK</div>
            <div>
              <p className="text-sm font-bold text-stone-800">Member Kita</p>
              <p className="text-[11px] font-medium text-stone-500">Anggota Aktif</p>
            </div>
          </div>
        </div>
      </aside>

     
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#E8E6DF] bg-[#F8F6F0]/80 backdrop-blur-md absolute w-full z-10">
          <div className="relative w-96">
            {(activeMenu === "katalog" || activeMenu === "rak-ku") && (
              <>
                <svg className="w-4 h-4 absolute left-4 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input 
                  type="text" 
                  placeholder="Cari buku atau penulis..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#EAE8E0] border-none rounded-full pl-10 pr-4 py-2 text-sm text-stone-700 focus:ring-2 focus:ring-[#659A6E] outline-none"
                />
              </>
            )}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-stone-800 hover:bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 transition-all hover:-translate-y-0.5">
            + Donasi Buku
          </button>
        </header>

      
        <div className="flex-1 overflow-y-auto p-10 pt-28">
          
        
          {(activeMenu === "katalog" || activeMenu === "rak-ku") && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight">
                  {activeMenu === "katalog" ? "Katalog Perpustakaan" : "Rak Pribadiku"}
                </h1>
                <p className="text-stone-500 text-sm mt-1">
                  {activeMenu === "katalog" ? "Eksplorasi literatur dan mulai petualangan barumu." : "Kelola buku yang sedang kamu pinjam dan donasikan."}
                </p>
              </div>

             
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {displayedBooks.length === 0 ? (
                  <div className="col-span-full py-10 text-center text-stone-400">Wah, bukunya nggak ketemu nih.</div>
                ) : (
                  displayedBooks.map(book => (
                    <div key={book.id} className="border border-stone-200 rounded-xl bg-white overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className={`h-48 relative flex items-center justify-center p-4 text-center ${book.coverColor}`}>
                        <h4 className="text-white font-bold text-lg leading-tight opacity-95 drop-shadow-md">{book.title}</h4>
                        <span className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {book.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-bold text-stone-800 text-sm line-clamp-1">{book.title}</h3>
                        <p className="text-xs text-stone-500 mt-0.5">{book.author}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs">
                          <span className={`w-2 h-2 rounded-full ${book.status === 'Tersedia' ? 'bg-[#659A6E]' : 'bg-[#D97706]'}`}></span>
                          <span className={`font-medium ${book.status === 'Tersedia' ? 'text-[#659A6E]' : 'text-[#D97706]'}`}>{book.status}</span>
                        </div>
                      </div>
                      <div className="px-4 py-3 border-t border-stone-100 flex justify-end gap-2 bg-stone-50/50">
                        {activeMenu === "katalog" && book.status === "Tersedia" && (
                          <button onClick={() => handlePinjam(book.id)} className="text-xs font-bold text-[#659A6E] bg-[#659A6E]/10 hover:bg-[#659A6E]/20 px-4 py-1.5 rounded transition-colors w-full">Pinjam Buku</button>
                        )}
                        {activeMenu === "rak-ku" && book.status === "Dipinjam" && (
                          <button onClick={() => handleKembalikan(book.id)} className="text-xs font-bold text-[#D97706] bg-[#D97706]/10 hover:bg-[#D97706]/20 px-4 py-1.5 rounded transition-colors w-full">Kembalikan</button>
                        )}
                        {book.owner === "Kamu" && (
                          <button onClick={() => handleHapusDonasi(book.id)} className="text-xs font-bold text-stone-400 hover:text-red-500 p-1.5 rounded transition-colors" title="Tarik Donasi">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeMenu === "ulasan" && (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight flex items-center gap-3">
                  ⭐ Ruang Ulasan
                </h1>
                <p className="text-stone-500 text-sm mt-2">Bantu komunitas memilih bacaan terbaik dengan membagikan pengalamanmu.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
                <div className="md:col-span-1">
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm sticky top-24">
                    <h3 className="font-bold text-stone-800 mb-4">Tulis Ulasan Baru</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Judul Buku</label>
                        <input type="text" value={reviewBookTitle} onChange={(e) => setReviewBookTitle(e.target.value)} placeholder="Buku apa yang kamu baca?" className="w-full bg-[#F8F6F0] border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Penilaian (Bintang)</label>
                        <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="w-full bg-[#F8F6F0] border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                          <option value={5}>⭐⭐⭐⭐⭐ (Sempurna)</option>
                          <option value={4}>⭐⭐⭐⭐ (Bagus)</option>
                          <option value={3}>⭐⭐⭐ (Lumayan)</option>
                          <option value={2}>⭐⭐ (Kurang)</option>
                          <option value={1}>⭐ (Tidak Direkomendasikan)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 mb-1">Komentar</label>
                        <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Ceritakan pendapatmu..." rows={4} className="w-full bg-[#F8F6F0] border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" required></textarea>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition-colors">Kirim Ulasan</button>
                    </form>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-600 font-bold text-sm">
                            {review.reviewer.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-800 text-sm">{review.reviewer}</h4>
                            <p className="text-[10px] text-stone-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-amber-400 text-sm">
                          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                      <div className="bg-[#F8F6F0] p-3 rounded-xl mb-3 border border-stone-100">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Ulasan:</span>
                        <span className="text-sm font-bold text-stone-800 ml-2">{review.bookTitle}</span>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "wishlist" && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight flex items-center gap-3">
                    💡 Kotak Keinginan
                  </h1>
                  <p className="text-stone-500 text-sm mt-2">Buku apa yang sangat ingin kamu baca? Ajukan biar pengurus tahu!</p>
                </div>
                <button onClick={handleAddWishlist} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors">
                  + Ajukan Judul
                </button>
              </div>

              <div className="grid gap-4">
                {wishlists.map((item) => (
                  <div key={item.id} className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-lg font-bold text-stone-800">{item.title}</h3>
                      <p className="text-sm text-stone-500 mt-0.5">Penulis: {item.author}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleUpvote(item.id)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-4 rounded-xl border transition-all ${item.isVoted ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-[#F8F6F0] border-stone-200 text-stone-500 hover:bg-stone-100'}`}
                    >
                      <svg className={`w-5 h-5 mb-1 ${item.isVoted ? 'fill-blue-500 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                      <span className="text-lg font-black leading-none">{item.votes}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#F8F6F0] rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-stone-200">
            <div className="bg-[#659A6E] p-6 text-white text-center relative">
              <h2 className="text-xl font-bold">Donasi Buku Fisik</h2>
              <p className="text-[#EAE8E0] text-xs mt-1">Sumbangin bukumu ke rak komunitas kita.</p>
            </div>
            <form onSubmit={handleSubmitDonasi} className="p-6 space-y-4 bg-white">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Judul Buku</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-[#F8F6F0] border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#659A6E] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Nama Penulis</label>
                <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="w-full bg-[#F8F6F0] border border-stone-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#659A6E] outline-none" required />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm rounded-xl transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-3 bg-[#659A6E] hover:bg-[#57855E] text-white font-bold text-sm rounded-xl shadow-md transition-colors">Kirim Donasi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}