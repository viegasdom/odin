export const batchArray = (array, subArraySize) => {
  const batch = [];

  let subArray = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (i && i % subArraySize === 0) {
      batch.push(subArray);
      subArray = [];
    }
    subArray.push(element);
  }

  return batch;
};
