export function flowOr<T>(...args: ((value: T) => boolean)[]) {
  return (value: T) => args.some((func) => func(value));
}

export function flowAnd<T>(...args: ((value: T) => boolean)[]) {
  return (value: T) => args.every((func) => func(value));
}
