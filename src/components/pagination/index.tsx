import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './styles.css';

interface PaginationProps {
  pages: number[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

function Pagination({
  pages,
  currentPage,
  nextPage,
  prevPage,
  setPage,
}: PaginationProps) {
  const separatorCode = -1;

  return (
    <div className='pagination indent'>
      <Link
        onClick={prevPage}
        to={`/${currentPage}`}
        className='pagination__btn'
      >
        Назад
      </Link>
      <div className='pagination__pages'>
        {pages.map((page, index) =>
          page === separatorCode ? (
            <div key={index}>...</div>
          ) : (
            <NavLink
              onClick={() => setPage(page)}
              to={`/${page}`}
              key={index}
              className={({ isActive }) =>
                `pagination__page ${isActive ? 'active' : ''}`
              }
            >
              {page}
            </NavLink>
          )
        )}
      </div>
      <div className='pagination indent'>
        <Link
          onClick={nextPage}
          to={`/${currentPage}`}
          className='pagination__btn'
        >
          Вперед
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
