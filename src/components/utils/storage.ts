
export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export function getCartItems(userId: string): CartItem[] {
    return JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
}

export function setCartItems(userId: string, cartItems: CartItem[]): void {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
}

export function getUserId(): string | null {
    return sessionStorage.getItem('userId');
}

export function getAuthToken(): string | null {
    return sessionStorage.getItem('authToken');
}