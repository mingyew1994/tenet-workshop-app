import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useItems } from '../hooks/useItems';
import { getContainer } from '../data/containers';
import { ItemRow } from '../components/ItemRow';
import { AddItemForm } from '../components/AddItemForm';
import { QRCodeModal } from '../components/QRCodeModal';

export function ContainerPage() {
  const { containerId } = useParams<{ containerId: string }>();
  const container = getContainer(containerId || '');
  const { items, loading, addItem, updateQuantity, removeItem } = useItems(containerId || '');
  const [showQR, setShowQR] = useState(false);

  if (!container) {
    return (
      <div className="container-page">
        <div className="empty-state">
          <div className="empty-icon">❓</div>
          <div className="empty-text">Container not found</div>
          <div className="empty-subtext">
            <Link to="/" className="back-link">← Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="container-page">
      <div className="container-header">
        <div className="container-header-info">
          <Link to="/" className="back-link">← Back to Dashboard</Link>
          <h1 className="container-title">{container.label}</h1>
          <span className="container-id">{container.id}</span>
        </div>
        <div className="container-actions">
          <button className="qr-btn" onClick={() => setShowQR(true)}>
            📱 QR Code
          </button>
        </div>
      </div>

      <div className="items-section">
        <div className="items-section-header">
          <div className="section-title">Items in this Drawer</div>
          <span className="items-count">
            {items.length} item{items.length !== 1 ? 's' : ''} · {totalItems} total
          </span>
        </div>

        {items.length > 0 ? (
          <div className="item-list">
            {items.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onDelete={removeItem}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div className="empty-text">This drawer is empty</div>
            <div className="empty-subtext">Add items using the form below</div>
          </div>
        )}
      </div>

      <AddItemForm onAdd={addItem} />

      {showQR && (
        <QRCodeModal
          containerId={container.id}
          containerLabel={container.label}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
