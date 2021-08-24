import type * as priceComparisonTypes from '../../codeData/priceComparisonTypes.json';
import type * as measurementUnits from '../../codeData/measurementUnits.json';

export type PriceComparisonType = keyof typeof priceComparisonTypes;
export type MeasurementUnits = keyof typeof measurementUnits['units'];

export interface Measurement {
  value: number;
  unit: MeasurementUnits;
}
