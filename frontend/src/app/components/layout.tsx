/** @jsx jsx */

import { Fragment } from 'react';
import { Global, css, jsx } from '@emotion/core';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }

          /* Removing margin from the main div */
          > div {
            margin-top: 0;
          }

          li {
            margin-top: 0.25rem;
            list-style: none;
          }

          ul {
            padding: 0;
          }

          .container {
            margin: auto;
            width: 1000px;
          }
        `}
      />
      <div
        css={css`
          margin: 2rem auto 4rem;
        `}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;
