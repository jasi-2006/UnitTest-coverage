// tests/products.test.js

import { getProducts } from '../js/products.js';
import { formatCurrency, findProductById, truncateText } from '../js/utils.js';

// Test runner simple
const tests = [];
const describe = (name, fn) => fn();
const it = (name, fn) => tests.push({ name, fn });
const expect = (actual) => ({
    toBe: (expected) => {
        if (actual !== expected) throw new Error(`esperada ${expected}, consiguió ${actual}`);
    },
    toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`esperada ${JSON.stringify(expected)}, consiguió${JSON.stringify(actual)}`);
        }
    },
    toBeGreaterThan: (expected) => {
        if (!(actual > expected)) throw new Error(`Experada ${actual} > ${expected}`);
    },
    toHaveLength: (expected) => {
        if (actual.length !== expected) throw new Error(`longitud esperada  ${expected}, consiguió${actual.length}`);
    }
});

// ============ TESTS ============

describe('modulo de productos ', () => {
    
    describe('traer productos', () => {
        it('debería devolver una matriz de 6 producto', () => {
            const products = getProducts();
            expect(products).toHaveLength(6);
        });

       it('Debe tener productos con identificación, nombre y precio.', () => {
            const products = getProducts();
            const p = products[0];
            expect(typeof p.id).toBe('number');
            expect(typeof p.name).toBe('string');
            expect(typeof p.price).toBe('number');
        });
    });

});

describe('Módulo de utilidades', () => {
    
    describe('formato de moneda ', () => {
        it('Debería formatear 10.5 a moneda', () => {
            const result = formatCurrency(10.5);
            // Verifica que contenga números
            if (!result.match(/\d/)) throw new Error('formato de moneda ');
        });

        it('Debería devolver $0.00 por no válido', () => {
            expect(formatCurrency('invalido')).toBe('$0.00');
        });
    });

    describe('traer producto ', () => {
        it('Debería encontrar el producto 1', () => {
            const products = getProducts();
            const p = findProductById(products, 1);
            expect(p.id).toBe(1);
        });
    });


    describe('truncar texto', () => {
        it('debe truncar el texto largo', () => {
            const long = 'a'.repeat(200);
            const result = truncateText(long, 100);
            expect(result.endsWith('...')).toBe(true);
        });
    });
});

// ============ RUN TESTS ============

let passed = 0;
let failed = 0;

console.log('\n corriendo tests...\n');

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

console.log(`\n📊 Resultado: ${passed} paso, ${failed} fallo\n`);

if (failed > 0) process.exit(1);