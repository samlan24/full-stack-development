import React from 'react';

const Filter = ({ filterName, handleFilterName }) => {
  return (
    <div>
      Who to see: <input value={filterName} onChange={handleFilterName} />
    </div>
  );
};

export default Filter;
