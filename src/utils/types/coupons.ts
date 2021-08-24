/* eslint-disable @typescript-eslint/naming-convention */
import { TimestampToNumber } from '../recursiveClean';
import type { Constraint } from './constraints';

export interface G_CouponCampaign<Timestamp> {
  claimed: number;
  mobileCouponTemplateId?: string | null;
  printCouponTemplateId?: string | null;
  maxClaims: number;
  failedClaims: number;
  name: string;
  imageUrl?: string | null;
  text: string;
  published: boolean;
  validUntil: Timestamp;
  isDynamic: 0 | 1 | 2;
  value: number;
  constraint?: Constraint | null;
}

interface BasePublicCouponCampaign<
  Status extends string,
  Timestamp,
  CouponDocumentReference,
> {
  status: Status;
  ref: CouponDocumentReference;
  name: string;
  text: string;
  imageUrl?: string | null;
  campaignCreated: Timestamp;
  validUntil: Timestamp;
  validUntilStr: string;
  valueString: string;
  value: number;
  isDynamic?: 0 | 1 | 2;
  capabilities: readonly ('print' | 'mobile')[];
}

interface CouponInstance<T, Timestamp> {
  type: T;
  claimedAt: Timestamp;
  couponId: number;
  url: string;
}

export interface G_UnclaimedCoupon<Timestamp, CouponDocumentReference>
  extends BasePublicCouponCampaign<
    'unclaimed',
    Timestamp,
    CouponDocumentReference
  > {
  instanceClaimed: false;
}

export interface G_ClaimedMobileCoupon<Timestamp, CouponDocumentReference>
  extends BasePublicCouponCampaign<
    'claimed' | 'redeemed',
    Timestamp,
    CouponDocumentReference
  > {
  instanceClaimed: true;
  couponInstance: CouponInstance<'mobile', Timestamp> & {
    code: string;
  } & (
      | {
          showQR: false;
          QRText?: undefined;
        }
      | {
          showQR: true;
          QRText: string;
        }
    );
}

export interface G_ClaimedPrintCoupon<Timestamp, CouponDocumentReference>
  extends BasePublicCouponCampaign<
    'claimed' | 'redeemed',
    Timestamp,
    CouponDocumentReference
  > {
  instanceClaimed: true;
  couponInstance: CouponInstance<'print', Timestamp>;
}

export type G_ClaimedCoupon<Timestamp, CouponDocumentReference> =
  | G_ClaimedMobileCoupon<Timestamp, CouponDocumentReference>
  | G_ClaimedPrintCoupon<Timestamp, CouponDocumentReference>;

export type G_PublicCouponCampaign<Timestamp, CouponDocumentReference> =
  | G_ClaimedCoupon<Timestamp, CouponDocumentReference>
  | G_UnclaimedCoupon<Timestamp, CouponDocumentReference>;

export type G_APICouponCampaign<
  Timestamp extends { toMillis(): number },
  CouponDocumentReference,
> = TimestampToNumber<
  | Omit<G_ClaimedCoupon<Timestamp, CouponDocumentReference>, 'ref'>
  | Omit<G_UnclaimedCoupon<Timestamp, CouponDocumentReference>, 'ref'>,
  Timestamp
> & {
  refPath: string;
  id: string;
};
