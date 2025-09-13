function uniqueBy (arr, keys) {
    const seen = new Set();
    return arr.filter((item) => {
        const value = keys.map((key) => item[key]).join("|");
        if(seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true
    })
}

export default uniqueBy;