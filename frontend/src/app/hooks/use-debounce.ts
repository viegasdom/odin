import { useState, useEffect } from 'react';

const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debouncedCallback = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debouncedCallback);
  }, [value, delay]);

  return [debouncedValue];
};

export default useDebounce;
