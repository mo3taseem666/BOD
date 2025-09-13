import React, { useEffect, useState } from 'react';
import { IoBarChart, IoTrendingUp, IoTime, IoCalendar } from 'react-icons/io5';
import { FaGlobe, FaUsers, FaChartLine } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useUserStore } from '@/utils/stores/user.store';

export default function Header() {
    const user = useUserStore(state => state.user);

    const [currentTime, setCurrentTime] = useState(() =>
        new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#9333ea] to-[#3730a3] rounded-2xl p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/3 rounded-full -translate-x-16 -translate-y-16" />

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10">
                                <IoBarChart className="size-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    CQ Dashboard
                                </h1>
                                <p className="text-blue-100 text-sm font-medium">
                                    Business Operations & Analytics
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1 mt-8">
                            <p className="text-lg font-semibold text-white">
                                {getGreeting()}, {user?.username || 'Admin'}!{' '}
                                <HiSparkles className="inline h-6 w-6 ml-2 text-yellow-300" />
                            </p>
                            <p className="text-blue-100">
                                Here's your comprehensive platform overview and
                                insights.
                            </p>
                        </div>
                    </div>

                    <div className="text-right space-y-2">
                        <div className="flex items-center justify-end space-x-2">
                            <IoTime className="h-5 w-5 text-blue-200" />
                            <span className="text-xl font-bold text-white">
                                {currentTime}
                            </span>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                            <IoCalendar className="h-4 w-4 text-blue-200" />
                            <span className="text-sm text-blue-100">
                                {getCurrentDate()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
