import { useState, useMemo } from 'react';
import { useItemsContext } from '../context/ItemsContext';
import { getContainer } from '../data/containers';
import type { Item } from '../types';

export interface SearchResult {
  item: Item;
  containerLabel: string;
  containerId: string;
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { allItems, loading, itemCounts } = useItemsContext();

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matched: SearchResult[] = [];

    for (const item of allItems) {
      if (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query))
      ) {
        const container = getContainer(item.containerId);
        matched.push({
          item,
          containerLabel: container ? container.label : 'Unknown Container',
          containerId: item.containerId,
        });
      }
    }
    matched.sort((a, b) => a.item.name.localeCompare(b.item.name));
    return matched;
  }, [searchQuery, allItems]);

  return { searchQuery, setSearchQuery, results, itemCounts, loading };
}