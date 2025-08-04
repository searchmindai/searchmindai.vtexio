import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { Icon } from "vtex.store-icons";
import { useSearchProducts } from "./hooks/useSearchProducts";
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
	const { results, isLoading, total } = useSearchProducts({ searchTerm, debounceMs: 300 });

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
					onKeyDown={(e) => {
						if (e.key === "Enter" && searchTerm.length >= 3) {
							window.location.href = `/${encodeURIComponent(searchTerm)}`;
						}
					}}
				/>
				<button
					className={classNames(handles.searchBarButton, "bg-transparent bn flex items-center justify-center pa0")}
				>
					<Icon id="hpa-search" size={16} />
				</button>
			</div>
			{searchTerm.length >= 3 && isFocused && (
				<div
					className={classNames(handles.searchBarResultContainer, "absolute z-999 bg-white w-100 br2 ba b--muted-4")}
				>
					<ul className={classNames(handles.searchBarResultList, "list pl0 mt0")}>
						{isLoading &&
							Array.from({ length: 3 }).map((_, idx) => (
								<li
									key={`loading-${idx}`}
									className={classNames(handles.searchBarResultListItems, "t-small pa4 bg-muted-5 o-30")}
								>
									<div className="w-100 h1 br2 bg-muted-3" />
								</li>
							))}
						{results.map((item, idx) => (
							<li key={idx} className={classNames(handles.searchBarResultListItems, "t-small pa4 hover-bg-muted-5")}>
								<a href={item.link} className="link no-underline c-muted-2 flex items-center">
									<img src={item.image} alt="" width={40} height={40} className="mr3" />
									<span>{item.nome}</span>
								</a>
							</li>
						))}
						<li className={classNames(handles.searchBarResultListItems, "t-small pa4 hover-bg-muted-5")}>
							<a href={`/${encodeURIComponent(searchTerm)}`} className="link no-underline c-muted-2">
								{total > 0 ? `Ver todos los ${total} resultados para "${searchTerm}"` : "No se encontraron resultados"}
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
