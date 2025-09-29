declare global {
	type WhatsAppProps = {
		phone?: string;
		message?: string;
		position?: "left" | "right";
		isActive?: boolean;
	};

	interface Product {
		nome: string
		link?: string
		image?: string
	}

	interface UseSearchProductsOptions {
		searchTerm: string
		debounceMs?: number
		limit?: number
		offset?: number
		isFacets?: boolean
	}

}

export { };

