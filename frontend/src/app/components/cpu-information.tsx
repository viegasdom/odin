/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Card, Progress } from 'antd';

type CPUInformationProps = {
  cpu: number[];
  loading: boolean;
};

const CpuInformation = ({ cpu, loading }: CPUInformationProps) => {
  return (
    <Card loading={loading}>
      <h2>CPU Information</h2>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, 50%);
          grid-template-rows: repeat(2, auto);
          grid-row-gap: 1px;
          grid-column-gap: 9px;
        `}
      >
        {cpu.map((corePercentage, id) => {
          return (
            <li css={css``} key={`${corePercentage}-${id}`}>
              <Progress
                css={css`
                  max-width: 10rem;
                `}
                percent={corePercentage}
                status="active"
              />
            </li>
          );
        })}
      </div>
    </Card>
  );
};

export default CpuInformation;
