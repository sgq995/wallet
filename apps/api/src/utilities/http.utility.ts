const HTTP_STATUS_MAP: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  501: 'Not Implemented',
};

export function httpStatusToString(status: number) {
  return HTTP_STATUS_MAP[status];
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}

export class NotImplementedError extends HttpError {
  constructor(message: string) {
    super(501, message);
  }
}
