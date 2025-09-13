import { useUserStore } from '@/utils/stores/user.store';
import React, { useState } from 'react';
import {
    HiSearch,
    HiBell,
    HiChevronDown,
    HiLogout,
    HiUser,
    HiCog
} from 'react-icons/hi';

export default function Navbar() {
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-end">
                <div className="flex gap-4 items-center">
                    <button className="relative  text-gray-400 size-10 flex items-center justify-center hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <HiBell className="h-6 w-6" />
                        <span className="absolute top-2 right-2  block size-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-3 rounded-full rounded-r-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none "
                        >
                            <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-base font-medium text-white">
                                    {user?.username?.charAt(0).toUpperCase() ||
                                        'U'}
                                </span>
                            </div>

                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.username || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {user?.role || 'Member'}
                                </p>
                            </div>

                            <HiChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div
                                    className="fixed  w-screen h-screen left-0 inset-0 z-[50]"
                                    onClick={() => setIsDropdownOpen(false)}
                                />

                                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white border border-gray-300 z-[51]">
                                    <div className="">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.username || 'User'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {user?.email ||
                                                    'user@example.com'}
                                            </p>
                                        </div>

                                        <button className="flex items-center gap-0 hover:gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  duration-200">
                                            <HiUser className="mr-3 h-4 w-4 text-gray-400" />
                                            <span>Profile</span>
                                        </button>

                                        <button className="flex items-center gap-0 hover:gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  duration-200">
                                            <HiCog className="mr-3 h-4 w-4 text-gray-400" />
                                            Settings
                                        </button>

                                        <div className="border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 gap-0 hover:gap-2 rounded-b-lg py-2 text-sm text-red-700 hover:bg-red-50  duration-200"
                                            >
                                                <HiLogout className="mr-3 h-4 w-4 text-red-400" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
