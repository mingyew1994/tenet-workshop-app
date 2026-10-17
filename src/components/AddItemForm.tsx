import { useState } from 'react';

const CATEGORIES = [
  'Filament',
  'Electronics',
  'Material Stock',
  'Equipment',
];

interface AddItemFormProps {
  onAdd: (name: string, quantity: number, category: string, tags: string[]) => Promise<void>;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsStr, setTagsStr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const tags = tagsStr
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      
      await onAdd(name.trim(), quantity, category, tags);
      
      setName('');
      setQuantity(1);
      setCategory(CATEGORIES[0]);
      setTagsStr('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="plus-icon">+</span> ADD NEW ITEM
      </div>
      
      <div className="form-group">
        <label>Item Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g., STM32 Nucleo Board"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Quantity</label>
          <input
            type="number"
            className="form-input"
            min="1"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value) || 1)}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="form-group half">
          <label>Category</label>
          <select
            className="form-input"
            value={category}
            onChange={e => setCategory(e.target.value)}
            disabled={isSubmitting}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          className="form-input"
          value={tagsStr}
          onChange={e => setTagsStr(e.target.value)}
          placeholder="e.g., STM32, ARM, dev-board"
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting || !name.trim()}>
        {isSubmitting ? 'Adding...' : 'Add Item to Drawer'}
      </button>
    </form>
  );
}