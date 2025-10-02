import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, CharactersResponse } from '../types';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, { page: number; name?: string } >({
      query: ({ page, name }) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        if (name) params.set('name', name);
        return `character?${params.toString()}`;
      },
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = rickAndMortyApi;
