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

          html,
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            font-size: 1rem;
            line-height: 1.4;
          }

          /* Removing margin from the main div */
          > div {
            margin-top: 0;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          th {
            font-size: 14px;
            line-height: 2;
          }

          td,
          th {
            text-align: left;
            padding: 40px;
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
            max-width: 90vw;
            width: 1000px;
          }

          .row {
            border-bottom: 1px solid black;
            transition: 0.1s;

            :hover {
              background: #fafafa;
              transition: 0.1s;
            }

            :focus {
              background: #fafafa;
            }
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
