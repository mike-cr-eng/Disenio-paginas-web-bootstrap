/*
    ===========================================================
    productos.js
    ===========================================================
    Este archivo NO hace nada por si solo (no dibuja nada en
    pantalla). Es una BASE DE DATOS escrita a mano: guarda toda
    la informacion de los productos en un solo lugar.

    Los demas archivos (catalogo.js, index.js, detalle.js) leen
    esta informacion y la usan para "dibujar" el HTML. Por eso
    este script se debe cargar SIEMPRE primero en el HTML, con
    una etiqueta <script> antes que los otros.

    Como agregar un producto nuevo:
    1. Copiar un objeto completo (desde la { hasta la }).
    2. Pegarlo antes del corchete final "];".
    3. Cambiar los valores.
    4. Poner una coma "," despues de la "}" anterior.
    ===========================================================
*/

/*
    "const" crea una CONSTANTE: una variable cuyo contenido no
    se puede reemplazar por otro despues de creada. No podemos
    escribir despues "productos = otraCosa;", eso daria error.
    Si pudieramos volver a asignarle un valor distinto usariamos
    "let" en vez de "const".

    "productos" es un ARREGLO (array): una lista ordenada de
    valores, escrita entre corchetes [ ]. Cada elemento de la
    lista, separado por comas, es un OBJETO: un valor compuesto
    por varios pares "propiedad: valor", escrito entre llaves { }.

    Aunque "productos" es const, SI podemos modificar lo que hay
    ADENTRO del arreglo (agregar objetos, cambiar una propiedad
    de un objeto, etc). "const" solo impide reemplazar la
    variable completa por otra cosa.
*/
const productos = [
  {
    /*
            Cada propiedad es un par "nombre: valor".
            Los valores entre comillas ("...") son TEXTO (string).
            Los valores sin comillas (como 100000) son NUMEROS.
            Los valores true/false son BOOLEANOS (si/no).
            Los valores entre corchetes [ ] son otro arreglo,
            en este caso un arreglo de textos (nombres de archivo).
        */

    /* id: identificador UNICO del producto. Se usa en la */
    /* URL de la pagina de detalle:                       */
    /* Detalle_Producto.html?id=sauvage                   */
    id: "sauvage",

    /* marca y tipo: se usan para los filtros del catalogo */
    marca: "dior",
    tipo: "colonias",

    /* nombreCorto: el que se ve en las tarjetas (catalogo */
    /* e index)                                            */
    nombreCorto: "Dior Sauvage",

    /* nombreCompleto: el que se ve en el titulo grande de */
    /* la pagina de detalle                                */
    nombreCompleto: "Sauvage Eau de Toilette, de Christian Dior",

    /* precio: siempre como NUMERO puro, sin simbolo de    */
    /* colones ni puntos ni comas. El simbolo se agrega    */
    /* despues con codigo (funcion formatearPrecio)        */
    precio: 100000,

    /* imagen: SOLO el nombre del archivo. El archivo debe */
    /* existir dentro de la carpeta Multimedia/Img/. La    */
    /* ruta completa la arma cada script segun la pagina   */
    imagen: "Sauvage.png",

    /* galeria: arreglo con los nombres de las miniaturas  */
    /* que se ven en la pagina de detalle. Puede quedar    */
    /* vacio: []                                           */
    galeria: ["Sauvage 2.jpg", "Sauvage 3.png"],

    /* perfilUso y descripcion: textos largos que se ven   */
    /* en la pagina de detalle                             */
    perfilUso:
      "Pensada para hombres libres, modernos y decididos, es ideal para uso diario durante todo el ano, con buena duracion y una estela reconocible. Es uno de los perfumes masculinos mas vendidos del mundo, aunque genera opiniones divididas: para muchos es un clasico todo terreno, mientras que otros lo consideran demasiado simple frente a otras creaciones de Dior.",
    descripcion:
      "La fuerte rafaga citrica de Sauvage Eau de Toilette esta potentemente anclada por la nobleza ambarina del ambroxan, el elemi resinoso y las maderas. La fragancia se presenta como radicalmente fresca, cruda y noble a la vez, con una composicion donde predominan ingredientes naturales cuidadosamente seleccionados.",

    /* principal: si es true, el producto aparece en el    */
    /* Index, seccion "Productos Principales" (sin precio) */
    principal: false,

    /* destacado: si es true, el producto aparece en el    */
    /* Index, seccion "Productos Destacados" (con precio)  */
    /* Un producto puede tener las dos en true, las dos en */
    /* false, o solo una                                   */
    destacado: false,
  },
  {
    id: "valentino-uomo",
    marca: "valentino",
    tipo: "colonias",
    nombreCorto: "Valentino UOMO",
    nombreCompleto: "Valentino UOMO Eau de Toilette",
    precio: 30000,
    imagen: "Valentino.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: true,
    destacado: false,
  },
  {
    id: "club-de-nuit",
    marca: "armaf",
    tipo: "colonias",
    nombreCorto: "Club de Nuit",
    nombreCompleto: "Club de Nuit Intense, de Armaf",
    precio: 25000,
    imagen: "Club de nuit.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: false,
    destacado: true,
  },
  {
    id: "9pm-black",
    marca: "nueve-pm",
    tipo: "colonias",
    nombreCorto: "9pm Black",
    nombreCompleto: "9pm Black, de Afnan",
    precio: 15000,
    imagen: "9pm black.png",
    galeria: ["9pm black.jpeg"],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: true,
    destacado: false,
  },
  {
    id: "versace-eros",
    marca: "versace",
    tipo: "colonias",
    nombreCorto: "Versace Eros",
    nombreCompleto: "Eros Eau de Toilette, de Versace",
    precio: 20000,
    imagen: "Versace.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: false,
    destacado: false,
  },
  {
    id: "khamrah-lattafa",
    marca: "lattafa",
    tipo: "elixires",
    nombreCorto: "Khamrah Lattafa",
    nombreCompleto: "Khamrah Eau de Parfum, de Lattafa",
    precio: 22000,
    imagen: "Khamrah.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: true,
    destacado: false,
  },
  {
    id: "hawas",
    marca: "lattafa",
    tipo: "colonias",
    nombreCorto: "Hawas",
    nombreCompleto: "Hawas Eau de Parfum, de Rasasi",
    precio: 15000,
    imagen: "Hawas.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: false,
    destacado: true,
  },
  {
    id: "odyssey",
    marca: "el-ganso",
    tipo: "colonias",
    nombreCorto: "Odyssey",
    nombreCompleto: "Odyssey Eau de Parfum",
    precio: 30000,
    imagen: "Odyssey.png",
    galeria: ["Odyssey.jpeg"],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: false,
    destacado: true,
  },
  {
    id: "valentino-uomo",
    marca: "valentino",
    tipo: "colonias",
    nombreCorto: "Valentino UOMO",
    nombreCompleto: "Valentino UOMO Eau de Toilette",
    precio: 30000,
    imagen: "Valentino.png",
    galeria: [],
    perfilUso: "Pendiente de agregar la descripcion real del vendedor.",
    descripcion: "Pendiente de agregar la descripcion real del vendedor.",
    principal: true,
    destacado: false,
  },
];
