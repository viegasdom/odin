/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link } from '@reach/router';

type MenuProps = {
  labels: string[];
  location: Location;
};

const Menu = ({ labels, location }: MenuProps) => {
  return (
    <div
      css={css`
        border-bottom: 1px solid #d0d0d0;
        padding-bottom: 10px;
      `}
    >
      <div className="container">
        {labels.map((label) => {
          const path = label.toLowerCase();
          const active = location.pathname.includes(path);
          return (
            <Link
              to={path}
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
