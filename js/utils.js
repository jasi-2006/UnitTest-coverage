/**
 * Utilidades funcionales puras para el catálogo
 */

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} String formateado como moneda
 */
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

/**
 * Busca un producto por ID en un array
 * @param {Array} products - Array de productos

 * @returns {Object|undefined} Producto encontrado o undefined
 */
export const findProductById = (products, id) => 
    products.find(product => product.id === id);



/**
 * Valida si un producto tiene la estructura correcta
 * @param {Object} product - Producto a validar
 * @returns {boolean} true si es válido
 */
export const isValidProduct = (product) => {
    // Verificar que exista y sea un objeto
    if (!product || typeof product !== 'object') return false;
    
    // Verificar que tenga las propiedades requeridas con tipos correctos
    const hasValidId = typeof product.id === 'number' && !isNaN(product.id);
    const hasValidName = typeof product.name === 'string' && product.name.trim().length > 0;
    const hasValidPrice = typeof product.price === 'number' && !isNaN(product.price) && product.price >= 0;
    
    return hasValidId && hasValidName && hasValidPrice;
};

/**
 * Trunca texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Debounce function para optimizar eventos
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Genera un slug a partir de un string
 * @param {string} text - Texto a convertir
 * @returns {string} Slug URL-friendly
 */
export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};