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

## estructura del proyecto 

nombre-del-proyecto/
││
├── js/
│   ├── app.js              # Punto de entrada y manejo del DOM/eventos
│   ├── products.js         # Definición de productos o lógica de negocio
│   └── utils.js            # Funciones auxiliares y herramientas
│
├── node_modules/           # Dependencias instaladas vía npm (omitido en Git)
│
├── styles/
│   └── styles.css          # Hojas de estilo CSS del proyecto
│
├── tests/
│   └── products.test.js    # Pruebas unitarias para la lógica de productos
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


