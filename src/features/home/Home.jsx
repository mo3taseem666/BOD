import StatsCard from '@/components/common/StatsCard';
import { useUserStore } from '@/utils/stores/user.store';
import React from 'react';

import Header from './components/Header';
import Stats from './components/Stats';

export default function Home() {
    const user = useUserStore(state => state.user);
    console.log('user', user);

    return (
        <div className="flex flex-col gap-4">
            <Header />
            <Stats />
        </div>
    );
}
