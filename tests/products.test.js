// tests/products.test.js

import { getProducts} from '../js/products.js';
import { formatCurrency, findProductById, isValidProduct, truncateText } from '../js/utils.js';

// Test runner simple
const tests = [];
const describe = (name, fn) => fn();
const it = (name, fn) => tests.push({ name, fn });
const expect = (actual) => ({
    toBe: (expected) => {
        if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
    },
    toEqual: (expected) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    },
    toBeGreaterThan: (expected) => {
        if (!(actual > expected)) throw new Error(`Expected ${actual} > ${expected}`);
    },
    toHaveLength: (expected) => {
        if (actual.length !== expected) throw new Error(`Expected length ${expected}, got ${actual.length}`);
    }
});

// ============ TESTS ============

describe('Products Module', () => {
    
    describe('getProducts', () => {
        it('should return array of 6 products', () => {
            const products = getProducts();
            expect(products).toHaveLength(6);
        });

        it('should have products with id, name, price', () => {
            const products = getProducts();
            const p = products[0];
            expect(typeof p.id).toBe('number');
            expect(typeof p.name).toBe('string');
            expect(typeof p.price).toBe('number');
        });
    });

});

describe('Utils Module', () => {
    
    describe('formatCurrency', () => {
        it('should format 10.5 to currency', () => {
            const result = formatCurrency(10.5);
            // Verifica que contenga números
            if (!result.match(/\d/)) throw new Error('No format currency');
        });

        it('should return $0.00 for invalid', () => {
            expect(formatCurrency('invalid')).toBe('$0.00');
        });
    });

    describe('findProductById', () => {
        it('should find product 1', () => {
            const products = getProducts();
            const p = findProductById(products, 1);
            expect(p.id).toBe(1);
        });
    });



    describe('truncateText', () => {
        it('should truncate long text', () => {
            const long = 'a'.repeat(200);
            const result = truncateText(long, 100);
            expect(result.endsWith('...')).toBe(true);
        });
    });
});

// ============ RUN TESTS ============

let passed = 0;
let failed = 0;

console.log('\n🧪 Running Tests...\n');

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

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) process.exit(1);