//* Capture DOM elements

const productsListEl = document.getElementById(
	"productsList"
) as HTMLDivElement;

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
	return fetch("https://fakestoreapi.com/products")
		.then((response) => response.json())
		.then((processedResponse) => processedResponse);
}

const allProducts = await getAllProducts();
// console.log(allProducts);

//* Get products by ID function

async function getProductById(productId: number) {
	return fetch(`https://fakestoreapi.com/products/${productId}`)
		.then((response) => response.json())
		.then((processedResponse) => processedResponse);
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
	return fetch("https://fakestoreapi.com/products/categories")
		.then((response) => response.json())
		.then((processedResponse) => processedResponse);
}

const allCategories = await getAllCategories();
console.log(allCategories);
