export type Constructor<
  Instance,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Static = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args extends unknown[] = any[],
> = {
  new (...args: Args): Instance;
} & Static;

export type FullyPopulated<
  T extends Record<string | number | symbol, unknown>,
> = {
  [P in keyof T]: T[P] extends infer Q | undefined ? Q : T[P];
};

export * from './adcampaigns';
export * from './constraints';
export * from './coupons';
export * from './measurements';
export * from './product';
export * from './store';
export * from './user';
export * from './externalCampaign';
export * from './appTarget';
export * from './pushNotifications';
