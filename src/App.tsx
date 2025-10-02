import { Route, Routes, Navigate } from 'react-router-dom';
import CharactersList from './components/characters/CharactersList';
import CharacterDetail from './components/characters/CharacterDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/characters" replace />} />
      <Route path="/characters" element={<CharactersList />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="*" element={<Navigate to="/characters" replace />} />
    </Routes>
  );
}
