import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use the default initial value
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(parsedValue);

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
