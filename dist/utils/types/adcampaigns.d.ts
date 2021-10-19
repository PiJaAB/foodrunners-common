import type { G_AppTargets } from './appTarget';
import type { Constraint } from './constraints';
export declare const existingAdRegions: readonly ["shoppingList", "search", "activeList", "coupons", "promotions"];
export declare const existingAdFormats: readonly ["banner"];
export declare type AdFormats = {
    banner: {
        public: {
            path: string;
        };
        internal: {
            path: string;
        };
    };
};
export declare type AdRegions = typeof existingAdRegions[number];
export declare type InternalAdRegion = {
    [key in typeof existingAdFormats[number]]?: AdFormats[key]['internal'] | boolean;
};
export declare type G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference> = Omit<G_AppTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>, never>;
export declare type G_InternalAdTarget<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference> = G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>[keyof G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>]['internal'];
export declare type PublicAdTarget = G_AdTargets<never, never, never>[keyof G_AdTargets<never, never, never>]['public'];
export interface G_AdCampaign<Timestamp, ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference> {
    name: string;
    published: boolean;
    endDate: Timestamp;
    formats: {
        [key in keyof AdFormats]?: AdFormats[key]['internal'];
    };
    regions: Partial<Record<AdRegions, InternalAdRegion>>;
    constraint?: Constraint | null;
    statsLastUpdated?: string;
    clicks?: number | null;
    maxClicks?: number | null;
    views?: number | null;
    maxViews?: number | null;
    pendingViews?: number | null;
    pendingClicks?: number | null;
    pendingCheckouts?: number | null;
    pendingCarts?: number | null;
    pendingShoppingLists?: number | null;
    checkouts?: number | null;
    addedToCart?: number | null;
    addedToShoppingList?: number | null;
    weight: number;
    target: G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>[keyof G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>]['internal'];
}
export declare type AdRegion = {
    [key in keyof AdFormats]?: AdFormats[key]['public'];
};
export interface G_PublicAdCampaign<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference> {
    name: string;
    refPath: string;
    id: string;
    weight: number;
    endDate: number;
    regions: Partial<Record<AdRegions, AdRegion>>;
    target: G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>[keyof G_AdTargets<ProductDocumentReference, CouponDocumentReference, ExternalCampaignDocumentReference>]['public'];
}
