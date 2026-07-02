import { useNavigate } from 'react-router';

interface DrawerCellProps {
  containerId: string;
  position: string;
  itemCount: number;
  isBack?: boolean;
}

export function DrawerCell({ containerId, position, itemCount, isBack }: DrawerCellProps) {
  const navigate = useNavigate();

  const positionLabels: Record<string, string> = {
    top: 'Top',
    middle: 'Mid',
    bottom: 'Bot',
  };

  return (
    <div
      className={`drawer-cell ${isBack ? 'back-row' : ''}`}
      onClick={() => navigate(`/container/${containerId}`)}
      title={containerId}
    >
      <span className="drawer-position">{positionLabels[position] || position}</span>
      <span className={`drawer-count ${itemCount === 0 ? 'empty' : ''}`}>
        {itemCount > 0 ? itemCount : '—'}
      </span>
      {itemCount > 0 && <span className="drawer-items-label">items</span>}
    </div>
  );
}
