interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

function loadCart() {
    const userId = sessionStorage.getItem('userId');
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
            cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
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
                        <button class="remove" onclick="removeItem(${item.id})">Excluir</button>
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
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    let cart: CartItem[] = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    loadCart();
}

function checkout() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        alert('Erro: usuário não identificado.');
        return;
    }

    // Pegar os itens do carrinho do usuário
    const cart: CartItem[] = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');

    // Verificar se o carrinho está vazio
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione algum item antes de finalizar a compra.');
        return; 
    }

    //finalizar a compra
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem(`cart_${userId}`);
    loadCart(); 
}

window.onload = loadCart;

(window as any).updateQuantity = updateQuantity;
(window as any).removeItem = removeItem;
(window as any).checkout = checkout;