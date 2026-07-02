import type { Timestamp } from 'firebase/firestore';

export interface Container {
  id: string;
  table: number;
  side: 'left' | 'right';
  depth: 'front' | 'back' | null;
  position: 'top' | 'middle' | 'bottom';
  label: string;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  tags: string[];
  containerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SearchResult {
  item: Item;
  containerLabel: string;
  containerId: string;
}
