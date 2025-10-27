import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { DataProvider } from './context/DataContext.tsx';

import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import PrivateRoute from './components/common/PrivateRoute.tsx';

const HomePage = lazy(() => import('./pages/HomePage'));
const ExhibitionsPage = lazy(() => import('./pages/ExhibitionsPage'));
const ExhibitionDetailPage = lazy(() => import('./pages/ExhibitionDetailPage'));
const ArtistsPage = lazy(() => import('./pages/ArtistsPage'));
const ArtistDetailPage = lazy(() => import('./pages/ArtistDetailPage'));
const ArtworksPage = lazy(() => import('./pages/ArtworksPage'));
const CurationPage = lazy(() => import('./pages/CurationPage'));
const CuratorDetailPage = lazy(() => import('./pages/CuratorDetailPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const AICuratorToolPage = lazy(() => import('./pages/AICuratorToolPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ArtNewsPage = lazy(() => import('./pages/ArtNewsPage'));
const AdminApplicationsPage = lazy(() => import('./pages/AdminApplicationsPage'));
const MyPage = lazy(() => import('./pages/MyPage'));

const AppContent: React.FC = () => {
  return (
    <div className="bg-brand-dark text-brand-light min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exhibitions" element={<ExhibitionsPage />} />
            <Route path="/exhibitions/:id" element={<ExhibitionDetailPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/artists/:id" element={<ArtistDetailPage />} />
            <Route path="/artworks" element={<ArtworksPage />} />
            <Route path="/curation" element={<CurationPage />} />
            <Route path="/curators/:id" element={<CuratorDetailPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/art-news" element={<ArtNewsPage />} />
            <Route path="/ai-curator" element={<PrivateRoute><AICuratorToolPage /></PrivateRoute>} />
            <Route path="/my-page" element={<PrivateRoute><MyPage /></PrivateRoute>} />
            <Route path="/admin/applications" element={<PrivateRoute><AdminApplicationsPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
