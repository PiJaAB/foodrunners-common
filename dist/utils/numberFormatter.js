"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberFormat = exports.currencyFormat = void 0;
exports.currencyFormat = Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    currencyDisplay: 'code',
}).format;
exports.numberFormat = Intl.NumberFormat('sv-SE', {
    style: 'decimal',
}).format;
