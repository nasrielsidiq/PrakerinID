'use client';
import { useState } from "react";
import {
    Home,
    Briefcase,
    FileText,
    Building,
    CheckSquare,
    MessageSquare,
    Award,
    User,
    Menu,
    X,
    Clock
} from 'lucide-react';
import Link from "next/link";

interface MenuItem {
    icon: React.ComponentType<any>;
    label: string;
    active: boolean;
    href: string;
}[];

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { icon: Home, label: 'Dashboard', active: true , href: '/dashboard' },
        { icon: Briefcase, label: 'Lowongan', active: false , href: '/dashboard/lowongan' },
        { icon: FileText, label: 'Curriculum Vitae', active: false , href: '/dashboard/cv' },
        { icon: Building, label: 'Perusahaan', active: false , href: '/dashboard/perusahaan' },
        { icon: CheckSquare, label: 'Task List', active: false , href: '/dashboard/tasklist' },
        { icon: MessageSquare, label: 'Feedback', active: false , href: '/dashboard/feedback' },
        { icon: Award, label: 'Sertifikat', active: false , href: '/dashboard/sertifikat' },
        { icon: User, label: 'Profile', active: false , href: '/dashboard/profile' }
    ]);

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Fixed Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                <div className="flex items-center justify-between h-16 px-6">
                    <div className="flex items-center space-x-2">
                        <img src="PrakerinID_ico.svg" alt="" className="lg:w-50 " />
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-8 h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex bg-accent-light/15 mx-6 p-3 rounded-xl text-accent-dark justify-center space-x-2 ">
                        <Clock className="w-7 my-auto h-7 " />
                        <div className="">
                            <h3 className="font-medium">9:35:17</h3>
                            <h3 className="text-xs">Jumat, 13 Juni 2025</h3>
                        </div>
                    </div>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={() => {
                                setMenuItems((prevItems) =>
                                    prevItems.map((prevItem) =>
                                        prevItem.label === item.label
                                            ? { ...prevItem, active: true }
                                            : { ...prevItem, active: false }
                                    )
                                );
                                setSidebarOpen(false);
                            }}
                            className={`flex rounded-xl items-center mx-6 p-3 my-3 text-gray-700 ${!item.active ?'hover:bg-accent/10 hover:text-accent': ''} transition-colors ${item.active ? 'bg-accent !text-white shadow-lg font-bold ' : ''}`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:ml-64">
                {/* Fixed Header */}
                <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-accent text-white shadow-sm border-b">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center space-x-2 ">
                                    <span className="text-sm font-bold">Immanuel Never</span>
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content with proper spacing for fixed header */}
                <main className="pt-16">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t py-4 px-6 mt-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 Prakerin ID. All rights reserved.
                    </p>
                </footer>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}