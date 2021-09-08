/* eslint-disable @typescript-eslint/naming-convention */

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
