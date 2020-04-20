/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Fragment } from 'react';

type ProcessEnvironmentProps = {
  environment: {
    [key: string]: string;
  };
};

const ProcessEnvironment = ({ environment = {} }: ProcessEnvironmentProps) => {
  return (
    <Fragment>
      <strong>Environment</strong>
      <div
        css={css`
          margin-top: 0.5rem;
          background: white;
          padding: 10px;
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
    </Fragment>
  );
};

export default ProcessEnvironment;
