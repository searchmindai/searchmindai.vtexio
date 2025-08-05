import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";
import { useSearchProducts } from "./hooks/useSearchProducts";
import "./styles/styles.css";

const CSS_HANDLES = [
	"searchResultContainer",
	"searchResultListGrid",
	"searchResultListItem",
	"searchResultImg",
	"searchResultTitle",
] as const;

function SearchResult() {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { searchQuery } = useSearchPage();
	const offset = 0;
	const limit = 24;
	const { results, isLoading, total, facets } = useSearchProducts({
		searchTerm: searchQuery.variables.fullText,
		debounceMs: 300,
		limit,
		offset,
		isFacets: true,
	});

	return (
		<section className={classNames(handles.searchResultContainer, "relative w-100")}>
			<div className="flex flex-row">
				<aside className="dn db-ns w-20 ph3">
					{results.length === 0 && isLoading && <div className="loading-indicator">Loading...</div>}
					{facets.length > 0 && (
						<div className="facet-list">
							<ul className="list ma0 pa0">
								{facets.map((facet, index) => (
									<li key={index} className="ma0 pa0">
										<h3>{facet.name}</h3>
										<ul className="list pa0 ma0">
											{facet.values &&
												typeof facet.values === "object" &&
												Object.entries(facet.values)
													.slice(0, 8)
													.map(([key, value]: [string, any]) => (
														<li key={key} className="mb2 flex flex-column">
															<span>{value.name}</span>
														</li>
													))}
											{facet.values && Object.keys(facet.values).length > 8 && (
												<li className="mt2 pointer underline c-link">Ver más...</li>
											)}
										</ul>
									</li>
								))}
							</ul>
						</div>
					)}
				</aside>
				<div className="flex-auto">
					{total > 0 && (
						<div className="flex justify-between items-center mb4 ph3">
							<span className="c-muted-1">
								Mostrando 1 - {results.length} de {total} resultado{total !== 1 ? "s" : ""}
							</span>
							<span className="c-muted-2 f7">Powered by SearchMindAI</span>
						</div>
					)}
					{results.length === 0 && isLoading && <div className="loading-indicator">Loading...</div>}
					{results.length > 0 && (
						<>
							<ul className={classNames("pa0 ma0 bg-white", handles.searchResultListGrid)}>
								{results.map((product, index) => (
									<li key={index} className={classNames("flex list", handles.searchResultListItem)}>
										<a href={product.link} className="flex flex-column items-center justify-center no-underline">
											{product.image && (
												<img
													src={product.image}
													alt={product.nome}
													className={classNames("mb5", handles.searchResultImg)}
													width={100}
													height={100}
												/>
											)}
											<span className={classNames("c-muted-2 t-base mb5", handles.searchResultTitle)}>
												{product.nome}
											</span>
											<a href={product.link} className="link white bg-action-primary br2 pa3 w-100 tc no-underline">
												<span className="white">Agregar al carrito</span>
											</a>
										</a>
									</li>
								))}
							</ul>
							{total > limit &&
								(() => {
									const currentPage = Math.floor(offset / limit) + 1;
									const totalPages = Math.ceil(total / limit);
									const visiblePages = 5;
									const halfVisible = Math.floor(visiblePages / 2);
									const startPage = Math.max(1, Math.min(currentPage - halfVisible, totalPages - visiblePages + 1));
									const endPage = Math.min(totalPages, startPage + visiblePages - 1);

									return (
										<div className="flex justify-center items-center mt5">
											{currentPage > 1 && (
												<button
													className="bg-action-primary mh1 ph3 pa4 pointer white br2 bn"
													onClick={() => {
														window.scrollTo({ top: 0, behavior: "smooth" });
														window.location.href = `?page=${currentPage - 1}`;
													}}
												>
													‹
												</button>
											)}
											{Array.from({ length: endPage - startPage + 1 }, (_, i) => {
												const page = startPage + i;
												const pageOffset = (page - 1) * limit;
												return (
													<button
														key={page}
														className={classNames("mh1 ph3 pa4 pointer br2 bn", {
															"bg-action-primary white": offset === pageOffset,
															"bg-muted-5": offset !== pageOffset,
														})}
														onClick={() => {
															window.scrollTo({ top: 0, behavior: "smooth" });
															window.location.href = `?page=${page}`;
														}}
													>
														{page}
													</button>
												);
											})}
											{currentPage < totalPages && (
												<button
													className="bg-action-primary mh1 ph3 pa4 pointer white br2 bn"
													onClick={() => {
														window.scrollTo({ top: 0, behavior: "smooth" });
														window.location.href = `?page=${currentPage + 1}`;
													}}
												>
													›
												</button>
											)}
										</div>
									);
								})()}
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default SearchResult;
