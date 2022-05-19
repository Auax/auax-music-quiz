// Group an array of Objects by a key
export const groupEntriesByKey = (list, key) => list.reduce((hash, obj) => ({
    ...hash,
    [obj[key]]: (hash[obj[key]] || []).concat(obj)
}), {});