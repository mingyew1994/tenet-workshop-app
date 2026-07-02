import QRCode from 'react-qr-code';

interface QRCodeModalProps {
  containerId: string;
  containerLabel: string;
  onClose: () => void;
}

export function QRCodeModal({ containerId, containerLabel, onClose }: QRCodeModalProps) {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const url = `${baseUrl}/container/${containerId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <div className="modal-header">
          <h3 className="modal-title">QR Code</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="qr-container">
          <div className="qr-wrapper">
            <QRCode
              value={url}
              size={200}
              level="M"
              bgColor="#ffffff"
              fgColor="#0a0c10"
            />
          </div>
          <div className="qr-label">{containerLabel}</div>
          <div className="qr-label" style={{ fontSize: '10px', opacity: 0.7 }}>
            {url}
          </div>
          <button className="print-btn" onClick={handlePrint}>
            🖨️ Print QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
