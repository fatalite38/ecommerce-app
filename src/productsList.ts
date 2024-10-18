//* Capture DOM elements

const productsListEl = document.getElementById(
	"productsList"
) as HTMLDivElement;
const categorySelectEl = document.getElementById(
	"categorySelect"
) as HTMLSelectElement;
const sortSelectEl = document.getElementById("sortSelect") as HTMLSelectElement;

//* Product inteface

interface Product {
	category: string;
	description: string;
	id: number;
	image: string;
	price: number;
	rating: { rate: number; count: number };
	title: string;
}

//* Get all products function

async function getAllProducts() {
	const products = await fetch("https://fakestoreapi.com/products");
	return await products.json();
}

const allProducts = await getAllProducts();
let renderedProducts = allProducts;

//* Get products by ID function

async function getProductById(productId: number) {
	const products = await fetch(
		`https://fakestoreapi.com/products/${productId}`
	);
	return await products.json();
}

// const product = await getProductById(1);
// console.log(product);

//* Render products in a list function

function renderProducts(list: Product[]) {
	let productsToShow = "";
	list.forEach((product: Product) => {
		productsToShow += `
		<h2>${product.title}</h2>
			<img
				width="200"
				src="${product.image}"
			/>
			<p>${product.description}</p>
			<p>R$ ${product.price}</p>
			<hr />`;
	});
	productsListEl.innerHTML = productsToShow;
}

renderProducts(allProducts);

//* Get all categories function

async function getAllCategories() {
	const categories = await fetch(
		"https://fakestoreapi.com/products/categories"
	);
	return await categories.json();
}

// const allCategories = await getAllCategories();
// console.log(allCategories);

//* Render categories option function

async function renderCategoriesFilter() {
	const categoriesToRender = await getAllCategories();
	let renderedCategoriesOptions = `<option selected value="todas">todas</option>`;
	categoriesToRender.forEach((category: string) => {
		renderedCategoriesOptions += `<option value="${category}">${category}</option>`;
		categorySelectEl.innerHTML = renderedCategoriesOptions;
	});
}

renderCategoriesFilter();

//* Filter products by catgory function

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
	const sortedProducts = productsList.sort(function (a: Product, b: Product) {
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
	const sortedProducts = productsList.sort(function (a: Product, b: Product) {
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
	const sortedProducts = productsList.sort(function (a: Product, b: Product) {
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
	const sortedProducts = productsList.sort(function (a: Product, b: Product) {
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
