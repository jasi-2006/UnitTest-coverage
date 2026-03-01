import { getCartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } from '../js/cart.js';

const renderCartPage = () => {
    const container = document.getElementById('cartPageContent');
    const items = getCartItems();
    const badge = document.getElementById('cartBadge');
    const count = getCartCount();

    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('cart-badge-visible', count > 0);
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="cart-page-empty">
                <div class="cart-empty-icon">🛒</div>
                <p class="cart-empty">Tu carrito está vacío</p>
                <p class="cart-empty-hint">Agrega productos desde nuestro catálogo</p>
                <a href="/index.html" class="btn-back-shop">Ir a la tienda</a>
            </div>
        `;
        return;
    }

    const itemsHTML = items.map(({ product, quantity }) => `
        <div class="cart-page-item">
            <img src="${product.image}" alt="${product.name}" class="cart-page-item-image">
            <div class="cart-page-item-info">
                <h3 class="cart-page-item-name">${product.name}</h3>
                <p class="cart-page-item-price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="cart-page-item-controls">
                <div class="cart-item-qty">
                    <button class="qty-btn" data-action="decrease" data-id="${product.id}">−</button>
                    <span class="qty-value">${quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${product.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${product.id}">Eliminar</button>
            </div>
            <div class="cart-page-item-subtotal">$${(product.price * quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const total = getCartTotal();

    container.innerHTML = `
        <div class="cart-page-items">
            ${itemsHTML}
        </div>
        <div class="cart-page-summary">
            <h3 class="cart-summary-title">Resumen del pedido</h3>
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <strong>$${total.toFixed(2)}</strong>
            </div>
            <div class="cart-summary-row">
                <span>Envío:</span>
                <strong>Gratis</strong>
            </div>
            <div class="cart-summary-total">
                <span>Total:</span>
                <strong>$${total.toFixed(2)}</strong>
            </div>
            <button class="cart-checkout-btn" id="checkoutBtn">Finalizar compra</button>
            <a href="/index.html" class="btn-continue-shop">Continuar comprando</a>
        </div>
    `;

    attachEventListeners();
};

const attachEventListeners = () => {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            const item = getCartItems().find(i => i.product.id === id);
            if (item) {
                const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                updateQuantity(id, newQty);
                renderCartPage();
            }
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
            renderCartPage();
        });
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Funcionalidad de pago en desarrollo');
        });
    }
};

document.addEventListener('DOMContentLoaded', renderCartPage);
