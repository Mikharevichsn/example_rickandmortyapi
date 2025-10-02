import { Card, CardActionArea, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Character } from '../../types';

const chipStyle = {
  marginLeft: 0,
  marginRight: '8px',
  marginBottom: '8px',
};

export default function CharacterCard({ c }: { c: Character }) {
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(`/character/${c.id}`)}>
        <CardMedia component="img" height={240} image={c.image} alt={c.name} />
        <CardContent>
          <Typography variant="h6" gutterBottom noWrap>{c.name}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={c.status} size="small" style={{
              ...chipStyle,
              backgroundColor: c.status === 'Alive' ? 'lightgreen' : c.status === 'Dead' ? 'gray' : 'rgba(0, 0, 0, 0.08)'
            }} />
            <Chip label={c.species} size="small" style={chipStyle} />
            {c.type && <Chip label={c.type} size="small" style={chipStyle} />}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
