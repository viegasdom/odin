export const batchArray = (array, subArraySize) => {
  // Guard for cases where the array length is one
  // return a nested array to be compliat
  if (array.length === 1) {
    return [array];
  }

  const batch = [];
  let subArray = [];
  for (let i = 0; i <= array.length; i++) {
    const element = array[i];
    // Check if the index is a multiple of the current size
    // also looks out for cases where the array has finished
    // and pushes the remaining subarray.
    if ((i && i % subArraySize === 0) || i === array.length) {
      batch.push(subArray);
      subArray = [];
    }
    subArray.push(element);
  }

  return batch;
};
