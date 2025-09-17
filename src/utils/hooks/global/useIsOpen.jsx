import React, { useState } from 'react';

export default function useIsOpen() {
    const [isOpen, setIsOpen] = useState({
        add: false,
        edit: false,
        delete: false,
        view: false
    });

    const toggle = {
        add: () => setIsOpen({ ...isOpen, add: !isOpen.add }),
        edit: () => setIsOpen({ ...isOpen, edit: !isOpen.edit }),
        delete: () => setIsOpen({ ...isOpen, delete: !isOpen.delete }),
        view: () => setIsOpen({ ...isOpen, view: !isOpen.view })
    };

    return { isOpen, toggle };
}
