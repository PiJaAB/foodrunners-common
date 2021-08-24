/* eslint-disable @typescript-eslint/naming-convention */
import type { Constraint } from './constraints';

export type AdFormats = {
  banner: {
    public: {
      path: string;
    };
    internal: {
      path: string;
    };
  };
};

export const existingAdRegions = [
  'shoppingList',
  'search',
  'activeList',
  'coupons',
  'promotions',
] as const;

export type AdRegions = typeof existingAdRegions[number];

export type InternalAdRegion = {
  [key in keyof AdFormats]?: AdFormats[key]['internal'] | boolean;
};

type TargetDefs<ProductDocumentReference, CouponDocumentReference> = {
  product: {
    internal: {
      ref: ProductDocumentReference;
    };
    public: {
      refPath: string;
      id: string;
    };
  };
  coupon: {
    internal: {
      ref: CouponDocumentReference;
    };
    public: {
      refPath: string;
      id: string;
    };
  };
  external: {
    internal: {
      uri: string;
    };
    public: {
      uri: string;
    };
  };
};

export type G_AdTargets<ProductDocumentReference, CouponDocumentReference> = {
  [key in keyof TargetDefs<
    ProductDocumentReference,
    CouponDocumentReference
  >]: {
    internal: {
      [key2 in
        | keyof TargetDefs<
            ProductDocumentReference,
            CouponDocumentReference
          >[key]['internal']
        | 'type']: (TargetDefs<
        ProductDocumentReference,
        CouponDocumentReference
      >[key]['internal'] & { type: key })[key2];
    };
    public: {
      [key2 in
        | keyof TargetDefs<
            ProductDocumentReference,
            CouponDocumentReference
          >[key]['public']
        | 'type']: (TargetDefs<
        ProductDocumentReference,
        CouponDocumentReference
      >[key]['public'] & { type: key })[key2];
    };
  };
};

export type G_InternalAdTarget<
  ProductDocumentReference,
  CouponDocumentReference,
> = G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference
>[keyof G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference
>]['internal'];
export type G_PublicAdTarget<
  ProductDocumentReference,
  CouponDocumentReference,
> = G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference
>[keyof G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference
>]['public'];

export interface G_AdCampaign<
  Timestamp,
  ProductDocumentReference,
  CouponDocumentReference,
> {
  name: string;
  published: boolean;
  endDate: Timestamp;
  formats: {
    [key in keyof AdFormats]?: AdFormats[key]['internal'];
  };
  regions: Partial<Record<AdRegions, InternalAdRegion>>;
  constraint?: Constraint | null;
  maxClicks?: number | null;
  weight: number;
  clicks?: number | null;
  target: G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference
  >[keyof G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference
  >]['internal'];
}

export type AdRegion = {
  [key in keyof AdFormats]?: AdFormats[key]['public'];
};

export interface G_PublicAdCampaign<
  ProductDocumentReference,
  CouponDocumentReference,
> {
  name: string;
  refPath: string;
  id: string;
  weight: number;
  endDate: number;
  regions: Partial<Record<AdRegions, AdRegion>>;
  target: G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference
  >[keyof G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference
  >]['public'];
}
