function filteringObject (arr, keys) {
    const seen = new Set();
    const getByPath = (obj, path) =>
        path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

    return arr.filter((item) => {
        const composite = keys
            .map((k) =>
                typeof k === 'function' ? k(item) : getByPath(item, k)
            )
            .join('|');

        if (seen.has(composite)) return false;
        seen.add(composite);
        return true;
    });
}

export default filteringObject;