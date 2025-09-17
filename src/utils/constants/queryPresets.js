const queryPresets = {
    // Fast refresh for real-time data
    realtime: {
        staleTime: 0,
        cacheTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 5, // 5 seconds
        refetchOnWindowFocus: true
    },

    // Long cache for static data
    static: {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 1,
        refetchOnMount: false,
        refetchOnReconnect: false
    },

    // Background updates
    background: {
        staleTime: 1000 * 60 * 15, // 15 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60 * 10 // 10 minutes
    },

    // User-dependent data
    user: {
        staleTime: 1000 * 60 * 2, // 2 minutes
        cacheTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        retry: 2
    },

    // One-time fetch
    once: {
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    }
};

export default queryPresets;
