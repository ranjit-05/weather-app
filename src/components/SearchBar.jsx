import "./SearchBar.css";

// Props: query, onChange, onSearch
function SearchBar({ query, onChange, onSearch }) {
  function handleKey(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="text"
        placeholder="Search city…"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <button className="search-btn" onClick={onSearch}>
        →
      </button>
    </div>
  );
}

export default SearchBar;
