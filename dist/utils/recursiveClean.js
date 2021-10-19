"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recursiveClean(obj, options = {}, searched = new Map()) {
    const { timestampClass } = options;
    if (typeof obj !== 'object' || obj == null)
        return obj;
    if (searched.has(obj))
        return searched.get(obj);
    if (Array.isArray(obj)) {
        const newArr = obj.filter((v) => typeof v !== 'undefined');
        searched.set(obj, newArr);
        newArr.forEach((value, index) => {
            newArr[index] = recursiveClean(value, options, searched);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return newArr;
    }
    if (timestampClass != null &&
        obj instanceof timestampClass) {
        const millis = obj.toMillis();
        searched.set(obj, millis);
        return millis;
    }
    const newObj = {};
    searched.set(obj, newObj);
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] !== 'undefined') {
            newObj[key] = recursiveClean(obj[key], options, searched);
        }
    });
    return newObj;
}
exports.default = recursiveClean;
