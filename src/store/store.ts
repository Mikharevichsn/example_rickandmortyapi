import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyApi } from '@/services/rickAndMortyApi';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
