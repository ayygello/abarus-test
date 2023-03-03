import React from 'react';
import { ReactComponent as Logo } from './search-svgrepo-com 1.svg';
import './styles.css';

interface InputProps {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ onSearch }: InputProps) {
  return (
    <div className='input-container indent'>
      <input
        className='input'
        type='text'
        placeholder='Поиск'
        onChange={onSearch}
      />
      <div className='input-logo'>
        <Logo />
      </div>
    </div>
  );
}

export default React.memo(Input);
