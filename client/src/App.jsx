import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './App.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Players = lazy(() => import('./pages/Players'));
const Matches = lazy(() => import('./pages/Matches'));
const Statistics = lazy(() => import('./pages/Statistics'));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#141a22',
            color: '#e8ebf1',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '0.88rem',
          },
          success: { iconTheme: { primary: '#2dd4a7', secondary: '#0c0f14' } },
          error: { iconTheme: { primary: '#ff5a5f', secondary: '#0c0f14' } },
        }}
      />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/players" element={<Players />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/stats" element={<Statistics />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
