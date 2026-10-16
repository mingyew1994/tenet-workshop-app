import { useState } from 'react';
import type { Item } from '../types';

interface ItemRowProps {
  item: Item;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onUpdateName: (itemId: string, newName: string) => Promise<void>;
  onDelete: (itemId: string) => void;
}

export function ItemRow({ item, onUpdateQuantity, onUpdateName, onDelete }: ItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!editName.trim() || editName === item.name) {
      setIsEditing(false);
      setEditName(item.name);
      return;
    }
    setIsSaving(true);
    await onUpdateName(item.id, editName.trim());
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(item.name);
    }
  };

  return (
    <div className="item-row">
      <div className="item-info">
        {isEditing ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
            <input
              type="text"
              className="form-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              disabled={isSaving}
              style={{ padding: '4px 8px', fontSize: '14px', flex: 1 }}
            />
            <button className="nav-btn" onClick={handleSave} disabled={isSaving}>
              {isSaving ? '...' : 'Save'}
            </button>
            <button className="nav-btn" onClick={() => setIsEditing(false)} disabled={isSaving}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="item-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.name}
            <button
              onClick={() => setIsEditing(true)}
              title="Swap / Replace Item"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: 0.5 }}
            >
              🔄
            </button>
          </div>
        )}
        <div className="item-meta">
          <span className="item-category">{item.category}</span>
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="item-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="item-quantity">
        <button
          className="qty-btn minus"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          title="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn plus"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          title="Increase quantity"
        >
          +
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            if (confirm(`Remove "${item.name}" from this drawer?`)) {
              onDelete(item.id);
            }
          }}
          title="Delete item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}