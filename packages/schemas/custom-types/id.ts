import { NumericOptions, Type } from '@sinclair/typebox';

export const Id = (options?: NumericOptions) =>
  Type.Number({ minimum: 1, ...options });
