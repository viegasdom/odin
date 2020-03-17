import React from 'react';
import { Global, css } from '@emotion/core';

const Layout = ({ children }) => {
  return (
    <>
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
          h6 {
            font-size: 14px;
            line-height: 1.1;
            + * {
              margin-top: 1.5rem;
            }
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
        `}
      />
      <div
        css={css`
          margin: 2rem auto 4rem;
        `}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
