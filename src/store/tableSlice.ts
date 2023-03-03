import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import { ITable, ITableState } from '../interfaces';

export const fetchData = createAsyncThunk<
  ITable[],
  undefined,
  { rejectValue: string }
>('table/fetchData', async function (_, { rejectWithValue }) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!response.ok) {
    return rejectWithValue(`Ошибка: ${response.status}`);
  }

  const data = await response.json();

  return data;
});

const initialState: ITableState = {
  items: [],
  filteredItems: [],
  isLoading: false,
  error: null,
  isSorted: false,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    sortById: (state: ITableState) => {
      if (state.isSorted) {
        state.items.sort((prev, next) => prev.id - next.id);
        state.isSorted = false;
        return;
      }

      state.items.sort((prev, next) => next.id - prev.id);
      state.isSorted = true;
    },
    sortByTitle: (state: ITableState) => {
      if (state.isSorted) {
        state.items.sort((prev, next) => (prev.title > next.title ? -1 : 1));
        state.isSorted = false;
        return;
      }

      state.items.sort((prev, next) => (prev.title > next.title ? 1 : -1));
      state.isSorted = true;
    },
    sortByBody: (state: ITableState) => {
      if (state.isSorted) {
        state.items.sort((prev, next) => (prev.body > next.body ? -1 : 1));
        state.isSorted = false;
        return;
      }

      state.items.sort((prev, next) => (prev.body > next.body ? 1 : -1));
      state.isSorted = true;
    },
    setMatchedPosts: (state: ITableState, action) => {
      state.filteredItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { sortById, sortByTitle, sortByBody, setMatchedPosts } =
  tableSlice.actions;

export default tableSlice.reducer;

function isError(action: AnyAction): boolean {
  return action.type.endsWith('rejected');
}
