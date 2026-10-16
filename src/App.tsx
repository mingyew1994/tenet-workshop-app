import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import { ItemsProvider } from './context/ItemsContext';
import { Dashboard } from './pages/Dashboard';
import './index.css';

const ContainerPage = lazy(() =>
  import('./pages/ContainerPage').then(m => ({ default: m.ContainerPage }))
);
const QRAllPage = lazy(() =>
  import('./pages/QRAllPage').then(m => ({ default: m.QRAllPage }))
);

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isQR = location.pathname === '/qr-codes';

  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">🔧</div>
          <div className="logo-text">TENET<span>.</span>workshop</div>
        </Link>
        <nav className="header-nav">
          <Link to="/" className={`nav-btn ${isHome ? 'active' : ''}`}>🏠 Dashboard</Link>
          <Link to="/qr-codes" className={`nav-btn ${isQR ? 'active' : ''}`}>📱 QR Codes</Link>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ItemsProvider>
        <div className="app-layout">
          <Header />
          <main className="main-content">
            <Suspense fallback={<div className="loading-container"><div className="spinner" /></div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/container/:containerId" element={<ContainerPage />} />
                <Route path="/qr-codes" element={<QRAllPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ItemsProvider>
    </BrowserRouter>
  );
}

export default App;