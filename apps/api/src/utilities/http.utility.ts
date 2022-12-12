export enum HttpStatus {
  Ok = 200,
  Created = 201,

  Forbidden = 403,
  NotFound = 404,

  InternalServerError = 500,
  NotImplemented = 501,
}

const HTTP_STATUS_MAP: Record<HttpStatus, string> = {
  [HttpStatus.Ok]: 'OK',
  [HttpStatus.Created]: 'Created',
  [HttpStatus.Forbidden]: 'Forbidden',
  [HttpStatus.NotFound]: 'Not Found',
  [HttpStatus.InternalServerError]: 'Internal Server Error',
  [HttpStatus.NotImplemented]: 'Not Implemented',
};

export function httpStatusToString(status: HttpStatus) {
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
