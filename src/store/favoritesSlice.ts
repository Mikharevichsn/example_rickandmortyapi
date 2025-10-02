import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '@/types';

interface FavoritesState {
  values: Character[];
}

const initialState: FavoritesState = {
  values: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const isAlreadyFavorite = state.values.some(
        (fav) => fav.id === character.id
      );

      if (!isAlreadyFavorite) {
        state.values.push(character);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const characterId = action.payload;
      state.values = state.values.filter(
        (character) => character.id !== characterId
      );
    },

    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const existingIndex = state.values.findIndex(
        (fav) => fav.id === character.id
      );

      if (existingIndex >= 0) {
        // Удаляем из избранного
        state.values.splice(existingIndex, 1);
      } else {
        // Добавляем в избранное
        state.values.push(character);
      }
    },

    clearFavorites: (state) => {
      state.values = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

// Селекторы
export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.values;

export const selectIsFavorite = (characterId: number) => (state: { favorites: FavoritesState }) => {
  return state.favorites.values.some((character) => character.id === characterId);
}

export const selectFavoritesCount = (state: { favorites: FavoritesState }) =>
  state.favorites.values.length;

export const selectFavoriteById = (characterId: number) =>
  (state: { favorites: FavoritesState }) =>
    state.favorites.values.find((character) => character.id === characterId);

export default favoritesSlice.reducer;
