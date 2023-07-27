import { createSlice } from '@reduxjs/toolkit';
import { OpenSearchState } from './types';
import { fetchOpenSearchData } from './asyncAction';

const initialState: OpenSearchState = {
  data: [],
  loading: false,
  error: null,
};

const openSearchSlice = createSlice({
  name: 'openSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenSearchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpenSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOpenSearchData.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = null;
        }
      });
  },
});

export default openSearchSlice.reducer;
