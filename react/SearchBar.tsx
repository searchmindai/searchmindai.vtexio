import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { Icon } from "vtex.store-icons";
import "./styles/styles.css";

const CSS_HANDLES = ["searchBarContainer", "searchBarInput"] as const;

function SearchBar() {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <section className={classNames(handles.searchBarContainer, "flex items-center")}>
      <div className={classNames("flex items-center b bg-white br2 ba")}>
        <input
          type="search"
          className={classNames(handles.searchBarInput, "bn br2")}
          id="sm-search-bar"
          name="sm-search-bar"
        />
        <Icon id="hpa-search" />
      </div>
    </section>
  );
}

export default SearchBar;
