//* Capture DOM elements

const productsListEl = document.getElementById(
	"productsList"
) as HTMLDivElement;
const categorySelectEl = document.getElementById(
	"categorySelect"
) as HTMLSelectElement;

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
// console.log(allProducts);

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
	let renderedCategoriesOptions = `<option selected disabled></option>`;
	categoriesToRender.forEach((category: string) => {
		renderedCategoriesOptions += `<option value="${category}">${category}</option>`;
		categorySelectEl.innerHTML = renderedCategoriesOptions;
	});
}

renderCategoriesFilter();

//* filter by catgory function

categorySelectEl.addEventListener("change", function filterByCategory() {
	const selectedCategory = categorySelectEl.value;
	const filteredCatecory = allProducts.filter((product: Product) => {
		return product.category === selectedCategory;
	});
	renderProducts(filteredCatecory);
});
