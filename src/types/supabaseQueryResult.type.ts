export type SupabaseQueryResult<T> = {
  data: T | null;
  error: Error | null;
};
