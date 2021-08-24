/* eslint-disable @typescript-eslint/no-redeclare */
import allergenCodes from '../codeData/allergenCodes.json';
import levelOfContainmentCodes from '../codeData/levelOfContainmentCodes.json';
import packagingMarkedLabelAccreditationCodes from '../codeData/packagingMarkedLabelAccreditationCodes.json';
import packageTypeCodes from '../codeData/packageTypeCodes.json';
import priceComparisonTypes from '../codeData/priceComparisonTypes.json';
import freeFromCodes from '../codeData/freeFromCodes.json';

export const DocumentCommandEnumeration = [
  'ADD',
  'CHANGE_BY_REFRESH',
  'CORRECT',
  'DELETE',
] as const;
export type DocumentCommandEnumeration =
  typeof DocumentCommandEnumeration[number];

export const DocumentActionEnumeration = [
  'ADD',
  'CHANGE_BY_REFRESH',
  'DELETE',
] as const;
export type DocumentActionEnumeration =
  typeof DocumentActionEnumeration[number];

export const DocumentStatusEnumeration = [
  'ADDITIONAL_TRANSMISSION',
  'COPY',
  'ORIGINAL',
] as const;
export type DocumentStatusEnumeration =
  typeof DocumentStatusEnumeration[number];

export const CatalogueItemStateEnumeration = [
  'CANCELED',
  'DISCONTINUED',
  'IN_PROGRESS',
  'REGISTERED',
] as const;
export type CatalogueItemStateEnumeration =
  typeof CatalogueItemStateEnumeration[number];

export const NonBinaryLogicEnumeration = [
  'FALSE',
  'NOT_APPLICABLE',
  'TRUE',
  'UNSPECIFIED',
] as const;
export type NonBinaryLogicEnumeration =
  typeof NonBinaryLogicEnumeration[number];

export const AllowanceOrChargeEnumeration = ['ALLOWANCE', 'CHARGE'] as const;
export type AllowanceOrChargeEnumeration =
  typeof AllowanceOrChargeEnumeration[number];

export const AllergenCodeEnumeration = Object.keys(
  allergenCodes,
) as readonly (keyof typeof allergenCodes)[];
export type AllergenCodeEnumeration = typeof AllergenCodeEnumeration[number];

export const LevelOfContainmentCodeEnumeration = Object.keys(
  levelOfContainmentCodes,
) as readonly (keyof typeof levelOfContainmentCodes)[];
export type LevelOfContainmentCodeEnumeration =
  typeof LevelOfContainmentCodeEnumeration[number];

export const PackagingMarkedLabelAccreditationCodeEnumeration = Object.keys(
  packagingMarkedLabelAccreditationCodes,
) as readonly (keyof typeof packagingMarkedLabelAccreditationCodes)[];
export type PackagingMarkedLabelAccreditationCodeEnumeration =
  typeof PackagingMarkedLabelAccreditationCodeEnumeration[number];

export const PackageTypeCodeEnumeration = Object.keys(
  packageTypeCodes,
) as readonly (keyof typeof packageTypeCodes)[];
export type PackageTypeCodeEnumeration =
  typeof PackageTypeCodeEnumeration[number];

export const PriceComparisonTypeCodeEnumeration = Object.keys(
  priceComparisonTypes,
) as readonly (keyof typeof priceComparisonTypes)[];
export type PriceComparisonTypeCodeEnumeration =
  typeof PriceComparisonTypeCodeEnumeration[number];

export const PackagingMarkedFreeFromCodeEnumeration = Object.keys(
  freeFromCodes,
) as readonly (keyof typeof freeFromCodes)[];
export type PackagingMarkedFreeFromCodeEnumeration =
  typeof PackagingMarkedFreeFromCodeEnumeration[number];
