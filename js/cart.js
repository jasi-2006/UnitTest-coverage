/**
 * Módulo del Carrito - Con estado interno
 */

let cart = [];

export const getCart = () => cart;
export const getCartItems = () => cart;

export const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
        cart = cart.map((item, index) => 
            index === existingIndex 
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
    } else {
        cart = [...cart, { product: { ...product }, quantity }];
    }
};

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.product.id !== productId);
};

export const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    cart = cart.map(item => 
        item.product.id === productId 
            ? { ...item, quantity }
            : item
    );
};

export const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => {
    cart = [];
};