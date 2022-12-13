import { HttpStatus } from './http.utility';

export function isSuccessfulStatus(status: HttpStatus | number) {
  return 200 <= status && status < 300;
}

export function isRedirectionStatus(status: HttpStatus | number) {
  return 300 <= status && status < 400;
}

export function isClientErrorStatus(status: HttpStatus | number) {
  return 400 <= status && status < 500;
}

export function isServerErrorStatus(status: HttpStatus | number) {
  return 500 <= status && status < 600;
}

export function isErrorStatus(status: HttpStatus | number) {
  return isClientErrorStatus(status) || isServerErrorStatus(status);
}
