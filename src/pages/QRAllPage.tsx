import QRCode from 'react-qr-code';
import { Link } from 'react-router';
import { containers } from '../data/containers';

export function QRAllPage() {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;

  return (
    <div>
      <div className="container-header">
        <div className="container-header-info">
          <Link to="/" className="back-link">← Back to Dashboard</Link>
          <h1 className="container-title">All QR Codes</h1>
          <span className="container-id">Print this page to label all your drawers</span>
        </div>
        <div className="container-actions">
          <button className="qr-btn" onClick={() => window.print()}>
            🖨️ Print All
          </button>
        </div>
      </div>

      <div className="qr-all-grid">
        {containers.map(c => (
          <div key={c.id} className="qr-all-card">
            <div className="qr-wrapper" style={{ padding: 16 }}>
              <QRCode
                value={`${baseUrl}/container/${c.id}`}
                size={140}
                level="M"
                bgColor="#ffffff"
                fgColor="#0a0c10"
              />
            </div>
            <div className="qr-all-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
