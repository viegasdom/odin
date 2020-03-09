export const batchArray = (array, subArraySize) => {
  const batch = [];
  let subArray = [];
  array.forEach((element, i) => {
    if (i && i % subArraySize === 0) {
      batch.push(subArray);
      // Reset sub array after pushing the current batch
      subArray = [];
    }
    subArray.push(element);
  });
  return batch;
};
