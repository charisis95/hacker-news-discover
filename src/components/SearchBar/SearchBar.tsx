import type { SearchBarProps } from './SearchBar.types';
import './SearchBar.css';

export function SearchBar({ query, isLoading, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="search-bar-label">Search stories</span>
      <span className="search-bar-field">
        <svg className="search-bar-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
        <input
          className="search-bar-input"
          type="search"
          value={query}
          onChange={onChange}
          placeholder="Try “React”, “TypeScript” or “AI”"
          autoComplete="off"
        />
        {isLoading && <span className="search-bar-spinner" aria-label="Searching" />}
      </span>
    </label>
  );
}
