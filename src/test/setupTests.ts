import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './msw/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
