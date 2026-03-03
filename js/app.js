/**
 * Aplicación Principal - Catálogo de Productos con Carrito
 */

import { getProducts } from './products.js';
import { formatCurrency, truncateText } from './utils.js';
import {
    getCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart
} from './cart.js';

// Referencias DOM
const elements = {
    productsGrid: document.getElementById('productsGrid'),
    cartBtn: document.getElementById('cartBtn'),
    cartBadge: document.getElementById('cartBadge'),
    cartPanel: document.getElementById('cartPanel'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartPanelBody: document.getElementById('cartPanelBody'),
    cartPanelFooter: document.getElementById('cartPanelFooter'),
    cartTotal: document.getElementById('cartTotal'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
};

// Imagen placeholder para productos sin imagen
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x400?text=Sin+imagen';

// Inicialización
const init = () => {
    renderProducts();
    setupEventListeners();
    updateCartUI();
};

// Renderizado de Productos
const renderProducts = () => {
    const products = getProducts();

    elements.productsGrid.innerHTML = products.map(product => {
        const imgSrc = product.image || PLACEHOLDER_IMAGE;
        const imgAlt = product.desc || product.name;
        return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${imgSrc}" alt="${imgAlt}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${truncateText(product.description, 120)}</p>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <span class="product-status">
                        <span class="status-dot"></span>
                        <button type="button" class="add-to-cart-btn" data-product-id="${product.id}">
                            Agregar al carrito
                        </button>
                    </span>
                </div>
            </div>
        </article>
    `;
    }).join('');

    // Delegación de eventos para botones agregar
    elements.productsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;
        e.stopPropagation();
        const productId = parseInt(btn.dataset.productId, 10);
        const product = products.find(p => p.id === productId);
        if (product) {
            addToCart(product);
            updateCartUI();
        }
    });
};

// Actualiza badge y panel del carrito
const updateCartUI = () => {
    const count = getCartCount();
    elements.cartBadge.textContent = count;
    elements.cartBadge.classList.toggle('cart-badge-visible', count > 0);

    renderCartItems();
};

// Renderiza los items del carrito
const renderCartItems = () => {
    const items = getCartItems();

    if (items.length === 0) {
        elements.cartPanelBody.innerHTML = `
            <p class="cart-empty">Tu carrito está vacío</p>
            <p class="cart-empty-hint">Agrega productos desde el catálogo</p>
        `;
        elements.cartPanelFooter.style.display = 'none';
        return;
    }

    elements.cartPanelFooter.style.display = 'block';
    elements.cartPanelBody.innerHTML = items.map(item => {
        const imgSrc = item.product.image || PLACEHOLDER_IMAGE;
        const subtotal = item.product.price * item.quantity;
        return `
        <div class="cart-item" data-product-id="${item.product.id}">
            <img src="${imgSrc}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.product.name}</h4>
                <p class="cart-item-price">${formatCurrency(item.product.price)} × ${item.quantity}</p>
                <div class="cart-item-actions">
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn" data-action="decrease" data-id="${item.product.id}">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button type="button" class="qty-btn" data-action="increase" data-id="${item.product.id}">+</button>
                    </div>
                    <button type="button" class="cart-item-remove" data-id="${item.product.id}">Eliminar</button>
                </div>
            </div>
            <span class="cart-item-subtotal">${formatCurrency(subtotal)}</span>
        </div>
        `;
    }).join('');

    elements.cartTotal.textContent = formatCurrency(getCartTotal());
};

const handleCartItemClick = (e) => {
    const qtyBtn = e.target.closest('.qty-btn');
    const removeBtn = e.target.closest('.cart-item-remove');
    const id = parseInt(e.target.dataset?.id || e.target.closest('[data-id]')?.dataset?.id, 10);
    if (isNaN(id)) return;

    if (qtyBtn) {
        const action = qtyBtn.dataset.action;
        const item = getCartItems().find(i => i.product.id === id);
        if (!item) return;
        const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        updateQuantity(id, newQty);
    } else if (removeBtn) {
        removeFromCart(id);
    }
    updateCartUI();
};

// Abrir/cerrar panel del carrito
const openCartPanel = () => {
    elements.cartPanel.classList.add('cart-panel-open');
    elements.cartOverlay.classList.add('cart-overlay-visible');
    document.body.style.overflow = 'hidden';
};

const closeCartPanel = () => {
    elements.cartPanel.classList.remove('cart-panel-open');
    elements.cartOverlay.classList.remove('cart-overlay-visible');
    document.body.style.overflow = '';
};

const setupEventListeners = () => {
    elements.cartBtn?.addEventListener('click', openCartPanel);
    elements.cartCloseBtn?.addEventListener('click', closeCartPanel);
    elements.cartOverlay?.addEventListener('click', closeCartPanel);
    elements.cartPanelBody?.addEventListener('click', handleCartItemClick);
    elements.cartCheckoutBtn?.addEventListener('click', () => {
        const count = getCartCount();
        if (count > 0) {
            alert(`¡Gracias por tu compra! Total: ${formatCurrency(getCartTotal())}\n\nSe procesarán ${count} producto(s).`);
            clearCart();
            updateCartUI();
            closeCartPanel();
        }
    });
};

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', init);
