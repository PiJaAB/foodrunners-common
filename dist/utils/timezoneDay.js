"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndOfDay = exports.StartOfDay = void 0;
function StartOfDay(dateStr, timeZone = 'Europe/Stockholm') {
    const utcDate = new Date(Date.UTC(...dateStr
        .split('-')
        .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0))));
    const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone,
        formatMatcher: 'basic',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour12: false,
    });
    const timeFormatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone,
        formatMatcher: 'basic',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    const utcOffsetDate = new Date(Date.UTC(...[
        ...dateFormatter
            .format(utcDate)
            .split('-')
            .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)),
        ...timeFormatter
            .format(utcDate)
            .split(':')
            .map((n) => Number.parseInt(n, 10)),
    ]));
    return new Date(utcDate.getTime() * 2 - utcOffsetDate.getTime());
}
exports.StartOfDay = StartOfDay;
function EndOfDay(dateStr, timeZone = 'Europe/Stockholm') {
    const utcDate = new Date(Date.UTC(...[
        ...dateStr
            .split('-')
            .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)),
        23,
        59,
        59,
    ]));
    const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone,
        formatMatcher: 'basic',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour12: false,
    });
    const timeFormatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone,
        formatMatcher: 'basic',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    const utcOffsetDate = new Date(Date.UTC(...[
        ...dateFormatter
            .format(utcDate)
            .split('-')
            .map((n, i) => Number.parseInt(n, 10) - (i === 1 ? 1 : 0)),
        ...timeFormatter
            .format(utcDate)
            .split(':')
            .map((n) => Number.parseInt(n, 10)),
        59,
    ]));
    return new Date(utcDate.getTime() * 2 - utcOffsetDate.getTime());
}
exports.EndOfDay = EndOfDay;
