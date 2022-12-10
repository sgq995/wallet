export async function applyToMany<TEntity, TResult>(
  operator: (entity: TEntity[]) => Promise<TResult | TResult[]>,
  entities: TEntity[]
) {
  try {
    const result = await operator(entities);
    if (Array.isArray(result)) {
      return result;
    }
    return [result];
  } catch (e) {
    throw e;
  }
}
