export type TIndex = number;

export type TIndexable<T> = { id: TIndex } & T;

export type TRecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? TRecursivePartial<U>[]
    : T[P] extends object
    ? TRecursivePartial<T[P]>
    : T[P];
};
