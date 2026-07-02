import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { authReady, db } from '../firebase';
import type { Item, SearchResult } from '../types';
import { containers } from '../data/containers';

export function useSearch() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    authReady.then(() => {
      unsubscribe = onSnapshot(
        collection(db, 'items'),
        (snapshot) => {
          const data = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
          })) as Item[];
          setAllItems(data);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false); // don't leave the spinner hanging on error
        }
      );
    });
    return () => unsubscribe();
  }, []);

  const results = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allItems
      .filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      )
      .map(item => {
        const container = containers.find(c => c.id === item.containerId);
        return {
          item,
          containerLabel: container?.label || item.containerId,
          containerId: item.containerId,
        };
      })
      .sort((a, b) => a.item.name.localeCompare(b.item.name));
  }, [allItems, searchQuery]);

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of allItems) {
      counts[item.containerId] = (counts[item.containerId] || 0) + item.quantity;
    }
    return counts;
  }, [allItems]);

  return { searchQuery, setSearchQuery, results, itemCounts, loading };
}