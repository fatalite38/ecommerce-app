// cart.ts
import { getCartItems, setCartItems, getUserId, type CartItem } from '../utils/storage';

function loadCart() {
    const userId = getUserId();;
    if (!userId) {
        alert('Usuário não autenticado. Redirecionando para o login...');
        window.location.href = '/src/pages/login.html';
        return;
    }

    const cartItems: CartItem[] = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    const cartItemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('totalAmount');

    if (cartItemsEl && totalEl) {
        if (cartItems.length === 0) {
            cartItemsEl.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
            totalEl.textContent = '0.00';
        } else {
            let totalAmount = 0;
            cartItemsEl.innerHTML = cartItems.map(item => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.title}" width="70">
                        <span class="title">${item.title}</span>
                        <span class="quantity">Quantidade: 
                            <button class="subtracao" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            ${item.quantity}
                            <button class="adicao" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </span>
                        <span>Preço: R$ ${item.price.toFixed(2)}</span>
                        <span>Total: R$ ${itemTotal.toFixed(2)}</span>
                        <button class="remove" onclick="removeItem(${item.id})">
                            <img src="/src/assets/icons/bxs-trash.svg" alt="" style="width: 20px; height: 20px;">
                        </button>

                    </div>
                `;
            }).join('');
            totalEl.textContent = totalAmount.toFixed(2);
        }
    }
}

function updateQuantity(productId: number, newQuantity: number) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    let cart: CartItem[] = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        loadCart();
    }
}

function removeItem(productId: number) {
    const userId = getUserId();
    if (!userId) return;

    let cart = getCartItems(userId);
    cart = cart.filter((item: { id: number; }) => item.id !== productId);
    setCartItems(userId, cart);
    loadCart();
}

function checkout() {
    const userId = getUserId();
    if (!userId) {
        alert('Erro: usuário não identificado.');
        return;
    }

    const cart = getCartItems(userId);
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    alert('Compra finalizada com sucesso!');
    localStorage.removeItem(`cart_${userId}`);
    loadCart();
}

window.onload = loadCart;

(window as any).updateQuantity = updateQuantity;
(window as any).removeItem = removeItem;
(window as any).checkout = checkout;