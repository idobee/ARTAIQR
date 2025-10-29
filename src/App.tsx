import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

import HomePage from '../pages/HomePage';
import ArtworksPage from '../pages/ArtworksPage';
import ArtworkDetailPage from '../pages/ArtworkDetailPage';
import ArtistsPage from '../pages/artistsPage';
import ArtistDetailPage from '../pages/ArtistDetailPage';
import ExhibitionsPage from '../pages/exhibitionsPAge';
import ExhibitionDetailPage from '../pages/ExhibitionDetailPage';
import EducationPage from '../pages/EducationPage';
import ArtNewsPage from '../pages/ArtNewsPage';
import AICuratorToolPage from '../pages/AICuratorToolPage';



const App: React.FC = () => (
  <>
    <Header />
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibitions" element={<ExhibitionsPage />} />
        <Route path="/exhibitions/:id" element={<ExhibitionDetailPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistDetailPage />} />
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/artworks/:id" element={<ArtworkDetailPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/art-news" element={<ArtNewsPage />} />
        <Route path="/ai-curator" element={<AICuratorToolPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>
);

export default App;