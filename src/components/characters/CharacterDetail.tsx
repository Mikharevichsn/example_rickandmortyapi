import { Container, Stack, Typography, Chip, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '@/services/rickAndMortyApi';

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCharacterByIdQuery(Number(id));

  if (isLoading) return <Container sx={{ py: 4 }}><Typography>Loading...</Typography></Container>;
  if (isError || !data) return <Container sx={{ py: 4 }}><Typography color="error">Not found</Typography></Container>;

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Card>
        <CardMedia component="img" image={data.image} alt={data.name} sx={{ maxHeight: 420, objectFit: 'contain' }} />
        <CardContent>
          <Typography variant="h4" gutterBottom>{data.name}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            <Chip label={`Status: ${data.status}`} />
            <Chip label={`Species: ${data.species}`} />
            {data.type && <Chip label={`Type: ${data.type}`} />}
            <Chip label={`Gender: ${data.gender}`} />
          </Stack>
          <Typography variant="body1" gutterBottom>Origin: {data.origin?.name}</Typography>
          <Typography variant="body1" gutterBottom>Location: {data.location?.name}</Typography>
          <Typography variant="body2" color="text.secondary">Episodes: {data.episode.length}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
