const BASE_URL = 'http://localhost:5000';

export class RequestError<T = any> extends Error {
  readonly status: number;
  readonly body: T;

  constructor(status: number, body: T, message?, options?) {
    super(message, options);

    this.status = status;
    this.body = body;
  }
}

export async function request<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  let response: Response = null;
  if (typeof input === 'string') {
    response = await fetch(`${BASE_URL}${input}`, init);
  } else {
    response = await fetch(
      {
        ...input,
        url: `${BASE_URL}${input.url}`,
      },
      init
    );
  }

  const body = await response.json();

  if (!response.ok) {
    throw new RequestError<T>(response.status, body);
  }

  return body;
}

export function requestWithBaseFactory(routeBase: string) {
  return function requestWithBase<T>(input: RequestInfo, init?: RequestInit) {
    if (typeof input === 'string') {
      return request<T>(`${routeBase}${input}`, init);
    } else {
      return request<T>(
        {
          ...input,
          url: `${routeBase}/${input.url}`,
        },
        init
      );
    }
  };
}

export function requestFactory(routeBase: string) {
  return function queryFunctionFactory<T>(
    input: RequestInfo,
    init?: RequestInit
  ) {
    if (typeof input === 'string') {
      return () => request<T>(`${routeBase}${input}`, init);
    } else {
      return () =>
        request<T>(
          {
            ...input,
            url: `${routeBase}/${input.url}`,
          },
          init
        );
    }
  };
}
