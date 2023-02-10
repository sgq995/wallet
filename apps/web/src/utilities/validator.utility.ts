export function flowOr(...args: Function[]) {
  return (value) => args.some((func) => func(value));
}

export function flowAnd(...args: Function[]) {
  return (value) => args.every((func) => func(value));
}
