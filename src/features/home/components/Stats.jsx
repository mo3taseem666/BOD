import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { IoCash } from 'react-icons/io5';
import StatsCard from '@/components/common/StatsCard';

export default function Stats() {
    return (
        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4">
            <StatsCard
                title="System Users"
                value={15}
                subtitle="users"
                Icon={FaUsers}
            />
            <StatsCard
                title="Total Products"
                value={11}
                subtitle="products"
                Icon={AiFillProduct}
            />
            <StatsCard
                title="Pending Orders"
                value={125}
                subtitle="orders"
                Icon={FaShoppingCart}
            />
            <StatsCard
                title="Successful Payments"
                value={15}
                subtitle="payments"
                Icon={IoCash}
            />
        </div>
    );
}
