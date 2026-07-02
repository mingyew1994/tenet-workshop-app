import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { SearchResult } from '../types';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  results: SearchResult[];
}

export function SearchBar({ searchQuery, setSearchQuery, results }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const showResults = isFocused && searchQuery.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (containerId: string) => {
    setIsFocused(false);
    setSearchQuery('');
    navigate(`/container/${containerId}`);
  };

  return (
    <div className="search-container" ref={containerRef}>
      <input
        type="text"
        className="search-bar"
        placeholder="Search items by name, category, or tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <span className="search-icon">🔍</span>

      {showResults && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((r) => (
              <div
                key={r.item.id}
                className="search-result-item"
                onClick={() => handleResultClick(r.containerId)}
              >
                <div className="search-result-info">
                  <span className="search-result-name">{r.item.name}</span>
                  <span className="search-result-location">📦 {r.containerLabel}</span>
                </div>
                <span className="search-result-qty">×{r.item.quantity}</span>
              </div>
            ))
          ) : (
            <div className="search-empty">
              No items found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
