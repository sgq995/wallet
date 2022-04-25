import { NumberOptions, Type } from '@sinclair/typebox';

export const Id = (options?: NumberOptions) =>
  Type.Number({ minimum: 1, ...options });
