import { useState } from 'react';
import { ITable, IPagination } from '../interfaces';

function usePagination(itemsOnPage: number): IPagination {
  const [currentPage, setCurrentPage] = useState(1);

  function getDataOnPage(data: ITable[]) {
    const start: number = (currentPage - 1) * itemsOnPage;
    const end: number = start + itemsOnPage;
    return data.slice(start, end);
  }

  function getPages(data: ITable[]) {
    const pages: number[] = [];
    const maxPages = Math.ceil(data.length / itemsOnPage);

    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  function nextPage(data: ITable[]) {
    const maxPages = Math.ceil(data.length / itemsOnPage);
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPages));
  }

  function prevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function setPage(page: number) {
    setCurrentPage(() => page);
  }

  return {
    nextPage,
    prevPage,
    setPage,
    getDataOnPage,
    getPages,
    currentPage,
  };
}

export default usePagination;
