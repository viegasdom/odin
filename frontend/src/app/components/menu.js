import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';

const Menu = ({ labels }) => {
  return (
    <div
      css={css`
        border-bottom: 1px solid #d0d0d0;
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
            to={label === 'Overview' ? '/' : label.toLowerCase()}
            css={css`
              text-decoration: none;
              color: #666;
              border-bottom: 1px solid black;
              padding-bottom: 12px;
              width: fit-content;
              transition: 0.3s;

              :hover {
                color: black;
                transition: 0.3s;
              }

              :focus {
                transition: 0.3s;
                color: black;
                outline: none;
              }
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
