import React from 'react';
import './styles.css';

interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return <table className='table indent'>{children}</table>;
}

export default React.memo(Table);
