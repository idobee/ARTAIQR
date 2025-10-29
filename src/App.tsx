import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

import HomePage from '../pages/HomePage';
import ExhibitionsPage from '../pages/exhibitionsPAge';
import ArtworksPage from '../pages/artworksPage';
import ArtistsPage from '../pages/artistsPage';
import CurationPage from '../pages/CurationPage';
import EducationPage from '../pages/educationPage';
import AICuratorToolPage from '../pages/AICuratorToolPage';

const App: React.FC = () => (
  <>
    <Header />
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibitions" element={<ExhibitionsPage />} />
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/curation" element={<CurationPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/ai-curator" element={<AICuratorToolPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>
);

export default App;