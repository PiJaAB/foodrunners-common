"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function segmentArr(arr, length) {
    const segments = new Array(Math.ceil(arr.length / length));
    for (let i = 0; i < segments.length; i++) {
        segments[i] = arr.slice(i * length, (i + 1) * length);
    }
    return segments;
}
function segmentIterator(arr, length) {
    const segments = new Array();
    let i = 0;
    let cur = [];
    const iterator = arr[Symbol.iterator]();
    let itRes;
    // eslint-disable-next-line no-cond-assign
    while (!(itRes = iterator.next()).done) {
        const el = itRes.value;
        if (i % length === 0 && cur.length > 0) {
            segments.push(cur);
            cur = [];
        }
        cur.push(el);
        i += 1;
    }
    if (cur.length > 0)
        segments.push(cur);
    return segments;
}
function segment(arr, length) {
    if (length <= 0)
        throw new RangeError('length must be a positive integer');
    if (Array.isArray(arr)) {
        return segmentArr(arr, length);
    }
    return segmentIterator(arr, length);
}
exports.default = segment;
