import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter
          // for github pages deploy
          basename={window.location.hostname === 'mikharevichsn.github.io' ? "/example_rickandmortyapi" : "/"}
        >
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
