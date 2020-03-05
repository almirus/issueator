
/**
 * @param {Object} object
 * @return {string}
 */
export function toFormUrlEncoder(object) {
    return Object.entries(object)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}