import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { DataTypes } from './types';

// Создание асинхронного Thunk для получения данных из OpenSearch
export const fetchOpenSearchData = createAsyncThunk<DataTypes[]>(
  'openSearch/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response  = await axios.get<DataTypes[]>('/data'); // Запрос к серверу на получение данных
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      if (typeof error === 'object' && error !== null && 'message' in error) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  },
);