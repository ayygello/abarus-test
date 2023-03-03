import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  fetchData,
  sortById,
  sortByTitle,
  sortByBody,
  setMatchedPosts,
} from '../../store/tableSlice';
import usePagination from '../../hooks/usePagination';

import Table from '../../components/table';
import TableContent from '../../components/table-content';
import TableTools from '../../components/table-tools';
import { ITable } from '../../interfaces';
import Pagination from '../../components/pagination';
import Input from '../../components/input';
import Layout from '../../components/layout';
import { getMatchedPosts } from '../../utils';

function Main() {
  const dispatch = useAppDispatch();
  const { items, isLoading, filteredItems } = useAppSelector(
    (state) => state.table
  );

  const { nextPage, prevPage, setPage, getDataOnPage, getPages, currentPage } =
    usePagination(10);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const pickedPosts = filteredItems.length ? filteredItems : items;

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.trim() === '') {
      dispatch(setMatchedPosts([]));
      return;
    }

    let search = getMatchedPosts(items, value);

    if (!search.length) {
      dispatch(
        setMatchedPosts([{ id: null, title: 'Ничего не нашлось', body: '' }])
      );
      return;
    }

    dispatch(setMatchedPosts(search));
  };

  return (
    <Layout>
      {isLoading && <h1>Загрузка...</h1>}

      <Input onSearch={(e) => handleOnSearch(e)} />

      <Table>
        <TableTools
          onSortId={() => dispatch(sortById())}
          onSorttitle={() => dispatch(sortByTitle())}
          onSortBody={() => dispatch(sortByBody())}
        />
        {getDataOnPage(pickedPosts).map((item: ITable) => (
          <TableContent item={item} key={item.id} />
        ))}
      </Table>

      <Pagination
        pages={getPages(pickedPosts)}
        nextPage={() => nextPage(pickedPosts)}
        prevPage={prevPage}
        currentPage={currentPage}
        setPage={setPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
