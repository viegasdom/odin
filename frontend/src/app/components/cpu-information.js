import React from 'react';
import { css } from '@emotion/core';

const CpuInformation = ({ cpu }) => {
  return (
    <>
      <h2>CPU Cores Information</h2>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 33%);
          grid-template-rows: repeat(3, auto);
          grid-row-gap: 1px;
          grid-column-gap: 9px;
        `}
      >
        {cpu.map((corePercentage, id) => {
          return (
            <li css={css``} key={`${corePercentage}-${id}`}>
              {corePercentage}
            </li>
          );
        })}
      </div>
    </>
  );
};

export default CpuInformation;
