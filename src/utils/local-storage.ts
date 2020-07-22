export const save = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const get = (key: string) => window.localStorage.getItem(key);
