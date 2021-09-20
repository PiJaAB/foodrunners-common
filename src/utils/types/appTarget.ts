/* eslint-disable @typescript-eslint/naming-convention */
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

export type G_AppTargets<
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

export type G_InternalAppTarget<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = G_AppTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>[keyof G_AppTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>]['internal'];
export type G_PublicAppTarget<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference,
> = G_AppTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>[keyof G_AppTargets<
  ProductDocumentReference,
  CouponDocumentReference,
  ExternalCampaignDocumentReference
>]['public'];
