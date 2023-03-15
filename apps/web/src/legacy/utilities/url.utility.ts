function isDefined(literal: any) {
  return typeof literal !== 'undefined';
}

export function objectToUrlSearchParams(obj: any) {
  const keys = Object.keys(obj);
  const values: any[] = Object.values(obj);

  const params = keys.reduce((params, key, index) => {
    const value = values[index];
    if (isDefined(value)) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value.toString());
      params.push(`${encodedKey}=${encodedValue}`);
    }
    return params;
  }, [] as string[]);

  return params.join('&');
}
