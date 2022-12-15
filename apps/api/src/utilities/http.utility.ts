export enum HttpStatus {
  Ok = 200,
  Created = 201,

  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,

  InternalServerError = 500,
  NotImplemented = 501,
}

const HTTP_STATUS_MAP: Record<HttpStatus, string> = {
  [HttpStatus.Ok]: 'OK',
  [HttpStatus.Created]: 'Created',
  [HttpStatus.BadRequest]: 'Bad Request',
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

export class HttpBadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class HttpForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}

export class HttpNotImplementedError extends HttpError {
  constructor(message: string) {
    super(501, message);
  }
}
