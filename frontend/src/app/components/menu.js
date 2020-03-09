import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';

const Menu = ({ labels }) => {
  return (
    <div
      css={css`
        border-bottom: 1px solid #d0d0d0;
        margin-bottom: 2rem;
        padding-bottom: 10px;
      `}
    >
      <div
        css={css`
          margin: auto;
          max-width: 90vw;
          width: 1000px;
        `}
      >
        {labels.map(label => (
          <Link
            to={label.toLowerCase()}
            css={css`
              text-decoration: none;
              color: black;
              border-bottom: 1px solid black;
              padding-bottom: 12px;
              width: fit-content;
            `}
            key={label}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
