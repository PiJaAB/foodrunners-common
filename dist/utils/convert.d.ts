import * as measurementUnits from '../codeData/measurementUnits.json';
declare type Units = keyof typeof measurementUnits.units;
declare type Unit = typeof measurementUnits.units[Units];
export declare class UnitError extends Error {
    name: string;
}
export declare class UnknownUnitError extends UnitError {
    name: string;
    constructor(unitCode: string);
}
export declare class IncompatibleUnitError extends UnitError {
    name: string;
    constructor(fromUnit: Unit, toUnit: Unit);
}
declare function convert(value: number, from: string | Unit, to: string | Unit): number;
declare function convert(value: number, from: string | Unit, to: string | Unit, decimals: number): string;
declare function convert(value: number, from: string | Unit, to: string | Unit, decimals?: number): string | number;
export declare class PriceComparisonError extends Error {
    name: string;
}
export declare class UnknownPriceComparisonError extends PriceComparisonError {
    name: string;
    constructor(comparisonCode: string);
}
export declare function createComparison(unitValue: number, inputUnit: string | Unit, comparisonTypeCode: string): {
    factor: number;
    symbol: string;
    name: string;
};
export declare function compare(price: number, factor: number, suffix: string): string;
export default convert;
