"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagingMarkedFreeFromCodeEnumeration = exports.PriceComparisonTypeCodeEnumeration = exports.PackageTypeCodeEnumeration = exports.PackagingMarkedLabelAccreditationCodeEnumeration = exports.LevelOfContainmentCodeEnumeration = exports.AllergenCodeEnumeration = exports.AllowanceOrChargeEnumeration = exports.NonBinaryLogicEnumeration = exports.CatalogueItemStateEnumeration = exports.DocumentStatusEnumeration = exports.DocumentActionEnumeration = exports.DocumentCommandEnumeration = void 0;
/* eslint-disable @typescript-eslint/no-redeclare */
const allergenCodes_json_1 = __importDefault(require("../codeData/allergenCodes.json"));
const levelOfContainmentCodes_json_1 = __importDefault(require("../codeData/levelOfContainmentCodes.json"));
const packagingMarkedLabelAccreditationCodes_json_1 = __importDefault(require("../codeData/packagingMarkedLabelAccreditationCodes.json"));
const packageTypeCodes_json_1 = __importDefault(require("../codeData/packageTypeCodes.json"));
const priceComparisonTypes_json_1 = __importDefault(require("../codeData/priceComparisonTypes.json"));
const freeFromCodes_json_1 = __importDefault(require("../codeData/freeFromCodes.json"));
exports.DocumentCommandEnumeration = [
    'ADD',
    'CHANGE_BY_REFRESH',
    'CORRECT',
    'DELETE',
];
exports.DocumentActionEnumeration = [
    'ADD',
    'CHANGE_BY_REFRESH',
    'DELETE',
];
exports.DocumentStatusEnumeration = [
    'ADDITIONAL_TRANSMISSION',
    'COPY',
    'ORIGINAL',
];
exports.CatalogueItemStateEnumeration = [
    'CANCELED',
    'DISCONTINUED',
    'IN_PROGRESS',
    'REGISTERED',
];
exports.NonBinaryLogicEnumeration = [
    'FALSE',
    'NOT_APPLICABLE',
    'TRUE',
    'UNSPECIFIED',
];
exports.AllowanceOrChargeEnumeration = ['ALLOWANCE', 'CHARGE'];
exports.AllergenCodeEnumeration = Object.keys(allergenCodes_json_1.default);
exports.LevelOfContainmentCodeEnumeration = Object.keys(levelOfContainmentCodes_json_1.default);
exports.PackagingMarkedLabelAccreditationCodeEnumeration = Object.keys(packagingMarkedLabelAccreditationCodes_json_1.default);
exports.PackageTypeCodeEnumeration = Object.keys(packageTypeCodes_json_1.default);
exports.PriceComparisonTypeCodeEnumeration = Object.keys(priceComparisonTypes_json_1.default);
exports.PackagingMarkedFreeFromCodeEnumeration = Object.keys(freeFromCodes_json_1.default);
