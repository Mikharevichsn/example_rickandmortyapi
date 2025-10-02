import { useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Container, Grid, Pagination, Stack, TextField, Typography } from '@mui/material';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';
import CharacterCard from './CharacterCard';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function CharactersList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchDebounced, setSearchDebounced] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const { data, isFetching, isError, error } = useGetCharactersQuery({ page, name: searchDebounced || undefined });

  const totalPages = useMemo(() => data?.info.pages ?? 1, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchDebounced(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);


  const currentFavorites = useSelector((state: RootState) => state.favorites?.values ?? []);
  const currentCharacters = useMemo(() => showOnlyFavorites ? currentFavorites : data?.results, [data, showOnlyFavorites, currentFavorites]);

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} mb={3}>
        <Typography variant="h4" flex={1}>Characters</Typography>

        <Button onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>Show only favorites</Button>
        <TextField
          label="Search by name"
          value={search}
          size="small"
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
        />
      </Stack>

      {isError && (
        <Typography color="error">{String((error as any)?.data?.error || 'Failed to load.')}</Typography>
      )}

      {isFetching && <CircularProgress size={24} test-id="loading-spinner" />}

      <Grid container spacing={2}>
        {currentCharacters?.map((c) => (
          <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} component="div">
            <CharacterCard c={c} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, p) => {
            setPage(p);
          }}
          color="primary"
          disabled={isFetching}
        />
      </Box>
    </Container>
  );
}
