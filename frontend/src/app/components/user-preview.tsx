/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import ProcessesPreview from './processes-preview';
import { Processes } from '../features/processes-view/processes-view-slice';

type UserPreviewProps = {
  username: string;
  processes: Processes[];
};

const UserPreview = ({ username, processes }: UserPreviewProps) => {
  return (
    <div
      css={css`
        :first-of-type {
          margin-bottom: 2rem;
        }
      `}
    >
      <h2>{username} processes</h2>
      <ProcessesPreview processes={processes} />
    </div>
  );
};

export default UserPreview;
