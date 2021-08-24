import type { Constructor } from './types';
interface Options<E extends {
    toMillis(): number;
} | undefined> {
    timestampClass?: E extends NonNullable<E> ? Constructor<E> : undefined;
}
declare type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void ? I : never;
declare type UnionToTuple<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W ? [...UnionToTuple<Exclude<T, W>>, W] : [];
declare type TimestampToNumberNoUnion<T, Timestamp> = T extends Timestamp ? number : T extends Readonly<Record<string | number | symbol, any>> | readonly any[] ? {
    [key in keyof T]: TimestampToNumber<T[key], Timestamp>;
} : T;
export declare type TimestampToNumber<T, Timestamp> = {
    [key in keyof UnionToTuple<T>]: TimestampToNumberNoUnion<UnionToTuple<T>[key], Timestamp>;
}[number];
declare type Null<T> = T extends null | undefined ? undefined : never;
declare function recursiveClean<T, E extends {
    toMillis(): number;
} | undefined = undefined>(obj: T, options?: Options<E>, searched?: Map<unknown, unknown>): E extends NonNullable<E> ? TimestampToNumber<T, E> : E extends Null<E> ? T : T | TimestampToNumber<T, NonNullable<E>>;
export default recursiveClean;
