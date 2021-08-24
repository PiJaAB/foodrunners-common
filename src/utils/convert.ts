/* eslint-disable max-classes-per-file */
import * as measurementUnits from '../codeData/measurementUnits.json';
import * as priceComparisonTypes from '../codeData/priceComparisonTypes.json';

type PriceComparisonTypes = keyof typeof priceComparisonTypes;
type PriceComparisonType = typeof priceComparisonTypes[PriceComparisonTypes];

type Units = keyof typeof measurementUnits.units;
type Unit = typeof measurementUnits.units[Units];

export class UnitError extends Error {
  name = UnitError.name;
}

export class UnknownUnitError extends UnitError {
  name = UnknownUnitError.name;

  constructor(unitCode: string) {
    super(`Unit ${unitCode} is unknown and cannot be converted.`);
  }
}

export class IncompatibleUnitError extends UnitError {
  name = IncompatibleUnitError.name;

  constructor(fromUnit: Unit, toUnit: Unit) {
    super(
      `Cannot convert from ${fromUnit.name}[${fromUnit.conversionInfo.type}] to ${toUnit.name}[${toUnit.conversionInfo.type}] as they have incompatible types.`,
    );
  }
}

function convert(value: number, from: string | Unit, to: string | Unit): number;
function convert(
  value: number,
  from: string | Unit,
  to: string | Unit,
  decimals: number,
): string;
function convert(
  value: number,
  from: string | Unit,
  to: string | Unit,
  decimals?: number,
): string | number;
function convert(
  value: number,
  from: string | Unit,
  to: string | Unit,
  decimals?: number,
): string | number {
  const fromUnit =
    typeof from === 'object'
      ? from
      : (measurementUnits.units[from as Units] as Unit | undefined);
  const toUnit =
    typeof to === 'object'
      ? to
      : (measurementUnits.units[to as Units] as Unit | undefined);
  if (fromUnit == null) {
    throw new UnknownUnitError(from as string);
  }
  if (toUnit == null) {
    throw new UnknownUnitError(to as string);
  }
  let convertedValue: number;
  if (from === to) {
    convertedValue = value;
  } else {
    if (fromUnit.conversionInfo.type !== toUnit.conversionInfo.type) {
      throw new IncompatibleUnitError(fromUnit, toUnit);
    }
    convertedValue =
      (value * fromUnit.conversionInfo.factor) / toUnit.conversionInfo.factor;
  }
  if (decimals != null) return convertedValue.toFixed(decimals);
  return convertedValue;
}

export class PriceComparisonError extends Error {
  name = PriceComparisonError.name;
}

export class UnknownPriceComparisonError extends PriceComparisonError {
  name = UnknownPriceComparisonError.name;

  constructor(comparisonCode: string) {
    super(`Price comparison type code ${comparisonCode} is unknown.`);
  }
}

export function createComparison(
  unitValue: number,
  inputUnit: string | Unit,
  comparisonTypeCode: string,
): { factor: number; symbol: string; name: string } {
  const comparisonType = priceComparisonTypes[
    comparisonTypeCode as PriceComparisonTypes
  ] as PriceComparisonType | undefined;
  if (comparisonType == null) {
    throw new UnknownPriceComparisonError(comparisonTypeCode);
  }
  const toUnit = measurementUnits.units[comparisonType.unit as Units] as
    | Unit
    | undefined;
  if (toUnit == null) {
    throw new PriceComparisonError(
      `Price comparison had invalid unit ${comparisonType.unit}`,
    );
  }
  const factor = 1 / convert(unitValue, inputUnit, toUnit);
  const symbol = `/${
    'overrides' in comparisonType && 'symbol' in comparisonType.overrides
      ? comparisonType.overrides.symbol
      : toUnit.symbol
  }`;
  const name = ` per ${
    'overrides' in comparisonType && 'name' in comparisonType.overrides
      ? comparisonType.overrides.name
      : toUnit.name
  }`;
  return {
    factor,
    symbol,
    name,
  };
}

export function compare(price: number, factor: number, suffix: string): string {
  const comparePrice = price * factor;
  const priceStr = comparePrice.toFixed(2);
  if (!/\d+.\d+/.test(priceStr)) {
    return `${priceStr} kr`;
  }
  const split = priceStr.split('.');
  let [kr] = split;
  const [, cents] = split;
  if (kr.length > 4) {
    kr = (
      kr
        .split('')
        .reverse()
        .join('')
        .match(/\d{1,3}/g) as string[]
    )
      .join(' ')
      .split('')
      .reverse()
      .join('');
  }
  return `${kr},${cents}kr${suffix}`;
}

export default convert;
