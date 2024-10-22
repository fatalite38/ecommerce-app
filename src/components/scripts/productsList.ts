import { getAllProducts, getAllCategories, type Product } from '../api/productService';
import { getCartItems, setCartItems } from '../utils/storage';

const productsListEl = document.getElementById(
	"productsList"
) as HTMLDivElement;
const categorySelectEl = document.getElementById(
	"categorySelect"
) as HTMLSelectElement;
const sortSelectEl = document.getElementById("sortSelect") as HTMLSelectElement;


let allProducts: Product[] = await getAllProducts();
let renderedProducts = allProducts;

function renderProducts(list: Product[]) {
	let productsToShow = "<ul>"; // Iniciar a lista

	// biome-ignore lint/complexity/noForEach: <explanation>
	list.forEach((product: Product) => {
		productsToShow += `
			<li>
				<h2>${product.title}</h2>
				<img width="200" src="${product.image}" alt="${product.title}" />
				<p class="description">${product.description}</p>
				<span>R$ ${product.price}</span>
				<p>
				Avaliação: ${product.rating.rate} 
				(${product.rating.count} avaliações)
				</p>
				<button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
			</li>
			<hr />`;
	});

	productsToShow += "</ul>"; // Fechar a lista
	productsListEl.innerHTML = productsToShow;
}
renderProducts(allProducts);

async function renderCategoriesFilter() {
	const categoriesToRender = await getAllCategories();
	let renderedCategoriesOptions = `<option selected value="todas">todas</option>`;
	// biome-ignore lint/complexity/noForEach: <explanation>
	categoriesToRender.forEach((category: string) => {
		renderedCategoriesOptions += `<option value="${category}">${category}</option>`;
		categorySelectEl.innerHTML = renderedCategoriesOptions;
	});
}

renderCategoriesFilter();


categorySelectEl.addEventListener(
	"change",
	function filterProductsByCategory() {
		const selectedCategory = categorySelectEl.value;
		if (selectedCategory !== "todas") {
			const filteredCatecory = allProducts.filter((product: Product) => {
				return product.category === selectedCategory;
			});
			renderedProducts = filteredCatecory;
			sortProducts(sortSelectEl.value);
			renderProducts(filteredCatecory);
		} else {
			renderedProducts = allProducts;
			sortProducts(sortSelectEl.value);
			renderProducts(allProducts);
		}
	}
);

//* Sort products functions

sortSelectEl.addEventListener("change", () => {
	sortProducts(sortSelectEl.value);
});

function sortProducts(selectedSortOption: string) {
	let orderedProducts: Product[] = [];
	switch (selectedSortOption) {
		case "mais baratos":
			orderedProducts = sortProductsByPrice(renderedProducts);
			break;
		case "mais caros":
			orderedProducts = sortProductsByPriceReversed(renderedProducts);
			break;
		case "a-z":
			orderedProducts = sortProductsAlphabetically(renderedProducts);
			break;
		case "z-a":
			orderedProducts =
				sortProductsAlphabeticallyReversed(renderedProducts);
			break;
	}
	renderProducts(orderedProducts);
}

function sortProductsAlphabetically(productsList: Product[]) {
	const sortedProducts = productsList.sort((a: Product, b: Product) => {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	});
	return sortedProducts;
}

function sortProductsAlphabeticallyReversed(productsList: Product[]) {
	const sortedProducts = productsList.sort((a: Product, b: Product) => {
		if (a.title > b.title) {
			return -1;
		}
		if (a.title < b.title) {
			return 1;
		}
		return 0;
	});
	return sortedProducts;
}

function sortProductsByPrice(productsList: Product[]) {
	const sortedProducts = productsList.sort((a: Product, b: Product) => {
		if (a.price < b.price) {
			return -1;
		}
		if (a.price > b.price) {
			return 1;
		}
		return 0;
	});
	return sortedProducts;
}

function sortProductsByPriceReversed(productsList: Product[]) {
	const sortedProducts = productsList.sort((a: Product, b: Product) => {
		if (a.price > b.price) {
			return -1;
		}
		if (a.price < b.price) {
			return 1;
		}
		return 0;
	});
	return sortedProducts;
}

function addToCart(productId: number) {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        alert('Por favor, faça login para adicionar produtos ao carrinho.');
        return;
    }

    const product = allProducts.find(p => p.id === productId);
    if (product) {
        let cart = getCartItems(userId);
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        setCartItems(userId, cart);
        alert('Produto adicionado ao carrinho!');
    }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(window as any).addToCart = addToCart;