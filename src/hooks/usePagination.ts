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
    const separatorCode = -1;

    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }

    if (pages.length <= 5) {
      return pages;
    }

    if (currentPage === 1 || (currentPage === 2 && pages.length > 3)) {
      return [1, 2, 3, separatorCode, maxPages];
    }

    if (currentPage === 3) {
      return [1, 2, 3, 4, separatorCode, maxPages];
    }

    if (currentPage === maxPages - 2) {
      return [
        1,
        separatorCode,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        maxPages,
      ];
    }

    if (currentPage === maxPages || currentPage === maxPages - 1) {
      return [1, separatorCode, maxPages - 2, maxPages - 1, maxPages];
    }

    return [
      1,
      separatorCode,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      separatorCode,
      maxPages,
    ];
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
