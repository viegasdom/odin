/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import CPUBar from './cpu-bar';

type CPUInformationProps = {
  cpu: number[];
};

const CpuInformation = ({ cpu }: CPUInformationProps) => {
  return (
    <div>
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
              <CPUBar cpuPercentage={corePercentage} />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default CpuInformation;
