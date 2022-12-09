import { IRoute } from './route.model';

export interface IController {
  routes(): IRoute[];
}

export function isController(def: unknown): def is IController {
  if (typeof def !== 'object') {
    return false;
  }

  if (def === null) {
    return false;
  }

  if (typeof (<IController>def).routes !== 'function') {
    return false;
  }

  return true;
}
