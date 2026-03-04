/**
 * Tests para cart.js con estado global (proyecto ya desplegado)
 */

import { 
    getCart,
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount, 
    clearCart 
} from '../js/cart.js';

const mockProduct1 = {
    id: 1,
    name: 'Laptop Pro',
    price: 1299.99,
    category: 'Computación'
};

const mockProduct2 = {
    id: 2,
    name: 'Mouse Gaming',
    price: 79.99,
    category: 'Periféricos'
};

// ==========================================
// TEST RUNNER
// ==========================================

const tests = [];
const describe = (name, fn) => fn();
const it = (name, fn) => tests.push({ name, fn });

const expect = (actual) => ({
    toBe: (expected) => {  
        if (actual !== expected) {
            throw new Error(`Expected ${expected}, got ${actual}`);
        }
    },
    
    toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    },
    
    toBeCloseTo: (expected, precision = 2) => {
        const factor = Math.pow(10, precision);
        const actualRounded = Math.round(actual * factor);
        const expectedRounded = Math.round(expected * factor);
        if (actualRounded !== expectedRounded) {
            throw new Error(`Expected ${expected} (±${precision} dec), got ${actual}`);
        }
    },

    toHaveLength: (expected) => {
        if (actual.length !== expected) {
            throw new Error(`Expected length ${expected}, got ${actual.length}`);
        }
    },

    toBeDefined: () => {
        if (actual === undefined) {
            throw new Error("Expected defined value, got undefined");
        }
    }
});

// ==========================================
// TESTS
// ==========================================

describe('🛒 Carrito - Pruebas Unitarias', () => {
    
    // LIMPIAR ANTES DE CADA TEST
    beforeEach: () => clearCart(),
    
    describe('getCart', () => {
        it('deberia retornar array vacio inicialmente', () => {
            clearCart();
            const cart = getCart();
            expect(cart).toHaveLength(0);
        });
    });
    
    describe('addToCart', () => {
        it('deberia agregar producto a carrito vacio', () => {
            clearCart();
            addToCart(mockProduct1);
            const cart = getCart();
            expect(cart).toHaveLength(1);
            expect(cart[0].product.id).toBe(1);
            expect(cart[0].quantity).toBe(1);
        });

        it('deberia agregar cantidad especificada', () => {
            clearCart();
            addToCart(mockProduct1, 3);
            const cart = getCart();
            expect(cart[0].quantity).toBe(3);
        });

        it('deberia incrementar cantidad si producto existe', () => {
            clearCart();
            addToCart(mockProduct1, 2);
            addToCart(mockProduct1, 3);
            const cart = getCart();
            expect(cart).toHaveLength(1);
            expect(cart[0].quantity).toBe(5);
        });

        it('deberia agregar nuevo producto si ID diferente', () => {
            clearCart();
            addToCart(mockProduct1);
            addToCart(mockProduct2);
            const cart = getCart();
            expect(cart).toHaveLength(2);
        });
        
        it('no deberia agregar producto invalido (null)', () => {
            clearCart();
            addToCart(null);
            expect(getCart()).toHaveLength(0);
        });
        
        it('no deberia agregar producto sin ID', () => {
            clearCart();
            addToCart({ name: 'Sin ID', price: 100 });
            expect(getCart()).toHaveLength(0);
        });
    });
    
    describe('removeFromCart', () => {
        it('deberia eliminar producto existente', () => {
            clearCart();
            addToCart(mockProduct1);
            addToCart(mockProduct2);
            removeFromCart(1);
            const cart = getCart();
            expect(cart).toHaveLength(1);
            expect(cart[0].product.id).toBe(2);
        });
        
        it('deberia dejar carrito vacio si elimina unico item', () => {
            clearCart();
            addToCart(mockProduct1);
            removeFromCart(1);
            expect(getCart()).toHaveLength(0);
        });
        
        it('no deberia fallar si ID no existe', () => {
            clearCart();
            addToCart(mockProduct1);
            removeFromCart(999); // No existe
            expect(getCart()).toHaveLength(1); // Sigue igual
        });
    });
    
    describe('updateQuantity', () => {
        it('deberia actualizar cantidad', () => {
            clearCart();
            addToCart(mockProduct1, 1);
            updateQuantity(1, 5);
            expect(getCart()[0].quantity).toBe(5);
        });
        
        it('deberia eliminar si cantidad es 0', () => {
            clearCart();
            addToCart(mockProduct1);
            updateQuantity(1, 0);
            expect(getCart()).toHaveLength(0);
        });
        
        it('deberia eliminar si cantidad negativa', () => {
            clearCart();
            addToCart(mockProduct1);
            updateQuantity(1, -5);
            expect(getCart()).toHaveLength(0);
        });
    });
    
    describe('getCartTotal', () => {
        it('deberia retornar 0 para carrito vacio', () => {
            clearCart();
            expect(getCartTotal()).toBe(0);
        });
        
        it('deberia calcular total de un item', () => {
            clearCart();
            addToCart(mockProduct1, 2); // 1299.99 * 2 = 2599.98
            expect(getCartTotal()).toBeCloseTo(2599.98, 2);
        });
        
        it('deberia calcular total de multiples items', () => {
            clearCart();
            addToCart(mockProduct1, 1); // 1299.99
            addToCart(mockProduct2, 2); // 79.99 * 2 = 159.98
            // Total: 1459.97
            expect(getCartTotal()).toBeCloseTo(1459.97, 2);
        });
    });
    
    describe('getCartCount', () => {
        it('deberia retornar 0 para carrito vacio', () => {
            clearCart();
            expect(getCartCount()).toBe(0);
        });
        
        it('deberia contar cantidad total de items', () => {
            clearCart();
            addToCart(mockProduct1, 3);
            addToCart(mockProduct2, 2);
            expect(getCartCount()).toBe(5);
        });
        
        it('deberia contar correctamente despues de eliminar', () => {
            clearCart();
            addToCart(mockProduct1, 5);
            addToCart(mockProduct2, 3);
            removeFromCart(1);
            expect(getCartCount()).toBe(3); // Solo quedan 3 del mouse
        });
    });
    
    describe('clearCart', () => {
        it('deberia vaciar el carrito', () => {
            clearCart();
            addToCart(mockProduct1);
            addToCart(mockProduct2);
            clearCart();
            expect(getCart()).toHaveLength(0);
            expect(getCartCount()).toBe(0);
            expect(getCartTotal()).toBe(0);
        });
    });
    
    describe('Flujo completo de integración', () => {
        it('flujo completo: agregar, actualizar, eliminar, totales', () => {
            // 1. Inicio vacio
            clearCart();
            expect(getCartCount()).toBe(0);
            
            // 2. Agregar laptop
            addToCart(mockProduct1, 1);
            expect(getCartCount()).toBe(1);
            expect(getCartTotal()).toBeCloseTo(1299.99, 2);
            
            // 3. Agregar mouse x2
            addToCart(mockProduct2, 2);
            expect(getCartCount()).toBe(3);
            expect(getCart()).toHaveLength(2);
            
            // 4. Agregar mas laptops (incrementa)
            addToCart(mockProduct1, 2);
            expect(getCartCount()).toBe(5);
            expect(getCart()).toHaveLength(2);
            
            // Verificar laptop tiene qty 3
            const laptop = getCart().find(item => item.product.id === 1);
            expect(laptop.quantity).toBe(3);
            
            // 5. Actualizar mouse a 1
            updateQuantity(2, 1);
            expect(getCartCount()).toBe(4);
            
            // 6. Eliminar laptops
            removeFromCart(1);
            expect(getCart()).toHaveLength(1);
            expect(getCartCount()).toBe(1);
            expect(getCartTotal()).toBeCloseTo(79.99, 2);
            
            // 7. Vaciar
            clearCart();
            expect(getCart()).toHaveLength(0);
        });
    });
});

// ==========================================
// EJECUCION DE TESTS
// ==========================================

let passed = 0;
let failed = 0;

console.log('\n🛒 Carrito - Pruebas Unitarias\n');
console.log('========================================\n');

const startTime = Date.now();

tests.forEach(({ name, fn }) => {
    try {
        fn();
        console.log(`  ✅ ${name}`);
        passed++;
    } catch (error) {
        console.log(`  ❌ ${name}`);
        console.log(`     ${error.message}`);
        failed++;
    }
});

const endTime = Date.now();
const duration = (endTime - startTime).toFixed(2);

console.log('\n========================================');
console.log(`📊 Resultados: ${passed} pasadas, ${failed} fallidas`);
console.log(`⏱️  Duración: ${duration}ms`);
console.log(`📈 Tasa de éxito: ${((passed / tests.length) * 100).toFixed(1)}%`);
console.log('========================================\n');

if (failed > 0) {
    process.exit(1);
}