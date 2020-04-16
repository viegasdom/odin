/** @jsx jsx */

import { Link } from '@reach/router';
import { css, jsx } from '@emotion/core';

type ProcessItemProps = {
  pid: number;
  username: string;
  name: string;
  status: string;
};

const ProcessItem = ({ pid, username, name, status }: ProcessItemProps) => {
  return (
    <tr
      className="row"
      css={css`
        background: white;
      `}
    >
      <td>
        <Link
          css={css`
            text-decoration: none;
            color: black;
            font-weight: bold;
          `}
          to={`${pid}`}
        >
          {pid}
        </Link>
      </td>
      <td>
        <Link
          css={css`
            text-decoration: none;
            color: black;
            font-weight: bold;
          `}
          to={`${pid}`}
        >
          {name}
        </Link>
      </td>
      <td>{username}</td>
      <td>
        <span
          css={css`
            background: #28a745;
            padding: 10px;
            border-radius: 10px;

            * > {
              background: #28a745;
            }
          `}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default ProcessItem;
