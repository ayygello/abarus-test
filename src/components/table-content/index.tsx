import React from 'react';
import './styles.css';
import { ITable } from '../../interfaces';

interface TableContentProps {
  item: ITable;
}

function TableContent({ item }: TableContentProps) {
  return (
    <tbody>
      <tr>
        <td className='table-content__cell'>{item.id}</td>
        <td className='table-content__cell'>{item.title}</td>
        <td className='table-content__cell'>{item.body}</td>
      </tr>
    </tbody>
  );
}

export default React.memo(TableContent);
