export const StorageType = {
    Synced: 'sync',
    Local: 'local'
};

const promisify = fn => (...args) =>
    new Promise((resolve, reject) => {
        try {
            fn(...args, resolve);
        } catch (error) {
            reject(error);
        }
    });

/**
 * @param   {string|string[]} keys
 * @param   {string} storageArea
 * @returns {Promise}
 */
export function get(keys, storageArea) {
    return promisify(chrome.storage[storageArea].get.bind(chrome.storage[storageArea]))(keys)
        .then(result => (typeof keys === 'string' ? result[keys] : result));
}

/**
 * @param   {object} items
 * @param   {string} storageArea
 * @returns {Promise}
 */
export function set(items, storageArea) {
    return promisify(chrome.storage[storageArea].set.bind(chrome.storage[storageArea]))(items);
}

/**
 * @param   {string|string[]} keys
 * @param   {string} storageArea
 * @returns {Promise}
 */
export function remove(keys, storageArea) {
    return promisify(chrome.storage[storageArea].remove.bind(chrome.storage[storageArea]))(keys);
}

/**
 * @param   {string} storageArea
 * @returns {Promise}
 */
export function clear(storageArea) {
    return promisify(chrome.storage[storageArea].clear.bind(chrome.storage[storageArea]))();
}
