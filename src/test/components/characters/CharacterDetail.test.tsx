import { screen } from '@testing-library/react';
import App from '@/App';
import { it, expect } from 'vitest';
import { renderWithProviders } from '@/test/utils';

it('shows character details from API', async () => {
  renderWithProviders(<App />, { route: '/character/7' });
  expect(await screen.findByText('Character 7')).toBeInTheDocument();
  expect(screen.getByText(/Status:/)).toBeInTheDocument();
});
