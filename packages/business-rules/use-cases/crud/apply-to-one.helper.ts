export async function applyToOne<TEntity, TResult>(
  operator: (entity: TEntity) => Promise<TResult | TResult[]>,
  entity: TEntity
) {
  try {
    const result = await operator(entity);
    if (Array.isArray(result)) {
      return result[0];
    }
    return result;
  } catch (e) {
    throw e;
  }
}
