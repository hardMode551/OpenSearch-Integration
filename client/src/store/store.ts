import { configureStore } from '@reduxjs/toolkit'
import openSearch from './slices/OpenSearchSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    openSearch,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

