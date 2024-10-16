let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const subtotal = document.querySelector('.subtotal');
    const total = document.querySelector('.total-price');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">${item.price.toLocaleString('vi-VN')}đ</p>
                <div class="item-quantity">
                    <button class="decrease-quantity">-</button>
                    <input type="number" value="${item.quantity}" min="1">
                    <button class="increase-quantity">+</button>
                </div>
            </div>
            <span class="remove-item">❌</span>
        </div>
    `).join('');

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    subtotal.textContent = `${cartTotal.toLocaleString('vi-VN')}đ`;
    total.textContent = `${cartTotal.toLocaleString('vi-VN')}đ`;

    attachCartEvents();
}

function attachCartEvents() {
    const cartItems = document.querySelector('.cart-items');

    cartItems.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const itemId = parseInt(cartItem.dataset.id);

        if (e.target.classList.contains('increase-quantity')) {
            updateQuantity(itemId, 1);
        } else if (e.target.classList.contains('decrease-quantity')) {
            updateQuantity(itemId, -1);
        } else if (e.target.classList.contains('remove-item')) {
            removeFromCart(itemId);
        }
    });

    cartItems.addEventListener('change', (e) => {
        if (e.target.type === 'number') {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            const newQuantity = parseInt(e.target.value);
            updateQuantity(itemId, newQuantity, true);
        }
    });
}

function updateQuantity(productId, change, setExact = false) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (setExact) {
            item.quantity = change;
        } else {
            item.quantity += change;
        }
        if (item.quantity < 1) item.quantity = 1;
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartIcon();
});

export { addToCart, removeFromCart, updateCart };

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function clearCart() {
    localStorage.removeItem('cart');
    updateCartIcon();
}
