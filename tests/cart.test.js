import { getCartCount, removeFromCart, updateQuantity, clearCart, getCartTotal, addToCart, createEmptyCart } from '../js/cart.js';

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


// test simples para el carrito 

const tests=[];
const describe = (name, fn)=>fn();
const it = (name, fn ) =>tests.push({name, fn});

const expect =(actual) =>({
    toBe:(expected)=>{  
        if (actual !==expected){
            throw new console.error(`expected ${expected}, got ${actual}`);
        }
    },
    
    toEcual: (expected)=>{
        if (JSON.stringify(actual)!== JSON.stringify.apply(expected)){
            throw new error (`$Expected${JSON.stringify(expected)},got${JSON.stringify(actual)}`);
        }
    },
    
    toBeCloseTo:(expected, precision= 2)=>{
        const factor =Math.pow(10,precision);
        if(Math.round(actual *factor)){
            throw new Error(`expected${actual}to be close to ${expected}`);
        }
    },

    toHaveLength:(expected)=>{
        if(actual.length !==expected ){
            throw new Error(`expected length${expected}, got${actual.length}`);
        }
    },

    toBeDefined:()=>{
        if(actual === undefined){
            throw new Error("expected defined value, got undefined")
        }
    }
});

// test del carrito 

describe(' modulo del carrito- pruevas unitarias',()=>{
    describe('createEmptyCarts',()=>{
        it ("deberia retornar array vacio",()=>{
            const cart =createEmptyCart();
            expect(cart).toHaveLength(0);
        })
        
        it('deberia retornar un nuevo array cada vez',()=>{
        const cart1 =createEmptyCart();
        const cart2 =createEmptyCart();
        expect(cart1 ===cart2).toBe(false);
        });

    });

    describe("addToCart", ()=>{
    it("deberia agregar producto a carrito vacio", ()=>{
        const cart = addToCart([], mockProduct1);
        expect (cart).toHaveLength(1);
        expect (cart[0].product.id).toBe(1);
        expect(cart[0].quantity).toBe(1);
    });

    it("deberia agregar cantidad especificada", ()=>{
        const cart = addToCart([], mockProduct1,3);
        expect(cart[0].quantity).toBe(3);
    });

    it ("deberia incrementar la cantidad si el producto existe ",()=>{
        let cart =addToCart([], mockProduct1, 2);
        cart = addToCart(cart,mockProduct1, 3);
        expect (cart).toHaveLength(1);
        expect(cart[0].quantity).toBe(5);
    });

    it('deberia agregar nuevo producto si ID diferente', () => {
        let cart = addToCart([], mockProduct1);
        cart = addToCart(cart, mockProduct2);
        expect(cart).toHaveLength(2);
        expect(cart[0].product.id).toBe(1);
        expect(cart[1].product.id).toBe(2);
    });
        
    it('NO deberia mutar carrito original (inmutable)', () => {
        const original = [];
        const newCart = addToCart(original, mockProduct1);
        expect(original).toHaveLength(0); 
        expect(newCart).toHaveLength(1);  
    });
        
    it('deberia retornar mismo carrito si producto invalido', () => {
        const cart = addToCart([], null);
        expect(cart).toHaveLength(0);
          
        const cart2 = addToCart([], { name: 'Sin ID' });
        expect(cart2).toHaveLength(0);
    });
        
    it('deberia hacer copia profunda del producto', () => {
        const cart = addToCart([], mockProduct1);
        cart[0].product.name = 'Modificado';
        expect(mockProduct1.name).toBe('Laptop Pro'); 
    });
});
    
describe('removeFromCart', () => {
    it('deberia eliminar producto existente', () => {
        let cart = addToCart([], mockProduct1);
        cart = addToCart(cart, mockProduct2);
        cart = removeFromCart(cart, 1);
        expect(cart).toHaveLength(1);
        expect(cart[0].product.id).toBe(2);
    });
        
    it('deberia retornar array vacio si elimina unico item', () => {
        let cart = addToCart([], mockProduct1);
        cart = removeFromCart(cart, 1);
        expect(cart).toHaveLength(0);
    });
        
    it('deberia retornar mismo carrito si ID no existe', () => {
        let cart = addToCart([], mockProduct1);
        const originalLength = cart.length;
        cart = removeFromCart(cart, 999);
        expect(cart).toHaveLength(originalLength);
    });
        
    it('NO deberia mutar carrito original', () => {
        let cart = addToCart([], mockProduct1);
        cart = addToCart(cart, mockProduct2);
        const original = cart;
        const newCart = removeFromCart(cart, 1);
        expect(original).toHaveLength(2);
        expect(newCart).toHaveLength(1);
    });
});
    
describe('updateQuantity', () => {
    it('deberia actualizar cantidad de producto', () => {
        let cart = addToCart([], mockProduct1, 1);
        cart = updateQuantity(cart, 1, 5);
        expect(cart[0].quantity).toBe(5);
    });
        
    it('deberia eliminar producto si cantidad es 0', () => {
        let cart = addToCart([], mockProduct1);
        cart = updateQuantity(cart, 1, 0);
        expect(cart).toHaveLength(0);
    });
        
    it('deberia eliminar producto si cantidad negativa', () => {
        let cart = addToCart([], mockProduct1);
        cart = updateQuantity(cart, 1, -1);
        expect(cart).toHaveLength(0);
    });
        
    it('deberia retornar mismo carrito si producto no existe', () => {
        let cart = addToCart([], mockProduct1);
        const newCart = updateQuantity(cart, 999, 5);
        expect(newCart).toHaveLength(1);
        expect(newCart[0].quantity).toBe(1);
    });
        
    it('NO deberia mutar carrito original', () => {
        let cart = addToCart([], mockProduct1, 2);
        const original = cart;
        const newCart = updateQuantity(cart, 1, 5);
        expect(original[0].quantity).toBe(2);
        expect(newCart[0].quantity).toBe(5);
    });
});
    
    
describe('getCartCount', () => {
    it('deberia retornar 0 para carrito vacio', () => {
        expect(getCartCount([])).toBe(0);
    });
        
    it('deberia contar cantidad total de items', () => {
        let cart = addToCart([], mockProduct1, 3);
        cart = addToCart(cart, mockProduct2, 2);
        expect(getCartCount(cart)).toBe(5);
    });
        
    it('deberia contar correctamente despues de eliminar', () => {
        let cart = addToCart([], mockProduct1, 5);
        cart = addToCart(cart, mockProduct2, 3);
        cart = removeFromCart(cart, 1);
        expect(getCartCount(cart)).toBe(3);
    });
});
    
describe('clearCart', () => {
    it('deberia retornar array vacio', () => {
        expect(clearCart()).toHaveLength(0);
    });
        
    it('deberia retornar nuevo array', () => {
        const empty = clearCart();
        expect(Array.isArray(empty)).toBe(true);
    });
});
    
describe('Flujo completo de integración', () => {

        
    it('inmutabilidad garantizada en todo el flujo', () => {
        const historial = [];
        
        let cart = createEmptyCart();
        historial.push(cart);           
        
        cart = addToCart(cart, mockProduct1);
        historial.push(cart);           
        
        cart = addToCart(cart, mockProduct2);
        historial.push(cart);        
        
        cart = updateQuantity(cart, 1, 5);
        historial.push(cart);           
        
        cart = removeFromCart(cart, 2); 
        historial.push(cart);          

        for (let i = 0; i < historial.length - 1; i++) {
            expect(historial[i] === historial[i + 1]).toBe(false);
        }

        
        expect(historial[0]).toHaveLength(0);          
        expect(historial[1]).toHaveLength(1);           
        expect(historial[4]).toHaveLength(1);           
        
        const finalItem = historial[4][0];
        expect(finalItem.product.id).toBe(1);
        expect(finalItem.quantity).toBe(5);
    });
});
});



// ejecucuin de los tests

let passed = 0;
let failed = 0;

console.log('\n modulo de carrito')
console.log('-------------------------------------\n')

console.log('\n🛒 Módulo del Carrito - Pruebas Unitarias\n');
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
