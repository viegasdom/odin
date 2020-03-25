import { batchArray } from '../utils/array-utils';
import { useState, useEffect } from 'react';

const useInfiniteScroll = (array, subArraySize) => {
  const batched = batchArray(array, subArraySize);
  const [chunk, setChunk] = useState(0);
  const [currentArray, setCurrentArray] = useState([]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    setChunk(chunk + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    // Initial setup of the current array being displayed
    // in order to set it up there has to be a valid array
    // being passed down to the hook.
    if (array && !currentArray.length) {
      setCurrentArray([...batched[0]]);
    }

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
  }, [chunk, array]);

  return [currentArray];
};

export default useInfiniteScroll;
