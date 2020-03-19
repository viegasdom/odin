import React from 'react';
import { css } from '@emotion/core';

const CPUBar = ({ cpuPercentage }) => {
  return (
    <div
      css={css`
        width: 15rem;
        border-radius: 5px;
        background: gray;
      `}
    >
      {cpuPercentage}
    </div>
  );
};

export default CPUBar;
