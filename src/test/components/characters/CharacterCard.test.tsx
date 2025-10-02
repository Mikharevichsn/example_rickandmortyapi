import { screen, fireEvent } from '@testing-library/react';
import { it, expect } from 'vitest';
import CharacterCard from '@/components/characters/CharacterCard';
import type { Character } from '@/types';
import { renderWithProviders } from '@/test/utils';

const character: Character = {
  id: 42,
  name: 'Test Person',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://via.placeholder.com/300',
  episode: [],
  url: '',
  created: 'now',
};

it('renders name and chips, navigates on click', () => {
  const { container } = renderWithProviders(<CharacterCard c={character} />);
  expect(screen.getByText('Test Person')).toBeInTheDocument();
  expect(container.querySelector('img')).toHaveAttribute('alt', 'Test Person');
  expect(screen.getByText('Alive')).toBeInTheDocument();
  expect(screen.getByText('Human')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Test Person'));
});
