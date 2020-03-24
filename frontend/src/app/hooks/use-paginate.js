import { batchArray } from '../utils/array-utils';
import { useState } from 'react';

const usePaginate = (array = [], pageSize) => {
  const batched = batchArray(array, pageSize);
  const [page, setPage] = useState(0);
  return [batched[page], batched.length, setPage];
};

export default usePaginate;
