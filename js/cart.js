/**
 * Módulo del Carrito - Programación Funcional Pura
 */

export const createEmptyCart = () => [];

export const addToCart = (cart, product, quantity = 1) => {
    if (!product || !product.id) return cart;
    
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingIndex >= 0) {
        return cart.map((item, index) => 
            index === existingIndex 
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
    }
    
    return [...cart, { product: { ...product }, quantity }];
};

export const removeFromCart = (cart, productId) => {
    return cart.filter(item => item.product.id !== productId);
};

export const updateQuantity = (cart, productId, quantity) => {
    if (quantity <= 0) {
        return removeFromCart(cart, productId);
    }
    
    return cart.map(item => 
        item.product.id === productId 
            ? { ...item, quantity }
            : item
    );
};

export const getCartTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

export const getCartCount = (cart) => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => [];