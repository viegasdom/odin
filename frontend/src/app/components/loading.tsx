/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
  return (
    <div
      className="container"
      css={css`
        align-items: center;
        align-content: center;
        text-align: center;
        margin-top: 4rem;
      `}
    >
      <LoadingOutlined
        css={css`
          font-size: 5rem;
        `}
      />
    </div>
  );
}

export default Loading;
