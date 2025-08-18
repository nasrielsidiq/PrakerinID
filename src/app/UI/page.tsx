'use client';

import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Clock,
  Home,
  Briefcase,
  GraduationCap,
  Building,
  CheckCircle,
  FileText,
  MessageSquare,
  Award,
  Menu,
  X
} from 'lucide-react';

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: 'immanuel',
    email: 'immanuel@mail.com',
    password: '',
    confirmPassword: '',
    fullName: 'Immanuel Never',
    birthPlace: 'SMKN NEGERI 1 CIPADALO',
    birthDate: '',
    gender: 'Tidak terdefinisi',
    address: 'Bandung',
    major: 'RPL',
    grade: 'XI',
    skills: 'Web Development',
    portfolioLink: 'https://never.dev',
    socialMediaLink: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Briefcase, label: 'Lowongan', active: false },
    { icon: GraduationCap, label: 'Curriculum Vitae', active: false },
    { icon: Building, label: 'Perusahaan', active: false },
    { icon: CheckCircle, label: 'Task List', active: false },
    { icon: MessageSquare, label: 'Feedback', active: false },
    { icon: Award, label: 'Sertifikat', active: false },
    { icon: User, label: 'Profile', active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-sm">P</span>
            </div>
            <span className="font-semibold">PRAKERIN.ID</span>
          </div>
          <button className="lg:hidden ml-4">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:block">Immanuel Never</span>
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative z-30 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 lg:w-72
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Time Display */}
            <div className="flex items-center space-x-2 text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4" />
              <div className="text-sm">
                <div className="font-medium">8:35:17</div>
                <div className="text-xs">Jumat, 13 Juni 2025</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${item.active 
                      ? 'bg-teal-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <nav className="text-sm text-gray-600 mb-2">
              <span>Profile</span>
            </nav>
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Photo Upload Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Camera className="h-5 w-5 text-gray-600" />
                  <h2 className="font-semibold text-gray-800">Foto</h2>
                </div>
                <div className="text-center">
                  <div className="w-48 h-64 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload Foto</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Rekomendasi:</span> Gunakan foto dengan dengan 
                      ukuran 300x400 pixel untuk hasil terbaik.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-2 mb-6">
                  <User className="h-5 w-5 text-gray-600" />
                  <h2 className="font-semibold text-gray-800">Informasi Akun</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Konfirmasi Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <h2 className="font-semibold text-gray-800">Informasi Pribadi</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tempat, Tanggal Lahir
                      </label>
                      <input
                        type="text"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Asal Sekolah
                      </label>
                      <input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jenis Kelamin
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tidak terdefinisi">Tidak terdefinisi</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alamat
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jurusan
                      </label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kelas
                      </label>
                      <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link Portfolio
                      </label>
                      <input
                        type="url"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Keahlian
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link Sosial Media
                      </label>
                      <input
                        type="url"
                        name="socialMediaLink"
                        value={formData.socialMediaLink}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-gray-500">
            © 2025 Prakerin ID. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;