import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Item } from '../types';

export function useItems(containerId: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'items'),
      where('containerId', '==', containerId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Item[];
      data.sort((a, b) => a.name.localeCompare(b.name));
      setItems(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [containerId]);

  const addItem = async (name: string, quantity: number, category: string, tags: string[]) => {
    await addDoc(collection(db, 'items'), {
      name,
      quantity,
      category,
      tags,
      containerId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await deleteDoc(doc(db, 'items', itemId));
    } else {
      await updateDoc(doc(db, 'items', itemId), {
        quantity: newQuantity,
        updatedAt: Timestamp.now(),
      });
    }
  };

  const removeItem = async (itemId: string) => {
    await deleteDoc(doc(db, 'items', itemId));
  };

  return { items, loading, addItem, updateQuantity, removeItem };
}
