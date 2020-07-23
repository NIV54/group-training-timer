import { Storage } from "./storage.type";

export class LocalStorage<T> implements Storage<T> {
  get = (key: string) => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }

    return null;
  };
  set = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
}
