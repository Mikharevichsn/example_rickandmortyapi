import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from './utils_setupStore';
import { theme } from '@/theme';

export function renderWithProviders(ui: ReactNode, { route = '/' } = {}) {
  const store = setupStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MemoryRouter initialEntries={[route]}>
            {ui}
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    ),
  };
}
