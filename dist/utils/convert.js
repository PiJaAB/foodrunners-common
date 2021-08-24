"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.createComparison = exports.UnknownPriceComparisonError = exports.PriceComparisonError = exports.IncompatibleUnitError = exports.UnknownUnitError = exports.UnitError = void 0;
/* eslint-disable max-classes-per-file */
const measurementUnits = __importStar(require("../codeData/measurementUnits.json"));
const priceComparisonTypes = __importStar(require("../codeData/priceComparisonTypes.json"));
class UnitError extends Error {
    constructor() {
        super(...arguments);
        this.name = UnitError.name;
    }
}
exports.UnitError = UnitError;
class UnknownUnitError extends UnitError {
    constructor(unitCode) {
        super(`Unit ${unitCode} is unknown and cannot be converted.`);
        this.name = UnknownUnitError.name;
    }
}
exports.UnknownUnitError = UnknownUnitError;
class IncompatibleUnitError extends UnitError {
    constructor(fromUnit, toUnit) {
        super(`Cannot convert from ${fromUnit.name}[${fromUnit.conversionInfo.type}] to ${toUnit.name}[${toUnit.conversionInfo.type}] as they have incompatible types.`);
        this.name = IncompatibleUnitError.name;
    }
}
exports.IncompatibleUnitError = IncompatibleUnitError;
function convert(value, from, to, decimals) {
    const fromUnit = typeof from === 'object'
        ? from
        : measurementUnits.units[from];
    const toUnit = typeof to === 'object'
        ? to
        : measurementUnits.units[to];
    if (fromUnit == null) {
        throw new UnknownUnitError(from);
    }
    if (toUnit == null) {
        throw new UnknownUnitError(to);
    }
    let convertedValue;
    if (from === to) {
        convertedValue = value;
    }
    else {
        if (fromUnit.conversionInfo.type !== toUnit.conversionInfo.type) {
            throw new IncompatibleUnitError(fromUnit, toUnit);
        }
        convertedValue =
            (value * fromUnit.conversionInfo.factor) / toUnit.conversionInfo.factor;
    }
    if (decimals != null)
        return convertedValue.toFixed(decimals);
    return convertedValue;
}
class PriceComparisonError extends Error {
    constructor() {
        super(...arguments);
        this.name = PriceComparisonError.name;
    }
}
exports.PriceComparisonError = PriceComparisonError;
class UnknownPriceComparisonError extends PriceComparisonError {
    constructor(comparisonCode) {
        super(`Price comparison type code ${comparisonCode} is unknown.`);
        this.name = UnknownPriceComparisonError.name;
    }
}
exports.UnknownPriceComparisonError = UnknownPriceComparisonError;
function createComparison(unitValue, inputUnit, comparisonTypeCode) {
    const comparisonType = priceComparisonTypes[comparisonTypeCode];
    if (comparisonType == null) {
        throw new UnknownPriceComparisonError(comparisonTypeCode);
    }
    const toUnit = measurementUnits.units[comparisonType.unit];
    if (toUnit == null) {
        throw new PriceComparisonError(`Price comparison had invalid unit ${comparisonType.unit}`);
    }
    const factor = 1 / convert(unitValue, inputUnit, toUnit);
    const symbol = `/${'overrides' in comparisonType && 'symbol' in comparisonType.overrides
        ? comparisonType.overrides.symbol
        : toUnit.symbol}`;
    const name = ` per ${'overrides' in comparisonType && 'name' in comparisonType.overrides
        ? comparisonType.overrides.name
        : toUnit.name}`;
    return {
        factor,
        symbol,
        name,
    };
}
exports.createComparison = createComparison;
function compare(price, factor, suffix) {
    const comparePrice = price * factor;
    const priceStr = comparePrice.toFixed(2);
    if (!/\d+.\d+/.test(priceStr)) {
        return `${priceStr} kr`;
    }
    const split = priceStr.split('.');
    let [kr] = split;
    const [, cents] = split;
    if (kr.length > 4) {
        kr = kr
            .split('')
            .reverse()
            .join('')
            .match(/\d{1,3}/g)
            .join(' ')
            .split('')
            .reverse()
            .join('');
    }
    return `${kr},${cents}kr${suffix}`;
}
exports.compare = compare;
exports.default = convert;
