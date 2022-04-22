import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  let [storedValue, setStoredValue] = useState<T>(defaultValue);

  if (typeof window === 'undefined') return [storedValue, setStoredValue];

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setStoredValue(JSON.parse(item));
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
