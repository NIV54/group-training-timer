export interface Storage<T> {
  get: (id: string) => T | null;
  set: (id: string, value: T) => void;
}
