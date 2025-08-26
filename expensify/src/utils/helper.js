export const capsFirst = (string = '') => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const delay = ms => new Promise(res => setTimeout(res, ms));

export function generateId() {
    return Math.floor(Math.random() * 9000) + 1000; // 1000–9999
}