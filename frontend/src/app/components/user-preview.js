import React from 'react';
import { css } from '@emotion/core';
import ProcessesPreview from './processes-preview';

const UserPreview = ({ username, processes }) => {
  return (
    <div
      css={css`
        :first-of-type {
          margin-bottom: 2rem;
        }
      `}
    >
      <h2>{username} processes</h2>
      <ProcessesPreview processes={processes} />
    </div>
  );
};

export default UserPreview;
