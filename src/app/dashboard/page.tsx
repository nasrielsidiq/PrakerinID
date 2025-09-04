'use client';
import React, { useEffect, useState } from 'react';
import {
  Building,
  User,
  MapPin,
  BriefcaseBusiness,
} from 'lucide-react';
import SiswaDashboard from '@/components/roleComponents/SiswaDashboard';

import Cookies from 'js-cookie';
import IndustryDashboard from '@/components/roleComponents/industryDashboard';

const Dashboard: React.FC = () => {

  const [role, setRole] = useState<string>();

  useEffect(()=> {
    setRole(Cookies.get("authorization"))
  }, [])

  const RolePage: React.FC = () => {
    if (role === "industry") return (<IndustryDashboard />)
    if (role === "student") return(<SiswaDashboard />)
    if (role === "school") return null
  }

  return (

    <main className="p-6">
      {/* Welcome Section */}
      <h1 className="text-accent-dark mb-5 font-medium">Dashboard</h1>

       <div className="bg-gradient-to-r from-accent-light to-accent rounded-lg p-6 text-white mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm opacity-90">Selamat Pagi,</p>
            <h1 className="text-xl font-semibold">Immanuel Never</h1>
          </div>
        </div>
      </div>
      <RolePage />
    </main>
  );
};

export default Dashboard;