import { createContext, useContext, useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import type { Item } from '../types';

interface ItemsContextValue {
  allItems: Item[];
  loading: boolean;
  itemCounts: Record<string, number>;
  getContainerItems: (containerId: string) => Item[];
  addItem: (containerId: string, name: string, quantity: number, category: string, tags: string[]) => Promise<void>;
  updateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
}

const ItemsContext = createContext<ItemsContextValue | null>(null);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeDB: () => void;

    // Wait for Firebase Auth to confirm the user is logged in
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeDB = onSnapshot(
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
            console.error('Firestore listener error:', err);
            setLoading(false);
          }
        );
      } else {
        // If not logged in, clear data
        setAllItems([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDB) unsubscribeDB();
    };
  }, []);

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of allItems) {
      counts[item.containerId] = (counts[item.containerId] || 0) + item.quantity;
    }
    return counts;
  }, [allItems]);

  const itemsByContainer = useMemo(() => {
    const grouped: Record<string, Item[]> = {};
    for (const item of allItems) {
      if (!grouped[item.containerId]) {
        grouped[item.containerId] = [];
      }
      grouped[item.containerId].push(item);
    }
    for (const key of Object.keys(grouped)) {
      grouped[key].sort((a, b) => a.name.localeCompare(b.name));
    }
    return grouped;
  }, [allItems]);

  const getContainerItems = useCallback(
    (containerId: string): Item[] => itemsByContainer[containerId] || [],
    [itemsByContainer]
  );

  const addItem = useCallback(
    async (containerId: string, name: string, quantity: number, category: string, tags: string[]) => {
      await addDoc(collection(db, 'items'), {
        name,
        quantity,
        category,
        tags,
        containerId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    },
    []
  );

  const updateQuantity = useCallback(async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await deleteDoc(doc(db, 'items', itemId));
    } else {
      await updateDoc(doc(db, 'items', itemId), {
        quantity: newQuantity,
        updatedAt: Timestamp.now(),
      });
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    await deleteDoc(doc(db, 'items', itemId));
  }, []);

  const value = useMemo<ItemsContextValue>(
    () => ({ allItems, loading, itemCounts, getContainerItems, addItem, updateQuantity, removeItem }),
    [allItems, loading, itemCounts, getContainerItems, addItem, updateQuantity, removeItem]
  );

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItemsContext(): ItemsContextValue {
  const ctx = useContext(ItemsContext);
  if (!ctx) throw new Error('useItemsContext must be used within <ItemsProvider>');
  return ctx;
}