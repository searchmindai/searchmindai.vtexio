import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { Icon } from "vtex.store-icons";
import "./styles/styles.css";

const CSS_HANDLES = [
  "searchBarContainer",
  "searchBarBox",
  "searchBarInput",
  "searchBarButton",
  "searchBarResultContainer",
  "searchBarResultList",
  "searchBarResultListItems",
] as const;

function SearchResult() {
  const { handles } = useCssHandles(CSS_HANDLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section ref={containerRef} className={classNames(handles.searchBarContainer, "relative w-100")}>
      <div
        className={classNames(handles.searchBarBox, "flex items-center b bg-white br2 ba b--muted-4 overflow-hidden")}
      >
        <input
          type="search"
          className={classNames(handles.searchBarInput, "input-reset bn pa2 db w-100 t-small")}
          id="sm-search-bar"
          name="sm-search-bar"
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={classNames(handles.searchBarButton, "bg-transparent bn flex items-center justify-center pa0")}
        >
          <Icon id="hpa-search" size={16} />
        </button>
      </div>
      {searchTerm.length >= 3 && isFocused && (
        <div className={classNames(handles.searchBarResultContainer, "absolute z-1 bg-white w-100 br2 ba b--muted-4")}>
          <ul className={classNames(handles.searchBarResultList, "list pl0 mt0")}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
              <li key={idx} className={classNames(handles.searchBarResultListItems, "t-small pa4 hover-bg-muted-5")}>
                Search Result {idx + 1} for "{searchTerm}"
              </li>
            ))}
            <li className={classNames(handles.searchBarResultListItems, "t-small pa4 hover-bg-muted-5")}>
              <a href={`/${encodeURIComponent(searchTerm)}?map=ft`} className="link no-underline c-muted-2">
                Ver todos os resultados
              </a>
            </li>
          </ul>
          <div className={classNames("t-mini pa4 bt b--muted-4 bg-white-70 flex items-center justify-center")}>
            <a
              href="https://searchmindai.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classNames("link t-mini c-emphasis")}
            >
              Powered by SearchMindAI
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchResult;
