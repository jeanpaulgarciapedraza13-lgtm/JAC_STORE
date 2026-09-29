/* ==========================================================
   INVENTARIO — edita solo este archivo para manejar tu tienda
   ----------------------------------------------------------
   1. Guarda las fotos en la carpeta  images/productos/
   2. Copia un bloque { ... } y cambia sus datos
   3. stock: 0  → se muestra "Agotada" y no se puede comprar
   ========================================================== */

// Tu número de WhatsApp con indicativo, sin + ni espacios (Colombia = 57)
const WHATSAPP = "573009404793";

const PRODUCTS = [
  {
    id: "ja-01",
    numero: "01/10",
    nombre: "GodSpeed ",
    precio: 120000,
    imagenes: [
    "images/productos/Gspeed S.png",
    "images/productos/Respaldo S.png"
    ],
    descripcion: "Camiseta GodSpeed de 290 GSM en algodón, con detalles en pedrería y herrajes, y diseño exclusivo en frente y respaldo.",
    tallas: ["S"],
    stock: 1
  },
  {
    id: "ja-02",
    numero: "02/10",
    nombre: "GodSpeed ",
    precio: 120000,
    imagenes:[
     "images/productos/frente2.jpg",
     "images/productos/respaldo2.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["S"],
    stock: 1
  },
  {
    id: "ja-03",
    numero: "03/10",
    nombre: "Hellstar ",
    precio: 120000,
    imagenes:[
     "images/productos/frente3.jpg",
     "images/productos/respaldo3.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["M"],
    stock: 1
  },{
    id: "ja-04",
    numero: "04/10",
    nombre: "Hellstar ",
    precio: 120000,
    imagenes:[
     "images/productos/frente4.jpg",
     "images/productos/respaldo4.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["XL"],
    stock: 1
  },{
    id: "ja-05",
    numero: "05/10",
    nombre: "Hellstar",
    precio: 120000,
    imagenes:[
     "images/productos/frente5.png",
     "images/productos/respaldo5.png",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["L"],
    stock: 1
  },{
    id: "ja-06",
    numero: "06/10",
    nombre: "mixed emotion",
    precio: 120000,
    imagenes:[
     "images/productos/frente6.png",
     "images/productos/respaldo6.png",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["L"],
    stock: 1
  },{
    id: "ja-07",
    numero: "07/10",
    nombre: "Hellstar ",
    precio: 120000,
    imagenes:[
     "images/productos/frente7.jpg",
     "images/productos/respaldo7.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["M"],
    stock: 1
  },{
    id: "ja-08",
    numero: "08/10",
    nombre: "GodSpeed ",
    precio: 120000,
    imagenes:[
     "images/productos/frente8.jpg",
     "images/productos/respaldo8.jpeg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["XL"],
    stock: 1
  },{
    id: "ja-09",
    numero: "09/10",
    nombre: "GodSpeed ",
    precio: 120000,
    imagenes:[
     "images/productos/frente9.jpg",
     "images/productos/respaldo9.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["S"],
    stock: 1
  },{
    id: "ja-10",
    numero: "10/10",
    nombre: "Hellstar",
    precio: 120000,
    imagenes:[
     "images/productos/frente10.jpeg",
     "images/productos/respaldo10.jpg",
    ],
    descripcion: "Corte oversize, costura reforzada.",
    tallas: ["L"],
    stock: 1
  },
  // Copia y pega otro bloque aquí para agregar la pieza 05, 06...
];
