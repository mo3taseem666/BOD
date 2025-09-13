import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        set => ({
            user: null,

            isAuthanticated: false,

            login: userData =>
                set({
                    user: userData,
                    isAuthanticated: true
                }),

            logout: () =>
                set({
                    user: null,
                    token: null,
                    isAuthanticated: false
                })
        }),
        {
            name: 'bod-user'
        }
    )
);
