import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyApi } from '@/services/rickAndMortyApi';

export function setupStore() {
  return configureStore({
    reducer: {
      [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    },
    middleware: (gDM) => gDM().concat(rickAndMortyApi.middleware),
  });
}
