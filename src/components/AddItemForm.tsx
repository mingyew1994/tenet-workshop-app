import { useState } from 'react';

interface AddItemFormProps {
  onAdd: (name: string, quantity: number, category: string, tags: string[]) => Promise<void>;
}

const CATEGORIES = [
  'Microcontrollers',
  'Single Board Computers',
  '3D Printing',
  'Motion',
  'Fasteners',
  'Pneumatics',
  'Horology',
  'Voron Build',
  'Electrical',
  'Tools',
  'Other',
];

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
      await onAdd(name.trim(), quantity, category, tags);
      setName('');
      setQuantity(1);
      setTagsInput('');
    } catch (err) {
      console.error('Failed to add item:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form-card">
      <div className="add-form-title">＋ Add New Item</div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., STM32 Nucleo Board"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-input"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-input form-select"
              list="category-options"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Electronics"
              required
            />
            <datalist id="category-options">
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., STM32, ARM, dev-board"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!name.trim() || isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Item to Drawer'}
        </button>
      </form>
    </div>
  );
}
