// productService.ts

export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
}

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    return await response.json();
}

export async function getAllCategories(): Promise<string[]> {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    return await response.json();
}
