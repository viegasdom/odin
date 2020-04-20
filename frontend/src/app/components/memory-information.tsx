import React from 'react';
import { memoryConverter } from '../utils';
import { Card } from 'antd';

type MemoryinformationProps = {
  type: string;
  total: number;
  available: number;
  percent: number;
  used: number;
  free: number;
};

const MemoryInformation = ({
  type,
  total,
  available,
  percent,
  used,
  free,
}: MemoryinformationProps) => {
  return (
    <Card>
      <h2>{type} Details</h2>
      <ul>
        <li>
          <strong>Total:</strong> {memoryConverter(total)} GB
        </li>
        <li>
          <strong>Used:</strong> {memoryConverter(used)} GB
        </li>
        <li>
          <strong>Free:</strong> {memoryConverter(free)} GB
        </li>

        {available ? (
          <li>
            <strong>Available:</strong> {memoryConverter(available)} GB
          </li>
        ) : null}

        <li>
          <strong>Percent:</strong> {percent}%
        </li>
      </ul>
    </Card>
  );
};

export default MemoryInformation;
