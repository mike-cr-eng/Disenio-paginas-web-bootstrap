/*
    ===========================================================
    index.js
    ===========================================================
    Este script se usa SOLO en Index.html.
    Necesita que productos.js este cargado ANTES en el HTML,
    porque usa la constante "productos" definida alla.

    Su trabajo es llenar dos secciones del Index:
    - "Productos Principales" (sin precio)
    - "Productos Destacados"  (con precio)
    ===========================================================
*/

/*
    Funcion normal (declarada con la palabra "function") que
    recibe un numero y devuelve el texto con el simbolo de
    colones y separadores de miles. Es la misma logica que
    formatearPrecio() en catalogo.js, pero con otro nombre
    ("formatearPrecioIndex") para que no choque si algun dia
    los dos archivos se cargan juntos en la misma pagina.
*/
function formatearPrecioIndex(precio)
{
    return "\u20A1" + precio.toLocaleString("es-CR");
}

/*
    Recibe un producto y un booleano "conPrecio" (true/false).
    Devuelve un elemento <article> ya armado.

    Que se use "article" y no "div" no es al azar: en el
    Index.html original las tarjetas ya estaban escritas como
    <article class="product-item">, asi que el script mantiene
    la misma etiqueta para no romper el CSS que ya existia.
*/
function crearTarjetaIndex(producto, conPrecio)
{
    const articulo = document.createElement("article");
    articulo.className = "product-item";

    /*
        Aqui el template literal usa OTRO operador ternario,
        pero esta vez adentro del HTML:

        ${ conPrecio ? `<p>...</p>` : "" }

        Si "conPrecio" es true, se inserta el parrafo con el
        precio. Si es false, se inserta un texto vacio "" (no
        se agrega nada). Asi, un mismo molde de tarjeta sirve
        tanto para "Productos Principales" (sin precio) como
        para "Productos Destacados" (con precio), solo cambiando
        este segundo parametro.

        Notar que la ruta de la imagen aqui NO lleva "../" al
        inicio, porque Index.html esta en la carpeta raiz del
        proyecto (no dentro de Paginas/).
    */
    articulo.innerHTML = `
        <img
            src="Multimedia/Img/${producto.imagen}"
            alt="${producto.nombreCorto}"
            width="300"
            height="300"
        />
        <h3>${producto.nombreCorto}</h3>
        ${conPrecio ? `<p>Precio: ${formatearPrecioIndex(producto.precio)}</p>` : ""}
    `;

    return articulo;
}

/*
    Funcion generica para llenar CUALQUIERA de las dos secciones
    del index. Recibe:
    - selector: el selector CSS del contenedor donde se van a
      meter las tarjetas (ejemplo: "#productos-principales
      .product-container")
    - listaProductos: el arreglo de productos ya filtrado
    - conPrecio: si hay que mostrar el precio o no
*/
function renderizarSeccionIndex(selector, listaProductos, conPrecio)
{
    const contenedor = document.querySelector(selector);
    if (!contenedor)
    {
        return;
    }

    contenedor.innerHTML = "";

    listaProductos.forEach((producto) =>
    {
        contenedor.appendChild(crearTarjetaIndex(producto, conPrecio));
    });
}

if (typeof productos !== "undefined")
{
    /*
        "filter()" es un metodo de los arreglos que crea un
        arreglo NUEVO, quedandose solo con los elementos para
        los que la funcion que le pasamos devuelve true.

        (producto) => producto.principal

        Esta funcion flecha recibe cada producto del arreglo y
        devuelve directamente el valor de su propiedad
        "principal" (true o false). Como filter() solo se queda
        con los que dan true, el resultado es un arreglo con
        UNICAMENTE los productos que tienen principal: true.

        Nota: el arreglo original "productos" NO se modifica.
        filter() siempre devuelve un arreglo aparte.
    */
    const productosPrincipales = productos.filter((producto) => producto.principal);
    const productosDestacados = productos.filter((producto) => producto.destacado);

    /*
        Aqui llamamos la funcion de renderizado dos veces: una
        para cada seccion del Index. El selector CSS combina el
        id de la seccion (agregado en el HTML) con la clase
        ".product-container" que ya existia adentro de cada
        seccion, para apuntar exactamente al div correcto.
    */
    renderizarSeccionIndex("#productos-principales .product-container", productosPrincipales, false);
    renderizarSeccionIndex("#productos-destacados .product-container", productosDestacados, true);
}
