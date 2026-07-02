import type { Item } from '../types';

interface ItemRowProps {
  item: Item;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onDelete: (itemId: string) => void;
}

export function ItemRow({ item, onUpdateQuantity, onDelete }: ItemRowProps) {
  return (
    <div className="item-row">
      <div className="item-info">
        <div className="item-name">{item.name}</div>
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
