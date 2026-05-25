import "../Styles/SearchSuggestion.css";

export default function SearchSuggestion({
  suggestions,
  activeIndex,
  onSelect,
}) {
  if (suggestions.length === 0) return null;
  return (
    <aside className="suggestions-dropdown">
      <ul>
        {suggestions.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            className={i === activeIndex ? "active" : ""}
            onClick={() => onSelect(s)}
            tabIndex={0}
          >
            {s.display}
          </li>
        ))}
      </ul>
    </aside>
  );
}
