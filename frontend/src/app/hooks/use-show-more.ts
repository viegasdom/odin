import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { isEqual } from 'lodash';
import { batchArray } from '../utils/array-utils';

type UseShowMoreOptions = {
  batchSize: number;
  uniqueID: string;
};

interface IShowMoreObject {
  [key: string]: string | number;
}

const useShowMore = <T extends IShowMoreObject>(
  array: T[],
  { batchSize, uniqueID }: UseShowMoreOptions,
): [boolean, T[], number, Dispatch<SetStateAction<number>>] => {
  const batched = batchArray(array, batchSize);
  const showMoreRef = useRef(0);
  const [showMore, setShowMore] = useState(0);
  const [currentDisplayed, setCurrentDisplayed] = useState(batched[showMore]);
  const [notShowMore, setnotShowMore] = useState(true);

  useEffect(() => {
    const notUpdated = currentDisplayed.filter((cd) =>
      array.some((value) => isEqual(cd, value)),
    );
    const toUpdate = currentDisplayed
      .filter((cd) =>
        notUpdated.every((element) => cd[uniqueID] !== element[uniqueID]),
      )
      .map((cd) => cd[uniqueID]);

    const updatedElemenents = array.filter((element) =>
      toUpdate.includes(element[uniqueID]),
    );

    setCurrentDisplayed([...notUpdated, ...updatedElemenents]);
  }, [array]);

  useEffect(() => {
    if (showMoreRef.current > showMore) {
      setCurrentDisplayed(
        currentDisplayed.slice(0, currentDisplayed.length - batchSize),
      );
    } else if (showMore && showMore < batched.length) {
      setCurrentDisplayed([...currentDisplayed, ...batched[showMore]]);
    }

    // Check ahead of time if the next showMore will be equal
    // to the length of the batch, if don't allow to show more
    setnotShowMore(showMore + 1 === batched.length);

    // Set the ref so there's the previous
    // value to compare on each new showRef
    showMoreRef.current = showMore;
  }, [showMore]);

  return [notShowMore, currentDisplayed, showMore, setShowMore];
};

export default useShowMore;
