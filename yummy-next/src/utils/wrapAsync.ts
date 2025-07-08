// utils/wrapAsync.ts
export async function wrapAsync<T>(promise: Promise<T>): Promise<[T | null, any]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}
