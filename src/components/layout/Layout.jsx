import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';

export default function Layout() {
    return (
        <div className="bg-gray-100  font-montserrat">
            <div className="flex-1 flex ">
                <SideBar />
                <div className="w-full overflow-auto ">
                    <Navbar />
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
