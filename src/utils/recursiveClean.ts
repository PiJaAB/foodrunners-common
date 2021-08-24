import type { Constructor } from './types';

interface Options<E extends { toMillis(): number } | undefined> {
  timestampClass?: E extends NonNullable<E> ? Constructor<E> : undefined;
}

type UnionToIntersection<U> = (
  U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
  ? I
  : never;

type UnionToTuple<T> = UnionToIntersection<
  T extends never ? never : (t: T) => T
> extends (_: never) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

type TimestampToNumberNoUnion<T, Timestamp> = T extends Timestamp
  ? number
  : T extends Readonly<Record<string | number | symbol, any>> | readonly any[]
  ? { [key in keyof T]: TimestampToNumber<T[key], Timestamp> }
  : T;

export type TimestampToNumber<T, Timestamp> = {
  [key in keyof UnionToTuple<T>]: TimestampToNumberNoUnion<
    UnionToTuple<T>[key],
    Timestamp
  >;
}[number];

type Null<T> = T extends null | undefined ? undefined : never;

function recursiveClean<
  T,
  E extends { toMillis(): number } | undefined = undefined,
>(
  obj: T,
  options?: Options<E>,
  searched?: Map<unknown, unknown>,
): E extends NonNullable<E>
  ? TimestampToNumber<T, E>
  : E extends Null<E>
  ? T
  : T | TimestampToNumber<T, NonNullable<E>>;
function recursiveClean<T, E extends { toMillis(): number } | undefined>(
  obj: T,
  options: Options<E> = {},
  searched = new Map<unknown, unknown>(),
): T | number {
  const { timestampClass } = options;
  if (typeof obj !== 'object' || obj == null) return obj;
  if (searched.has(obj)) return searched.get(obj) as T;
  if (Array.isArray(obj)) {
    const newArr = obj.filter((v) => typeof v !== 'undefined');
    searched.set(obj, newArr);
    newArr.forEach((value, index) => {
      newArr[index] = recursiveClean(value, options, searched);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return newArr as any;
  }
  if (
    timestampClass != null &&
    obj instanceof (timestampClass as NonNullable<typeof timestampClass>)
  ) {
    const millis = obj.toMillis();
    searched.set(obj, millis);
    return millis;
  }
  const newObj: Partial<T> = {};
  searched.set(obj, newObj);
  Object.keys(obj).forEach((key) => {
    if (typeof (obj as Record<string, unknown>)[key] !== 'undefined') {
      newObj[key as keyof T] = recursiveClean(
        (obj as Partial<Record<string, unknown>>)[key],
        options,
        searched,
      ) as T[keyof T];
    }
  });
  return newObj as T;
}

export default recursiveClean;
