export interface ITable {
  id: number;
  title: string;
  body: string;
}

export interface ITableState {
  items: ITable[];
  filteredItems: ITable[];
  isLoading: boolean;
  error: null | string;
  isSorted: boolean;
}

export interface IPagination {
  nextPage: (data: ITable[]) => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  getDataOnPage: (data: ITable[]) => ITable[];
  getPages: (data: ITable[]) => number[];
  currentPage: number;
}
