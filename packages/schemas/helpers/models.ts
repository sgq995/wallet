import { TObject, TProperties, Type } from '@sinclair/typebox';

export function CreateQuery<T extends TObject<TProperties>>(model: T) {
  const FilteringModel = Type.Partial(model);
  const SortingModel = Type.Object({
    sort: Type.Optional(Type.KeyOf(model)),
    desc: Type.Optional(Type.Boolean()),
  });
  const PaginationModel = Type.Object({
    cursor: Type.Optional(
      Type.Object({
        key: Type.KeyOf(model),
        value: Type.Any(),
      })
    ),
    skip: Type.Optional(Type.Number({ minimum: 0 })),
    take: Type.Optional(Type.Number({ minimum: 0 })),
  });

  return Type.Intersect([FilteringModel, SortingModel, PaginationModel]);
}
