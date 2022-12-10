export async function to<T>(
  promise: Promise<T>
): Promise<[T | null, unknown | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}
