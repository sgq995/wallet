import { Static, Type } from '@sinclair/typebox';

export const TimePeriodSchema = Type.Object({
  periodicity: Type.Union([
    Type.Literal('daily'),
    Type.Literal('weekly'),
    Type.Literal('monthly'),
    Type.Literal('quarterly'),
    Type.Literal('semerter'),
    Type.Literal('yearly'),
  ]),
  when: Type.Union([Type.Number(), Type.Literal('begin'), Type.Literal('end')]),
});

export type TTimePeriodSchema = Static<typeof TimePeriodSchema>;
