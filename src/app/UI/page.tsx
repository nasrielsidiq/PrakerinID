'use client'
import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Building, 
  CheckSquare, 
  MessageSquare, 
  Award, 
  User, 
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Menu,
  X
} from 'lucide-react';

interface CVItem {
  id: number;
  name: string;
  type: 'Frontend' | 'Backend';
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const cvData: CVItem[] = [
    { id: 1, name: 'Immanuel Never - Frontend', type: 'Frontend' },
    { id: 2, name: 'Immanuel Never - Backend', type: 'Backend' }
  ];

  const filteredCVs = cvData.filter(cv => 
    cv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Briefcase, label: 'Lowongan', active: false },
    { icon: FileText, label: 'Curriculum Vitae', active: true },
    { icon: Building, label: 'Perusahaan', active: false },
    { icon: CheckSquare, label: 'Task List', active: false },
    { icon: MessageSquare, label: 'Feedback', active: false },
    { icon: Award, label: 'Sertifikat', active: false },
    { icon: User, label: 'Profile', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-1 hover:bg-teal-700 rounded"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-800 rounded-full flex items-center justify-center">
              <Building size={20} />
            </div>
            <span className="font-bold text-lg">PRAKERIN.ID</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden sm:block text-sm">Immanuel Never</span>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
            IN
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <div>
                <div className="font-medium">9:35:17</div>
                <div className="text-xs">Jumat, 13 Juni 2025</div>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active 
                        ? 'bg-teal-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            Curriculum Vitae
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0 flex items-center">
              <FileText className="mr-2" size={24} />
              Curriculum Vitae
            </h1>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                <Plus size={16} className="mr-1" />
                Buat CV Pintar
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                <Plus size={16} className="mr-1" />
                Tambah CV
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari CV..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-teal-600 text-white placeholder-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          {/* CV Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama CV</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCVs.map((cv) => (
                    <tr key={cv.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cv.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cv.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
                          Download
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                          Lihat
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {filteredCVs.map((cv) => (
                <div key={cv.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{cv.name}</h3>
                    <span className="text-sm text-gray-500">#{cv.id}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                      <Download size={12} className="mr-1" />
                      Download
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                      <Eye size={12} className="mr-1" />
                      Lihat
                    </button>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCVs.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Tidak ada CV yang ditemukan</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-6 text-center text-sm text-gray-600">
        © 2025 Prakerin ID. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;