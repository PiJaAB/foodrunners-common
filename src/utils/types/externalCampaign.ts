/* eslint-disable @typescript-eslint/naming-convention */

import type { TimestampToNumber } from '../recursiveClean';
import type { Constraint } from './constraints';

export interface G_ExternalCampaign<Timestamp> {
  externalUri: string;
  openInWebview: boolean;
  name: string;
  imagePath: string;
  textColor: string;
  bgColor: string;
  text: string;
  published: boolean;
  validUntil: Timestamp;
  constraint?: Constraint | null;
}

export interface G_PublicExternalCampaign<ExternalCampaignRef, Timestamp> {
  ref: ExternalCampaignRef;
  externalUri: string;
  openInWebview: boolean;
  name: string;
  text: string;
  imagePath: string;
  textColor: string;
  bgColor: string;
  campaignCreated: Timestamp;
  validUntil: Timestamp;
  validUntilStr: string;
}

export type G_APIExternalCampaign<
  Timestamp extends { toMillis(): number },
  ExternalDocumentReference,
> = TimestampToNumber<
  Omit<G_PublicExternalCampaign<Timestamp, ExternalDocumentReference>, 'ref'>,
  Timestamp
> & {
  refPath: string;
  id: string;
};
