import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { Icon } from "vtex.store-icons";
import "./styles/styles.css";

const CSS_HANDLES = ["searchBarContainer", "searchBarInput"] as const;

function SearchBar() {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <section className={classNames(handles.searchBarContainer, "relative w-100")}>
      <div className={classNames("flex items-center b bg-white br2 ba")}>
        <input
          type="search"
          className={classNames(handles.searchBarInput, "bn br2")}
          id="sm-search-bar"
          name="sm-search-bar"
        />
        <Icon id="hpa-search" />
      </div>
      <div className={classNames("absolute z-1")}>
        <ul>
          <li className="pa3">Search Result 1</li>
          <li className="pa3">Search Result 2</li>
          <li className="pa3">Search Result 3</li>
          <li className="pa3">Search Result 4</li>
        </ul>
      </div>
    </section>
  );
}

export default SearchBar;
