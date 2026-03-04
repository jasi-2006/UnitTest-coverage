# UnitTest- catalogo de productos 

Aplicacion web de catalogo de productos tecnologicos desarrollada con html, css y JavaScript puro que aplica principios de programacion funcional con pruebas unitarias y estilo responisivo para adaptabilidad para diferentes dispositivos, el proyecto separa la logica del DOM

# funcionalidades
- ver catalogo de productos en cards  interactivas
- Animaciones suaves en interacciones
- Diseño responsive con paleta verde bosque
- agregar prducto al carrito 
- boton en el carrito para aumentar o disminuir la cantidad de productos  


# pruebas unitarias 
el proyecto cuenta con pruebas unitarias para validar toda la logica del catalogo 
``bash
npm install
npm test

## resultados esperados 


 corriendo tests...

  ✅ debería devolver una matriz de 6 producto
  ✅ Debe tener productos con identificación, nombre y precio.
  ✅ Debería formatear 10.5 a moneda
  ✅ Debería devolver $0.00 por no válido
  ✅ Debería encontrar el producto 1
  ✅ debe truncar el texto largo

📊 Resultado: 6 paso, 0 fallo

🛒 Módulo del Carrito - Pruebas Unitarias

========================================


  ✅ deberia retornar array vacio inicialmente
  ✅ deberia agregar producto a carrito vacio
  ✅ deberia agregar cantidad especificada
  ✅ deberia incrementar cantidad si producto existe
  ✅ deberia agregar nuevo producto si ID diferente
  ✅ no deberia agregar producto invalido (null)
  ✅ no deberia agregar producto sin ID
  ✅ deberia eliminar producto existente
  ✅ deberia dejar carrito vacio si elimina unico item
  ✅ no deberia fallar si ID no existe
  ✅ deberia actualizar cantidad
  ✅ deberia eliminar si cantidad es 0
  ✅ deberia eliminar si cantidad negativa
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia calcular total de un item
  ✅ deberia calcular total de multiples items
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia contar cantidad total de items
  ✅ deberia contar correctamente despues de eliminar
  ✅ deberia vaciar el carrito
  ✅ flujo completo: agregar, actualizar, eliminar, totales

========================================
  ✅ deberia calcular total de multiples items
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia contar cantidad total de items
  ✅ deberia contar correctamente despues de eliminar
  ✅ deberia vaciar el carrito
  ✅ flujo completo: agregar, actualizar, eliminar, totales

========================================
  ✅ deberia contar cantidad total de items
  ✅ deberia contar correctamente despues de eliminar
  ✅ deberia vaciar el carrito
  ✅ flujo completo: agregar, actualizar, eliminar, totales

========================================
  ✅ deberia vaciar el carrito
  ✅ flujo completo: agregar, actualizar, eliminar, totales

========================================
📊 Resultados: 21 pasadas, 0 fallidas
⏱️  Duración: 12.00ms
📈 Tasa de éxito: 100.0%
========================================

## estructura del proyecto 

nombre-del-proyecto/
││
├── js/
│   ├── app.js              # Punto de entrada y manejo del DOM/eventos
│   ├── products.js         # Definición de productos o lógica de negocio
│   └── utils.js            # Funciones auxiliares y herramientas
│   └── cart.js             # Funciones principales del carrito
│   └── cart-page.js        # conneccion del carrito con los producctos 
|
│
├── node_modules/           # Dependencias instaladas vía npm (omitido en Git)
│
├── styles/
│   └── styles.css          # Hojas de estilo CSS del proyecto
│
├── tests/
│   └── products.test.js    # Pruebas unitarias para la lógica de productos
│   └── cart.test.js        # pruevas unitarias para la logica del carrito
│
├── index.html              # Archivo HTML principal (punto de entrada visual)
├── package-lock.json       # Registro exacto de versiones de dependencias
├── package.json            # Configuración del proyecto y scripts de npm
└── README.md               # Documentación general del proyecto


## Tecnologias utilizadas 
- JavaScript 
- HTML
- CSS3
- Node.js


# ejecutar el proyecto

para ejecutar el proyecto se recomienta: 
- utilizar Go Live en vsc 
- ejecutar directamente el archivo index.html 


# paso a paso de la generacion del reporte de cobertura 

1. ejecutar este comando para la instalacion de c8
   npm install --save-dev c8
2. Configurar package.json
    Abre tu package.json y agrega/modifica estas secciones:
JSON
{

  "scripts": {
    "test": "node tests/cart.test.js",
    "test:coverage": "c8 npm test",
    "test:coverage:html": "c8 --reporter=html npm test"
  },
  "devDependencies": {
    "c8": "^8.0.1"
  },
  "c8": {
    "include": ["js/**/*.js"],
    "exclude": ["tests/**", "coverage/**", "**/*.test.js"],
    "reporter": ["text", "html", "lcov"],
    "check-coverage": true,
    "lines": 90,
    "functions": 90,
    "branches": 80,
    "statements": 90
  }
}

3. ejecuta la cobertura 
ejecuta el comando en la terminal  npm run test:coverage

# reporte de cobertura 

 corriendo tests...

  ✅ debería devolver una matriz de 6 producto
  ✅ Debe tener productos con identificación, nombre y precio.
  ✅ Debería formatear 10.5 a moneda
  ✅ Debería devolver $0.00 por no válido
  ✅ Debería encontrar el producto 1
  ✅ debe truncar el texto largo

📊 Resultado: 6 paso, 0 fallo

-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------|---------|----------|---------|---------|-------------------
All files    |    83.1 |       90 |   57.14 |    83.1 |                  
 products.js |     100 |      100 |     100 |     100 |                  
 utils.js    |   71.59 |     87.5 |      50 |   71.59 | 35-43,64-72,81-87
-------------|---------|----------|---------|---------|-------------------

🛒 Carrito - Pruebas Unitarias

========================================

  ✅ deberia retornar array vacio inicialmente
  ✅ deberia agregar producto a carrito vacio
  ✅ deberia agregar cantidad especificada
  ✅ deberia incrementar cantidad si producto existe
  ✅ deberia agregar nuevo producto si ID diferente
  ✅ no deberia agregar producto invalido (null)
  ✅ no deberia agregar producto sin ID
  ✅ deberia eliminar producto existente
  ✅ deberia dejar carrito vacio si elimina unico item
  ✅ no deberia fallar si ID no existe
  ✅ deberia actualizar cantidad
  ✅ deberia eliminar si cantidad es 0
  ✅ deberia eliminar si cantidad negativa
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia calcular total de un item
  ✅ deberia calcular total de multiples items
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia contar cantidad total de items
  ✅ deberia contar correctamente despues de eliminar
  ✅ deberia vaciar el carrito
  ✅ flujo completo: agregar, actualizar, eliminar, totales

========================================
📊 Resultados: 21 pasadas, 0 fallidas
⏱️  Duración: 12.00ms
📈 Tasa de éxito: 100.0%
========================================

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |    87.5 |     100 |                  
 cart.js  |     100 |      100 |    87.5 |     100 |                  
----------|---------|----------|---------|---------|-------------------


# 