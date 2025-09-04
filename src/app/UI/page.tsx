'use client';
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  User,
  Users,
  Target,
  Calendar,
  MoreHorizontal,
  Star
} from 'lucide-react';

interface TaskItem {
  no: number;
  nama: string;
  role: string;
  task: string;
  deadline: string;
  status: string;
}

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Briefcase, label: 'Lowongan' },
    { icon: FileText, label: 'Lamaran' },
    { icon: CheckSquare, label: 'Task List' },
    { icon: GraduationCap, label: 'Sekolah' },
    { icon: Award, label: 'Penghargaan' },
    { icon: MessageSquare, label: 'Feedback' },
    { icon: User, label: 'Profile' },
  ];

  const taskData: TaskItem[] = [
    {
      no: 1,
      nama: 'Dikaru Wahyudi',
      role: 'Backend',
      task: 'Lorem Ipsum',
      deadline: '27/08/2025',
      status: 'Sedang'
    },
    {
      no: 2,
      nama: 'Ahmad agung',
      role: 'Frontend',
      task: 'Lorem Ipsum',
      deadline: '27/08/2025',
      status: 'Sedang'
    }
  ];

  const ratingData = [
    { rating: 5, percentage: 85, color: 'bg-teal-500' },
    { rating: 4, percentage: 25, color: 'bg-teal-400' },
    { rating: 3, percentage: 20, color: 'bg-teal-300' },
    { rating: 2, percentage: 15, color: 'bg-orange-400' },
    { rating: 1, percentage: 35, color: 'bg-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-gray-800">PRAKERIN.ID</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                item.active 
                  ? 'bg-teal-500 text-white border-r-4 border-teal-600' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">PT Makerindo Prima</span>
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">M</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Selamat Pagi</p>
                  <h2 className="font-semibold">PT Makerindo Prima</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Rabu 30 Jul 2025</p>
                <p className="text-2xl font-bold">14:13</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">39</p>
                  <p className="text-sm text-teal-600 font-medium">Total Siswa Magang</p>
                </div>
                <Users className="w-8 h-8 text-teal-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">45</p>
                  <p className="text-sm text-blue-600 font-medium">Total Lowongan</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-green-600 font-medium">Total Penghargaan</p>
                </div>
                <Award className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Rating and Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Rating Industri */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">Rating Industri</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">4,2</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[1,2,3,4].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-500">182 reviews</p>
                </div>
                
                <div className="flex-1 space-y-2">
                  {ratingData.map((item) => (
                    <div key={item.rating} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 w-2">{item.rating}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart Placeholder */}
              <div className="mt-6 flex justify-end">
                <div className="w-32 h-32 relative">
                  <div className="w-full h-full rounded-full" style={{
                    background: `conic-gradient(#059669 0deg 280deg, #10b981 280deg 300deg, #fbbf24 300deg 320deg, #f59e0b 320deg 340deg, #ef4444 340deg 360deg)`
                  }}></div>
                  <div className="absolute inset-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Distribusi Tugas */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-6">Distribusi Tugas Seleksi Siswa Magang</h3>
              
              {/* Bar Chart Placeholder */}
              <div className="mb-6">
                <div className="flex items-end justify-center space-x-8 h-40">
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-teal-500 rounded-t" style={{height: '120px'}}></div>
                    <span className="text-xs text-gray-600 mt-2">Dikaru Wahyudi</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-teal-500 rounded-t" style={{height: '80px'}}></div>
                    <span className="text-xs text-gray-600 mt-2">Ahmad Agung</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 bg-teal-500 rounded-t" style={{height: '100px'}}></div>
                    <span className="text-xs text-gray-600 mt-2">Nama</span>
                  </div>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="flex justify-end">
                <div className="w-32 h-32 relative">
                  <div className="w-full h-full rounded-full" style={{
                    background: `conic-gradient(#3b82f6 0deg 280deg, #10b981 280deg 320deg, #ef4444 320deg 360deg)`
                  }}></div>
                  <div className="absolute inset-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Selesai</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Sedang</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Belum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Deadline Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-teal-500 text-white px-6 py-4 rounded-t-lg">
              <h3 className="font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Task Deadline
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {taskData.map((task) => (
                    <tr key={task.no} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.no}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.task}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.deadline}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                          <span className="text-xs">i</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-4 py-4 lg:px-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Prakerin ID. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;