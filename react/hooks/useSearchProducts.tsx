import { useEffect, useState } from "react";

export function useSearchProducts({ searchTerm, minChars = 3, debounceMs = 300 }: UseSearchProductsOptions) {
	const [results, setResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (searchTerm.length < minChars) {
			setResults([]);
			return;
		}

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
						limit: 3,
						offset: 0,
						returnFields: ["productName"],
					}),
				});

				const data = await res.json();

				const produtos = data.results.map((item: any) => ({
					nome: item.data.productName,
					link: item.data._vtex_original?.link?.replace(/^https?:\/\/[^/]+/, ""),
				}));

				setResults(produtos || []);
			} catch (err) {
				console.error("Search error:", err);
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		}, debounceMs);

		return () => clearTimeout(handler);
	}, [searchTerm, minChars, debounceMs]);

	return { results, isLoading };
}
