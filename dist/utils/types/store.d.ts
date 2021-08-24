import type { Measurement } from './measurements';
export declare const storeTypes: {
    readonly citygross: "City Gross";
    readonly coop: "Coop";
    readonly hemkop: "Hemköp";
    readonly ica: "ICA";
    readonly willys: "Willys";
};
export declare type G_PartialStore<Timestamp, StoreDocumentReference, GeoPoint> = Pick<G_Store<Timestamp, StoreDocumentReference, GeoPoint>, 'id' | 'name' | 'icon' | 'location' | 'type' | 'webCrawlSourceType' | 'skipWebcrawl'> & {
    distance: Measurement;
    ref: StoreDocumentReference;
};
export interface G_Store<Timestamp, StoreDocumentReference, GeoPoint> {
    overrides?: {
        address?: {
            postAddress?: string[];
            postalCode?: string;
            town?: string;
        };
        location?: GeoPoint;
        name?: string;
        url?: string;
    };
    address: {
        postAddress: string[];
        postalCode: string | null;
        town: string | null;
    };
    icon: string;
    id: string;
    secondaryId?: string;
    location: GeoPoint;
    name: string;
    type: keyof typeof storeTypes;
    url: string | null;
    closest: G_PartialStore<Timestamp, StoreDocumentReference, GeoPoint>[];
    skipWebcrawl?: boolean | Timestamp | null;
    webCrawlSourceType?: string;
    hasPrices?: boolean;
    thumbsUp?: number;
    thumbsDown?: number;
    failedCrawlings?: number;
    shouldBeRemoved?: boolean;
    removed?: boolean;
}
