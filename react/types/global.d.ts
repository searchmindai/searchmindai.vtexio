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
	}

	interface UseSearchProductsOptions {
		searchTerm: string
		minChars?: number
		debounceMs?: number
	}

}

export { };

