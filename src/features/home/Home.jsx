import { useUserStore } from '@/utils/stores/user.store';
import React from 'react';

export default function Home() {
    const user = useUserStore(state => state.user);
    console.log('user', user);

    return <div>dsadasdasd</div>;
}
