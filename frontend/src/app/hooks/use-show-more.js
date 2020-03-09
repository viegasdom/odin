import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { batchArray } from '../utils/array-utils';

const showMore = (array, { batchSize, uniqueID }) => {
  const batched = batchArray(array, batchSize);
  const [showMore, setShowMore] = useState(0);
  const [currentDisplayed, setCurrentDisplayed] = useState(batched[showMore]);

  useEffect(() => {
    const notUpdated = currentDisplayed.filter(cd => array.some(value => isEqual(cd, value)));
    const toUpdate = currentDisplayed
      .filter(cd => notUpdated.every(element => cd[uniqueID] !== element[uniqueID]))
      .map(cd => cd[uniqueID]);
    const updatedElemenents = array.filter(element => toUpdate.includes(element[uniqueID]));
    setCurrentDisplayed([...notUpdated, ...updatedElemenents]);
  }, [array]);

  useEffect(() => {
    if (showMore && showMore < batched.length) {
      setCurrentDisplayed([...currentDisplayed, ...batched[showMore]]);
    }
  }, [showMore]);

  return [currentDisplayed, showMore, setShowMore];
};

export default showMore;
