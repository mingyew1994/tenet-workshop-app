import { SearchBar } from '../components/SearchBar';
import { TableVisual } from '../components/TableVisual';
import { useSearch } from '../hooks/useSearch';

export function Dashboard() {
  const { searchQuery, setSearchQuery, results, itemCounts, loading } = useSearch();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={results}
      />

      <div className="section-title">Workshop Layout</div>

      <div className="tables-grid">
        <TableVisual tableNumber={1} itemCounts={itemCounts} />
        <TableVisual tableNumber={2} itemCounts={itemCounts} />
      </div>
    </div>
  );
}
