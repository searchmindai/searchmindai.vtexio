import { useEffect, useState } from "react";

export function useSearchProducts({
	searchTerm,
	debounceMs = 300,
	limit = 3,
	offset = 0,
	isFacets = false,
}: UseSearchProductsOptions) {
	const [results, setResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [total, setTotal] = useState(0);
	const [facets, setFacets] = useState<any[]>([]);

	useEffect(() => {
		const handler = setTimeout(async () => {
			setIsLoading(true);
			try {
				const res = await fetch("/_v/search", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: searchTerm,
						limit,
						offset,
						facets: isFacets,
					}),
				});

				const data = await res.json();

				const produtos = data.results.map((item: any) => ({
					nome: item.data.productName,
					link: item.data._vtex_original?.link?.replace(/^https?:\/\/[^/]+/, ""),
					image: item.data._vtex_original?.items[0]?.images[0]?.imageUrl || "https://dummyimage.com/100x100/000/fff",
				}));

				const rawFacets = data.facets || {};
				const filteredFacets = Object.entries(rawFacets).reduce((acc, [key, facet]: [string, any]) => {
					if (facet.values !== null) {
						acc[key] = facet;
					}
					return acc;
				}, {} as Record<string, any>);

				setResults(produtos || []);
				setTotal(data.total || 0);
				setFacets(Object.values(filteredFacets));
			} catch (err) {
				console.error("Search error:", err);
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		}, debounceMs);

		return () => clearTimeout(handler);
	}, [searchTerm, debounceMs]);

	return { results, isLoading, total, facets };
}
