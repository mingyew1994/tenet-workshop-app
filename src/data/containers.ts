import type { Container } from '../types';

export const containers: Container[] = [
  // Table 1 — Left side
  { id: 'table1-left-top', table: 1, side: 'left', depth: null, position: 'top', label: 'Table 1 · Left · Top' },
  { id: 'table1-left-middle', table: 1, side: 'left', depth: null, position: 'middle', label: 'Table 1 · Left · Middle' },
  { id: 'table1-left-bottom', table: 1, side: 'left', depth: null, position: 'bottom', label: 'Table 1 · Left · Bottom' },
  // Table 1 — Right side
  { id: 'table1-right-top', table: 1, side: 'right', depth: null, position: 'top', label: 'Table 1 · Right · Top' },
  { id: 'table1-right-middle', table: 1, side: 'right', depth: null, position: 'middle', label: 'Table 1 · Right · Middle' },
  { id: 'table1-right-bottom', table: 1, side: 'right', depth: null, position: 'bottom', label: 'Table 1 · Right · Bottom' },
  // Table 2 — Left Front
  { id: 'table2-left-front-top', table: 2, side: 'left', depth: 'front', position: 'top', label: 'Table 2 · Left · Front · Top' },
  { id: 'table2-left-front-middle', table: 2, side: 'left', depth: 'front', position: 'middle', label: 'Table 2 · Left · Front · Middle' },
  { id: 'table2-left-front-bottom', table: 2, side: 'left', depth: 'front', position: 'bottom', label: 'Table 2 · Left · Front · Bottom' },
  // Table 2 — Left Back
  { id: 'table2-left-back-top', table: 2, side: 'left', depth: 'back', position: 'top', label: 'Table 2 · Left · Back · Top' },
  { id: 'table2-left-back-middle', table: 2, side: 'left', depth: 'back', position: 'middle', label: 'Table 2 · Left · Back · Middle' },
  { id: 'table2-left-back-bottom', table: 2, side: 'left', depth: 'back', position: 'bottom', label: 'Table 2 · Left · Back · Bottom' },
  // Table 2 — Right Front
  { id: 'table2-right-front-top', table: 2, side: 'right', depth: 'front', position: 'top', label: 'Table 2 · Right · Front · Top' },
  { id: 'table2-right-front-middle', table: 2, side: 'right', depth: 'front', position: 'middle', label: 'Table 2 · Right · Front · Middle' },
  { id: 'table2-right-front-bottom', table: 2, side: 'right', depth: 'front', position: 'bottom', label: 'Table 2 · Right · Front · Bottom' },
  // Table 2 — Right Back
  { id: 'table2-right-back-top', table: 2, side: 'right', depth: 'back', position: 'top', label: 'Table 2 · Right · Back · Top' },
  { id: 'table2-right-back-middle', table: 2, side: 'right', depth: 'back', position: 'middle', label: 'Table 2 · Right · Back · Middle' },
  { id: 'table2-right-back-bottom', table: 2, side: 'right', depth: 'back', position: 'bottom', label: 'Table 2 · Right · Back · Bottom' },
];

export const getContainer = (id: string): Container | undefined =>
  containers.find(c => c.id === id);

export const getTableContainers = (table: number): Container[] =>
  containers.filter(c => c.table === table);
