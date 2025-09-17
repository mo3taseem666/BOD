import queryPresets from '@/utils/constants/queryPresets';

/**
 * Helper function to create query configurations with presets
 * @param {string} preset - Preset name from QueryPresets
 * @param {Object} overrides - Additional options to override preset
 * @returns {Object} Query configuration
 */

export default function useQueryConfig(preset, overrides = {}) {
    const presetConfig = queryPresets[preset] || {};
    return { ...presetConfig, ...overrides };
}
