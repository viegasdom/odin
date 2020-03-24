import React from 'react';
import { css } from '@emotion/core';

const ProcessItem = ({ pid, username, name, status }) => {
  return (
    <tr
      css={css`
        background: white;
      `}
      className="row"
    >
      <td>{pid}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{status}</td>
    </tr>
  );
};

export default ProcessItem;
