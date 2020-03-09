import React from 'react';
import ProcessesPreview from './processes-preview';

const UserPreview = ({ username, processes }) => {
  return (
    <div>
      <h2>{username}</h2>
      <ProcessesPreview processes={processes} />
    </div>
  );
};

export default UserPreview;
