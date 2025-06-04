export type NullablePick<T, K extends keyof T> = {
  [P in K]: T[P] | null;
};
