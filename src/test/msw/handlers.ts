import { http, HttpResponse } from 'msw';

const base = 'https://rickandmortyapi.com/api';

export const handlers = [
  http.get(`${base}/character`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') ?? '';

    return HttpResponse.json({
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1, name: name ? 'Filtered Rick' : 'Rick Sanchez',
          status: 'Alive', species: 'Human', type: '', gender: 'Male',
          origin: { name: 'Earth', url: '' }, location: { name: 'Citadel', url: '' },
          image: 'https://via.placeholder.com/300',
          episode: [], url: '', created: 'now'
        },
        {
          id: 2, name: 'Morty Smith',
          status: 'Alive', species: 'Human', type: '', gender: 'Male',
          origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' },
          image: 'https://via.placeholder.com/300',
          episode: [], url: '', created: 'now'
        },
      ],
    });
  }),

  http.get(`${base}/character/:id`, ({ params }) => {
    const { id } = params as { id: string };
    return HttpResponse.json({
      id: Number(id), name: `Character ${id}`, status: 'Alive',
      species: 'Human', type: '', gender: 'Male',
      origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' },
      image: 'https://via.placeholder.com/300',
      episode: [], url: '', created: 'now'
    });
  }),
];
