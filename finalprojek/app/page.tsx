"use client"

import { useState } from "react"

// Tipe data untuk Buku
interface Book {
  id: number
  title: string
  author: string
  year: string
  status: "Tersedia" | "Dipinjam"
}

export default function Home() {
  // READ: State untuk menyimpan daftar buku
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", year: "2005", status: "Tersedia" },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: "1980", status: "Dipinjam" },
  ])

  // State untuk form input
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  
  // State untuk melacak apakah sedang mode 'Edit' (Update)
  const [editId, setEditId] = useState<number | null>(null)

  // CREATE & UPDATE: Fungsi untuk menyimpan atau mengedit buku
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !author || !year) return alert("Semua kolom harus diisi!")

    if (editId !== null) {
      // Proses Update
      const updatedBooks = books.map((book) =>
        book.id === editId ? { ...book, title, author, year } : book
      )
      setBooks(updatedBooks)
      setEditId(null)
    } else {
      // Proses Create
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
        year,
        status: "Tersedia",
      }
      setBooks([...books, newBook])
    }

    // Kosongkan form setelah submit
    setTitle("")
    setAuthor("")
    setYear("")
  }

  // DELETE: Fungsi menghapus buku
  const handleDelete = (id: number) => {
    const filteredBooks = books.filter((book) => book.id !== id)
    setBooks(filteredBooks)
  }

  // Siapkan form untuk proses UPDATE
  const handleEdit = (book: Book) => {
    setTitle(book.title)
    setAuthor(book.author)
    setYear(book.year)
    setEditId(book.id)
  }

  // UPDATE (Status): Mengubah status ketersediaan buku
  const toggleStatus = (id: number) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, status: book.status === "Tersedia" ? "Dipinjam" : "Tersedia" }
      }
      return book
    })
    setBooks(updatedBooks as Book[])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-2">Library GenZ</h1>
          <p className="text-slate-500 text-lg">Mari membaca, menjelajahi dunia.</p>
        </div>

        {/* Form Section (CREATE / UPDATE) */}
        <div className="bg-white p-6 rounded-xl shadow-xl shadow-indigo-100/50 mb-8 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-700 mb-4">{editId ? "Edit Data Buku" : "Tambah Buku Baru"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Judul Buku"
              className="flex-1 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pengarang"
              className="flex-1 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              placeholder="Tahun"
              className="w-full md:w-28 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <button
              type="submit"
              className={`text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95 ${
                editId ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editId ? "Simpan" : "Tambah"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null); setTitle(""); setAuthor(""); setYear("");
                }}
                className="bg-slate-100 text-slate-600 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
            )}
          </form>
        </div>

        {/* List Section (READ, UPDATE Status, DELETE) */}
        <div className="bg-white rounded-xl shadow-xl shadow-indigo-100/50 overflow-hidden border border-slate-100">
          <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700 flex justify-between items-center">
            <span>Katalog Buku ({books.length})</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {books.length === 0 ? (
              <li className="p-8 text-center text-slate-400">Belum ada buku di perpustakaan.</li>
            ) : (
              books.map((book) => (
                <li key={book.id} className="p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-slate-50 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="font-bold text-lg text-slate-800">{book.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{book.author} • {book.year}</p>
                    <span 
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${
                        book.status === "Tersedia" 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                          : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(book.id)}
                      className="text-sm bg-white hover:bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors shadow-sm"
                    >
                      Ubah Status
                    </button>
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-sm bg-white hover:bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-sm bg-white hover:bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors shadow-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  )
}
