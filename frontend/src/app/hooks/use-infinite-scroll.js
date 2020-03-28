import { useState, useEffect, useRef, useCallback } from 'react';
import { isEqual } from 'lodash';

import { batchArray } from '../utils/array-utils';

const useInfiniteScroll = (array, subArraySize) => {
  const batched = batchArray(array, subArraySize);

  const arrayRef = useRef();

  const [chunk, setChunk] = useState(0);
  const [currentArray, setCurrentArray] = useState([]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    if (chunk < batched.length - 1) {
      setChunk(chunk + 1);
    }
  }, [chunk, batched]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (!array.length) {
      setCurrentArray([]);
    }

    if (array.length && !isEqual(arrayRef.current, array)) {
      arrayRef.current = array;
      setCurrentArray([...batched[0]]);
    }
  }, [array]);

  useEffect(() => {
    // When there's an existing current array
    // get only the elements that are not being currently displayed
    // so there's no issues with duplicate keys in elements.
    if (currentArray.length) {
      const currentPids = currentArray.map(element => element.pid);
      const filteredBatch = batched[chunk].filter(
        element => !currentPids.includes(element.pid),
      );

      setCurrentArray([...currentArray, ...filteredBatch]);
    }
  }, [chunk]);

  return [currentArray];
};

export default useInfiniteScroll;
