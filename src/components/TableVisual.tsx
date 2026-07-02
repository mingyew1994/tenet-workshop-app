import { DrawerCell } from './DrawerCell';
import { containers } from '../data/containers';

interface TableVisualProps {
  tableNumber: number;
  itemCounts: Record<string, number>;
}

export function TableVisual({ tableNumber, itemCounts }: TableVisualProps) {
  const tableContainers = containers.filter(c => c.table === tableNumber);

  if (tableNumber === 1) {
    const left = tableContainers.filter(c => c.side === 'left');
    const right = tableContainers.filter(c => c.side === 'right');
    const posOrder = ['top', 'middle', 'bottom'];

    return (
      <div className="table-card">
        <div className="table-header">
          <div className="table-name">
            🗄️ Table 1
            <span className="table-badge">6 Drawers</span>
          </div>
          <span className="table-layout-label">Left / Right</span>
        </div>

        <div className="drawer-grid-t1">
          <div className="drawer-column">
            <div className="column-label">◀ Left</div>
            {posOrder.map(pos => {
              const c = left.find(x => x.position === pos)!;
              return (
                <DrawerCell
                  key={c.id}
                  containerId={c.id}
                  position={c.position}
                  itemCount={itemCounts[c.id] || 0}
                />
              );
            })}
          </div>
          <div className="drawer-column">
            <div className="column-label">Right ▶</div>
            {posOrder.map(pos => {
              const c = right.find(x => x.position === pos)!;
              return (
                <DrawerCell
                  key={c.id}
                  containerId={c.id}
                  position={c.position}
                  itemCount={itemCounts[c.id] || 0}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Table 2: left/right × front/back × top/middle/bottom
  const posOrder = ['top', 'middle', 'bottom'];

  const renderSide = (side: 'left' | 'right') => {
    const sideContainers = tableContainers.filter(c => c.side === side);
    const front = sideContainers.filter(c => c.depth === 'front');
    const back = sideContainers.filter(c => c.depth === 'back');

    return (
      <div className="table2-side">
        <div className="side-label">{side === 'left' ? '◀ Left' : 'Right ▶'}</div>
        <div className="depth-column">
          <div className="depth-label">Front</div>
          {posOrder.map(pos => {
            const c = front.find(x => x.position === pos)!;
            return (
              <DrawerCell
                key={c.id}
                containerId={c.id}
                position={c.position}
                itemCount={itemCounts[c.id] || 0}
              />
            );
          })}
        </div>
        <div className="depth-column">
          <div className="depth-label">Back</div>
          {posOrder.map(pos => {
            const c = back.find(x => x.position === pos)!;
            return (
              <DrawerCell
                key={c.id}
                containerId={c.id}
                position={c.position}
                itemCount={itemCounts[c.id] || 0}
                isBack
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div className="table-name">
          🗃️ Table 2
          <span className="table-badge">12 Drawers</span>
        </div>
        <span className="table-layout-label">Left / Right × Front / Back</span>
      </div>

      <div className="drawer-grid-t2">
        {renderSide('left')}
        {renderSide('right')}
      </div>
    </div>
  );
}
