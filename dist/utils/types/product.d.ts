import type { LevelOfContainmentCodeEnumeration, AllergenCodeEnumeration, PackagingMarkedLabelAccreditationCodeEnumeration, PackageTypeCodeEnumeration, PriceComparisonTypeCodeEnumeration, PackagingMarkedFreeFromCodeEnumeration } from '../enumerations';
import type { Measurement, MeasurementUnits } from './measurements';
declare type LevelOfContainment = {
    [key in LevelOfContainmentCodeEnumeration]?: AllergenCodeEnumeration[];
};
export interface AllergenInfo extends LevelOfContainment {
    statements?: string[];
}
export interface Package {
    markings?: PackagingMarkedLabelAccreditationCodeEnumeration[];
    type?: PackageTypeCodeEnumeration;
    height?: Measurement;
    width?: Measurement;
    depth?: Measurement;
    drainedWeight?: Measurement;
    grossWeight?: Measurement;
    netWeight?: Measurement;
    netVolume?: Measurement;
    netContent?: Measurement;
}
export declare type NutritionList = Partial<Record<string, {
    multi: true;
    quantity: Measurement[];
    measurementPrecisionCode?: string;
    expressedAsPartOf?: string;
} | {
    multi: false;
    quantity: Measurement;
    measurementPrecisionCode?: string;
    expressedAsPartOf?: string;
}>>;
export interface PriceComparison {
    factor: number;
    type: PriceComparisonTypeCodeEnumeration;
}
export interface Product {
    gtin: string;
    hasImage: boolean;
    category: string;
    gs1Category: string;
    name: string;
    brand: string;
    subBrand?: string;
    description?: string;
    allergenInfo?: AllergenInfo;
    packaging?: Package;
    ingredients?: string;
    nutrients?: {
        byMeasure: {
            quantity: Measurement;
            values: NutritionList;
        };
        byServing?: {
            quantity: Measurement;
            values: NutritionList;
        };
    };
    soldInUnits?: MeasurementUnits;
    lowestPrice?: number;
    priceComparison?: PriceComparison;
    markedFreeFrom?: PackagingMarkedFreeFromCodeEnumeration[];
    productGroup?: {
        name: string;
        searchTerm?: string;
        id: string;
    };
}
export interface ElasticDoc {
    product_data: Product;
    id: string;
    name: string;
    brand: string;
    sub_brand?: string;
    category: string;
    description?: string;
    gluten_free: boolean;
    low_gluten: boolean;
    milk_free: boolean;
    lactose_free: boolean;
    low_lactose: boolean;
    peanut_free: boolean;
    nut_free: boolean;
    has_price: boolean;
    product_group_name?: string;
}
export interface ProductGroup {
    name: string;
    searchTerm: string | null;
    products: [];
}
export interface G_ProductPrice<GeoPoint> {
    location: GeoPoint;
    price: number;
    priceSource: string;
}
export interface G_ProductGroupPrice<GeoPoint> {
    price: number;
    priceSource: string;
    product: {
        brand: string;
        category: string;
        gtin: string;
        hasImage: boolean;
        name: string;
        priceComparison?: PriceComparison;
        subBrand?: string;
    };
    store: {
        icon: string;
        id: string;
        location?: GeoPoint;
        name: string;
        type: string;
    };
}
export {};
