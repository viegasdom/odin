import React from 'react';
import { css } from '@emotion/core';

const ProcessEnvironment = ({ environment }) => {
  console.log(environment);
  return (
    <>
      <strong>Environment</strong>
      <div
        css={css`
          margin-top: 0.5rem;
          background: white;
          padding: 10px;
          border-radius: 8px;
          width: fit-content;
        `}
      >
        <ul>
          {Object.entries(environment).map(([key, value]) => {
            return (
              <li
                key={key}
                css={css`
                  font-family: Fira code;
                  font-size: 0.7rem;
                `}
              >
                <span
                  css={css`
                    color: #ff0000a1;
                  `}
                >
                  {key}
                </span>
                : {value}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ProcessEnvironment;
