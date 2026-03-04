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

  ✅ deberia retornar array vacio
  ✅ deberia retornar un nuevo array cada vez
  ✅ deberia agregar producto a carrito vacio
  ✅ deberia agregar cantidad especificada
  ✅ deberia incrementar la cantidad si el producto existe
  ✅ deberia agregar nuevo producto si ID diferente
  ✅ NO deberia mutar carrito original (inmutable)
  ✅ deberia retornar mismo carrito si producto invalido
  ✅ deberia hacer copia profunda del producto
  ✅ deberia eliminar producto existente
  ✅ deberia retornar array vacio si elimina unico item
  ✅ deberia retornar mismo carrito si ID no existe
  ✅ NO deberia mutar carrito original
  ✅ deberia actualizar cantidad de producto
  ✅ deberia eliminar producto si cantidad es 0
  ✅ deberia eliminar producto si cantidad negativa
  ✅ deberia retornar mismo carrito si producto no existe
  ✅ NO deberia mutar carrito original
  ✅ deberia retornar 0 para carrito vacio
  ✅ deberia contar cantidad total de items
  ✅ deberia contar correctamente despues de eliminar
  ✅ deberia retornar array vacio
  ✅ deberia retornar nuevo array
  ✅ inmutabilidad garantizada en todo el flujo

========================================
📊 Resultados: 24 pasadas, 0 fallidas
⏱️  Duración: 5.00ms
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


