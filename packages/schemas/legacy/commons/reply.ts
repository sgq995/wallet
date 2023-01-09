import { Static } from '@sinclair/typebox';

import { BadRequest, NotFound } from '../helpers/responses';

export const HttpBadRequest = BadRequest();

export type THttpBadRequest = Static<typeof HttpBadRequest['400']>;

export const HttpNotFound = NotFound();

export type THttpNotFound = Static<typeof HttpNotFound['404']>;
