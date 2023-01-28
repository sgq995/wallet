function booleanToQuery(key: string, bool: boolean): string {
  return `${key}=${bool ? 'true' : 'false'}`;
}

function numberToQuery(key: string, num: number): string {
  return `${key}=${num}`;
}

function stringToQuery(key: string, str: string): string {
  return `${key}=${encodeURIComponent(str)}`;
}

function dictionaryToQuery(key: string, dict: Record<string, any>): string {
  return joinQueryParams(
    Object.keys(dict).map((dictKey: string): string =>
      typeToQuery(`${key}[${dictKey}]`, dict[dictKey])
    )
  );
}

function arrayToQuery(key: string, array: any[]): string {
  return joinQueryParams(
    array.map((value: any): string => typeToQuery(`${key}[]`, value))
  );
}

function objectToQuery(
  key: string,
  obj: Record<string, any> | any[] | null
): string {
  if (obj === null) {
    return '';
  }

  if (Array.isArray(obj)) {
    return arrayToQuery(key, obj);
  }

  return dictionaryToQuery(key, obj);
}

const typeToQueryMap = {
  boolean: booleanToQuery,
  number: numberToQuery,
  string: stringToQuery,
  object: objectToQuery,
};

function typeToQuery(key: string, value: any): string {
  return (
    typeToQueryMap[typeof value]?.(
      encodeURIComponent(decodeURIComponent(key)),
      value
    ) ?? ''
  );
}

function joinQueryParams(queryParams: string[]): string {
  return queryParams.filter((query: string) => query.length > 0).join('&');
}

export function buildUrlQuery(params: Record<string, any>): string {
  return joinQueryParams(
    Object.keys(params).map((key) => typeToQuery(key, params[key]))
  );
}

export function buildUrl(
  baseUrl: string,
  endpoint: string,
  query?: Record<string, any>
) {
  const finalBaseUrl = baseUrl.replace(/\/$/, '');
  const finalEndpoint = endpoint.replace(/^\//, '');
  const finalParams = query ? `?${buildUrlQuery(query)}` : '';

  return `${finalBaseUrl}/${finalEndpoint}${finalParams}`;
}
