/**
 * Módulo del Carrito - Estado y lógica
 */

let cartItems = [];

/**
 * Obtiene los items del carrito
 * @returns {Array} Items en el carrito [{ product, quantity }]
 */
export const getCartItems = () => [...cartItems];

/**
 * Agrega un producto al carrito
 * @param {Object} product - Producto a agregar
 * @param {number} quantity - Cantidad (default 1)
 */
export const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;

    const existing = cartItems.find(item => item.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cartItems.push({ product: { ...product }, quantity });
    }
};

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto
 */
export const removeFromCart = (productId) => {
    cartItems = cartItems.filter(item => item.product.id !== productId);
};

/**
 * Actualiza la cantidad de un producto
 * @param {number} productId - ID del producto
 * @param {number} quantity - Nueva cantidad (0 para eliminar)
 */
export const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cartItems.find(i => i.product.id === productId);
    if (item) item.quantity = quantity;
};

/**
 * Calcula el total del carrito
 * @returns {number} Total en USD
 */
export const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

/**
 * Cantidad total de items
 * @returns {number}
 */
export const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Vacía el carrito
 */
export const clearCart = () => {
    cartItems = [];
};
