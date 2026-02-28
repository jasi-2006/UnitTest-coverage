/**
 * Aplicación Principal - Catálogo de Productos
 * Sin funcionalidad de carrito, solo visualización y filtros
 */

import { getProducts } from './products.js';
import { formatCurrency,  truncateText } from './utils.js';


// Referencias DOM
const elements = {
    productsGrid: document.getElementById('productsGrid'),
    productModal: document.getElementById('productModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
};

// Inicialización
const init = () => {
    renderProducts();
    setupEventListeners();
};

// Renderizado de Productos
const renderProducts = () => {
    let products = getProducts();

    elements.productsGrid.innerHTML = products.map(product => `
        <article class="product-card" data-product-id="${product.id}" onclick="openProductModal(${product.id})">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.desc}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${truncateText(product.description, 120)}</p>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <span class="product-status">
                        <span class="status-dot"></span>
                       <input type="button" value="agregar al carrito" onclick="" // agregar carrito >
                    </span>
                </div>
            </div>
        </article>
    `).join('');
};




// Iniciar aplicación
document.addEventListener('DOMContentLoaded', init);