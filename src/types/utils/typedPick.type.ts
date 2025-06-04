export type TypedPick<T, K extends keyof T, V> = {
  [P in K]: V;
};
