// app/(dashboard)/profile/page.tsx
import { KeyRound, UploadCloud, User, UserSquare } from 'lucide-react';

export default function ProfilePage() {
  return (
    // Konten utama dimulai di sini
    <main className="space-y-8 p-6">
      {/* Judul Halaman untuk Tampilan Mobile */}
      <h1 className="text-2xl font-semibold text-gray-900 md:hidden">Profile</h1>

      {/* Grid Utama Halaman */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Wrapper untuk Kartu Foto & Informasi Akun */}
        <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* --- Kartu Foto --- */}
          <div className="bg-white p-6 rounded-lg shadow-md xl:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <User size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">Foto</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 mb-4">
                <UploadCloud size={48} className="text-gray-400" />
              </div>
              <p className="text-center text-xs text-gray-500">
                Rekomendasi: Gunakan foto dengan ukuran 200x200 pixel untuk hasil terbaik.
              </p>
            </div>
          </div>

          {/* --- Kartu Informasi Akun --- */}
          <div className="bg-white p-6 rounded-lg shadow-md xl:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <KeyRound size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">Informasi Akun</h3>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input id="username" type="text" defaultValue="immanuel" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" type="email" defaultValue="immanuel@email.com" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input id="password" type="password" placeholder="••••••••" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                  <input id="confirmPassword" type="password" placeholder="••••••••" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- Kartu Informasi Pribadi --- */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
          <div className="flex items-center gap-3 mb-6">
            <UserSquare size={20} className="text-cyan-600" />
            <h3 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input id="fullName" type="text" defaultValue="Immanuel Never" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="birth" className="block text-sm font-medium text-gray-700 mb-1">Tempat, Tanggal Lahir</label>
                <input id="birth" type="text" placeholder="Contoh: Bandung, 1 Januari 2000" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
                <input id="school" type="text" defaultValue="SMKN NEGERI 1 CIPAGALO" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <input id="gender" type="text" defaultValue="Tidak terdefinisi" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input id="address" type="text" defaultValue="Bandung" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                <input id="major" type="text" defaultValue="RPL" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <input id="class" type="text" defaultValue="XI" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">Link Portofolio</label>
                <input id="portfolio" type="url" defaultValue="https://never.dev" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Keahlian</label>
                <input id="skills" type="text" defaultValue="Web Development" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="social" className="block text-sm font-medium text-gray-700 mb-1">Link Sosial Media</label>
                <input id="social" type="url" placeholder="https://linkedin.com/in/username" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}