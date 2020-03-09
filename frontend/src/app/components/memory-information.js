import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const MemoryInformation = ({ type, total, available, percent, used, free }) => {
  const converter = number => (number / 10 ** 9).toFixed(2);

  return (
    <div>
      <h2>{type} Details</h2>
      <p>
        <strong>Total:</strong> {converter(total)} GB
      </p>
      <p>
        <strong>Used:</strong> {converter(used)} GB
      </p>
      <p>
        <strong>Free:</strong> {converter(free)} GB
      </p>

      {available ? (
        <p>
          <strong>Available:</strong> {converter(available)} GB
        </p>
      ) : null}

      <p>
        <strong>Percent:</strong> {percent}
      </p>
    </div>
  );
};

export default MemoryInformation;
