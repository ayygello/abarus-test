import React from 'react';
import './styles.css';

interface TableToolsProps {
  onSortId: () => void;
  onSorttitle: () => void;
  onSortBody: () => void;
}

function TableTools({ onSortId, onSorttitle, onSortBody }: TableToolsProps) {
  return (
    <thead>
      <tr className='table-tools'>
        <th className='table-tools__item' onClick={onSortId}>
          <span>ID</span>
          <div className='table-tools__triangle'></div>
        </th>
        <th className='table-tools__item' onClick={onSorttitle}>
          <span>Заголовок</span>
          <div className='table-tools__triangle'></div>
        </th>
        <th className='table-tools__item' onClick={onSortBody}>
          <span>Описание</span>
          <div className='table-tools__triangle'></div>
        </th>
      </tr>
    </thead>
  );
}

export default React.memo(TableTools);
