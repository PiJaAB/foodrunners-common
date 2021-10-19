import { G_PartialStore } from './store';
export interface FavoriteListLineItem {
    product: {
        brand: string;
        category: string;
        gtin: string;
        hasImage: boolean;
        name: string;
    };
    locked?: boolean;
    quantity: number;
}
export interface FavoriteList {
    lineItems: {
        [key: string]: FavoriteListLineItem;
    };
    name: string;
    uid: string;
    ownerDisplayName?: string;
    sharedWith?: string[];
}
export interface G_ShoppingListLineItem<Timestamp, StoreDocumentReference, ProductDocumentReference> {
    inCart?: boolean;
    cart?: {
        addedAt: Timestamp;
        addedBy: string;
        storeRef: StoreDocumentReference;
        pricePerUnit: number;
    };
    locked?: boolean;
    product: {
        brand: string;
        category: string;
        gtin: string;
        hasImage: boolean;
        name: string;
        productGroup?: string | null;
        ref: ProductDocumentReference;
    };
    adSource?: {
        id: string;
        region: string;
        format: string;
    };
    homePrice?: number;
    storePrice?: number;
    quantity: number;
}
export declare type G_ShoppingListStore<Timestamp, StoreDocumentReference, GeoPoint> = Omit<G_PartialStore<Timestamp, StoreDocumentReference, GeoPoint>, 'distance'>;
export interface G_ShoppingList<Timestamp, StoreDocumentReference, GeoPoint, ShoppingListLineItem> {
    active: boolean;
    lineItems: {
        [key: string]: ShoppingListLineItem;
    };
    name: string;
    uid: string;
    store?: G_ShoppingListStore<Timestamp, StoreDocumentReference, GeoPoint>;
    ownerDisplayName?: string;
    sharedWith?: string[];
    currentlyShopping?: {
        [uid: string]: {
            store: G_ShoppingListStore<Timestamp, StoreDocumentReference, GeoPoint> | null;
        };
    };
}
export interface G_Checkout<Timestamp, ShoppingListReference, ShoppingListLineItem> {
    date: Timestamp;
    lineItems: {
        [key: string]: ShoppingListLineItem;
    };
    shoppingListRef: ShoppingListReference;
    uid: string;
}
export interface G_Review<Timestamp> {
    comment: string;
    date: Timestamp;
    thumb: string;
    uid: string;
}
export interface GroupMembership {
    name: string;
    description: string;
}
export declare type Tutorials = 'DiscountsScene' | 'CouponScene' | 'FavoriteListsScene' | 'SearchScene' | 'ShoppingListScene' | 'PromoCodesScene';
export interface G_User<StoreDocumentReference> {
    homeStore?: {
        name: string;
        ref: StoreDocumentReference;
    };
    gender?: string;
    birthYear?: number;
    postalCode?: string;
    displayName?: string;
    latestAddedProducts?: string[];
    tutorialsSeen?: Partial<Record<Tutorials, boolean>>;
    allowTestNotifications?: boolean;
    deviceTokens?: string[];
    hasDeviceToken?: boolean;
}
