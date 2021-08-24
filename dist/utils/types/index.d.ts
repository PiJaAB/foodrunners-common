export declare type Constructor<Instance, Static = {}, Args extends unknown[] = any[]> = {
    new (...args: Args): Instance;
} & Static;
export declare type FullyPopulated<T extends Record<string | number | symbol, unknown>> = {
    [P in keyof T]: T[P] extends infer Q | undefined ? Q : T[P];
};
export * from './adcampaigns';
export * from './constraints';
export * from './coupons';
export * from './measurements';
export * from './product';
export * from './store';
export * from './user';
