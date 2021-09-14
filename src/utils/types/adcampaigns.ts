/* eslint-disable @typescript-eslint/naming-convention */
import type { Constraint } from './constraints';

export const existingAdRegions = [
  'shoppingList',
  'search',
  'activeList',
  'coupons',
  'promotions',
] as const;

export const existingAdFormats = [
  'banner',
] as const;

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

export type AdRegions = typeof existingAdRegions[number];

export type InternalAdRegion = {
  [key in typeof existingAdFormats[number]]?: AdFormats[key]['internal'] | boolean;
};

type TargetDefs<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = {
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
  externalCampaign: {
    internal: {
      ref: ExternalCampaignDocumentReference;
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

export type G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = {
  [key in keyof TargetDefs<
    ProductDocumentReference,
    CouponDocumentReference,
    ExternalCampaignDocumentReference
  >]: {
    internal: {
      [key2 in
        | keyof TargetDefs<
            ProductDocumentReference,
            CouponDocumentReference,
            ExternalCampaignDocumentReference
          >[key]['internal']
        | 'type']: (TargetDefs<
        ProductDocumentReference,
        CouponDocumentReference,
        ExternalCampaignDocumentReference
      >[key]['internal'] & { type: key })[key2];
    };
    public: {
      [key2 in
        | keyof TargetDefs<
            ProductDocumentReference,
            CouponDocumentReference,
            ExternalCampaignDocumentReference
          >[key]['public']
        | 'type']: (TargetDefs<
        ProductDocumentReference,
        CouponDocumentReference,
        ExternalCampaignDocumentReference
      >[key]['public'] & { type: key })[key2];
    };
  };
};

export type G_InternalAdTarget<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>[keyof G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>]['internal'];
export type G_PublicAdTarget<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>[keyof G_AdTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>]['public'];

export interface G_AdCampaign<
  Timestamp,
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> {
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
  weight: number;
  target: G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference,
    ExternalCampaignDocumentReference
  >[keyof G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference,
    ExternalCampaignDocumentReference
  >]['internal'];
}

export type AdRegion = {
  [key in keyof AdFormats]?: AdFormats[key]['public'];
};

export interface G_PublicAdCampaign<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> {
  name: string;
  refPath: string;
  id: string;
  weight: number;
  endDate: number;
  regions: Partial<Record<AdRegions, AdRegion>>;
  target: G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference,
    ExternalCampaignDocumentReference
  >[keyof G_AdTargets<
    ProductDocumentReference,
    CouponDocumentReference,
    ExternalCampaignDocumentReference
  >]['public'];
}
