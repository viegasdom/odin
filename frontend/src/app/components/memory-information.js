import React from 'react';
import { memoryConverter } from '../utils';

const MemoryInformation = ({ type, total, available, percent, used, free }) => {
  return (
    <div>
      <h2>{type} Details</h2>
      <p>
        <strong>Total:</strong> {memoryConverter(total)} GB
      </p>
      <p>
        <strong>Used:</strong> {memoryConverter(used)} GB
      </p>
      <p>
        <strong>Free:</strong> {memoryConverter(free)} GB
      </p>

      {available ? (
        <p>
          <strong>Available:</strong> {memoryConverter(available)} GB
        </p>
      ) : null}

      <p>
        <strong>Percent:</strong> {percent}%
      </p>
    </div>
  );
};

export default MemoryInformation;
