import React from 'react';
import { css } from '@emotion/core';
import { Link } from '@reach/router';

const Menu = ({ labels, location }) => {
  return (
    <div
      css={css`
        border-bottom: 1px solid #d0d0d0;
        padding-bottom: 10px;
      `}
    >
      <div className="container">
        {labels.map(label => {
          const active = location.pathname.includes(label.toLowerCase());
          return (
            <Link
              to={label.toLowerCase()}
              css={css`
                text-decoration: none;
                margin-right: 3rem;
                color: ${active ? 'black' : '#666'};
                font-weight: ${active ? 'bold' : 'none'};
                border-bottom: 1px solid black;
                padding-bottom: 12px;
                width: fit-content;

                :hover {
                  color: black;
                  transition: 0.3s;
                }

                :focus {
                  color: black;
                  outline-offset: 3px;
                }
              `}
              key={label}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
