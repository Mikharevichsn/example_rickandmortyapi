import { screen, waitFor } from '@testing-library/react';
import { it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import CharactersList from '@/components/characters/CharactersList';
import { renderWithProviders } from '@/test/utils';

it('loads list and paginates', async () => {
  renderWithProviders(<CharactersList />);

  // Wait for loading to complete - Loading should disappear
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.getByText('Characters')).toBeInTheDocument();
  expect(await screen.findByText(/Rick Sanchez|Filtered Rick/)).toBeInTheDocument();
  expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('filters by name when typing', async () => {
  renderWithProviders(<CharactersList />);

  // Wait for initial loading to complete
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  const input = screen.getByLabelText('Search by name');
  await userEvent.type(input, 'rick');

  // Wait for loading to complete after filtering
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText('Filtered Rick')).toBeInTheDocument();
  });
});
