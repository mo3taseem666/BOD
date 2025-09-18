import React, { useState } from 'react';

export default function usePagination(initial) {
    console.log('initial', initial);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const setter = (name, value) => {
        setPagination(old => ({ ...old, [name]: value }));
    };

    function setPageIndex(value) {
        setter('pageIndex', value);
    }

    function setPageSize(value) {
        setter('pageSize', value);
    }

    return {
        pagination,
        setPageIndex,
        setPageSize,
        setPagination
    };
}
