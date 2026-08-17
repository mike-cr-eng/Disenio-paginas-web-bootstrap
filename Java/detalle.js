/*
    ===========================================================
    detalle.js
    ===========================================================
    Este script se usa SOLO en Detalle_Producto.html.
    Necesita que productos.js este cargado ANTES en el HTML,
    porque usa la constante "productos" definida alla.

    Su trabajo es leer CUAL producto hay que mostrar (a partir
    de la URL de la pagina) y llenar el HTML con sus datos.
    ===========================================================
*/

/*
    Igual que en catalogo.js/index.js, pero agregando al final
    el texto "I.V.A.I" porque asi se mostraba el precio en la
    version original de esta pagina de detalle.
*/
function formatearPrecioDetalle(precio)
{
    return "\u20A1" + precio.toLocaleString("es-CR") + " I.V.A.I";
}

/*
    Cuando el usuario hace clic en una tarjeta del catalogo, el
    link lo manda a una URL como esta:

        Detalle_Producto.html?id=sauvage

    Todo lo que va despues del "?" se llama QUERY STRING
    (cadena de consulta): son parametros que viajan pegados a
    la URL. "URLSearchParams" es un objeto que sabe leer ese
    texto y separarlo en pares clave/valor.

    "window.location.search" es la parte de la URL actual que
    empieza en el "?" (en el ejemplo de arriba, seria
    "?id=sauvage").

    "parametros.get('id')" busca el parametro llamado "id" y
    devuelve su valor como texto (en el ejemplo, "sauvage"). Si
    no existe ese parametro en la URL, devuelve null.
*/
function obtenerIdDesdeUrl()
{
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("id");
}

/*
    Crea UNA imagen de miniatura para la galeria. Recibe el
    nombre del archivo y su posicion dentro del arreglo
    (indice), que se usa solo para armar un texto alternativo
    (alt) distinto para cada miniatura ("Miniatura 1...",
    "Miniatura 2...", etc). Los indices de un arreglo empiezan
    en 0, por eso se le suma 1 al mostrarlo.
*/
function crearMiniatura(nombreArchivo, indice)
{
    const miniatura = document.createElement("img");

    /*
        A diferencia de innerHTML (que reemplaza TODO el
        contenido de un elemento con texto/HTML), aqui vamos
        asignando cada propiedad del elemento por separado:
        .src, .alt, .width, .height, .className. Esto es mas
        indicado cuando el elemento es simple (una sola imagen)
        y no necesita HTML anidado adentro.
    */
    miniatura.src = "../Multimedia/Img/" + nombreArchivo;
    miniatura.alt = "Miniatura " + (indice + 1) + " del producto";
    miniatura.width = 100;
    miniatura.height = 100;
    miniatura.className = "gallery-thumbnail";

    return miniatura;
}

/*
    Funcion principal de este archivo: junta todo lo anterior.
    No recibe parametros porque toma los datos directamente de
    la URL y del arreglo "productos".
*/
function renderizarDetalle()
{
    /*
        Doble proteccion antes de seguir:
        1. Que "productos" exista (que productos.js si se haya
           cargado).
        2. Que el arreglo no este vacio (productos.length es la
           cantidad de elementos que tiene el arreglo).

        El operador "||" (OR / "o") significa: si la condicion
        de la izquierda es true, ya no revisa la derecha. Aqui
        se usa dentro de un if con dos condiciones separadas
        por "||" en la linea de abajo... en este caso se usan
        dos condiciones dentro del if separadas por "||", que
        se cumple si CUALQUIERA de las dos es verdadera.
    */
    if (typeof productos === "undefined" || productos.length === 0)
    {
        return;
    }

    const id = obtenerIdDesdeUrl();

    /*
        "find()" es un metodo de los arreglos parecido a
        filter(), pero en vez de devolver TODOS los elementos
        que cumplen la condicion, devuelve SOLO EL PRIMERO que
        la cumple (y para de buscar ahi). Si ninguno la cumple,
        devuelve "undefined" (nada).

        (item) => item.id === id

        Esta funcion flecha compara el id de cada producto con
        el id que vino en la URL. "===" es el operador de
        IGUALDAD ESTRICTA: compara tanto el valor como el tipo
        de dato, sin hacer conversiones automaticas raras (por
        eso se prefiere sobre "==").

        El "||" al final es un RESPALDO: si find() no encontro
        nada (por ejemplo porque la URL no traia id, o traia un
        id que no existe), en vez de quedarnos sin producto,
        usamos "productos[0]" (el primer producto del arreglo)
        para que la pagina nunca se quede vacia.
    */
    const producto = productos.find((item) => item.id === id) || productos[0];

    /*
        Buscamos todos los elementos del HTML que vamos a
        llenar. Estos ids se agregaron a mano en
        Detalle_Producto.html junto a este cambio.
    */
    const breadcrumb = document.querySelector("#breadcrumb-producto");
    const nombre = document.querySelector("#nombre-producto");
    const precio = document.querySelector("#precio-producto");
    const perfilUso = document.querySelector("#perfil-uso-producto");
    const descripcion = document.querySelector("#descripcion-producto");
    const imagenPrincipal = document.querySelector("#imagen-principal-producto");
    const galeria = document.querySelector("#galeria-producto");

    /*
        Cada linea revisa primero que el elemento exista (con
        el "if" corto de una sola linea) antes de intentar
        cambiar su texto, para que el script no se rompa si en
        algun momento se borra alguno de estos ids del HTML por
        error.
    */
    if (breadcrumb) breadcrumb.textContent = producto.nombreCorto;
    if (nombre) nombre.textContent = producto.nombreCompleto;
    if (precio) precio.textContent = formatearPrecioDetalle(producto.precio);
    if (perfilUso) perfilUso.textContent = "Perfil de uso: " + producto.perfilUso;
    if (descripcion) descripcion.textContent = producto.descripcion;

    if (imagenPrincipal)
    {
        imagenPrincipal.src = "../Multimedia/Img/" + producto.imagen;
        imagenPrincipal.alt = "Imagen principal de " + producto.nombreCorto;
    }

    if (galeria)
    {
        /*
            Vaciamos la galeria antes de llenarla, para borrar
            las miniaturas fijas que traia el HTML original
            (las de "Sauvage") antes de meter las del producto
            que corresponda.
        */
        galeria.innerHTML = "";

        /*
            "forEach" con DOS parametros: el primero es el
            elemento actual del arreglo (archivo), el segundo
            es la posicion en la que va (indice). JavaScript
            se lo entrega automaticamente en ese orden.
        */
        producto.galeria.forEach((archivo, indice) =>
        {
            galeria.appendChild(crearMiniatura(archivo, indice));
        });
    }
}

/*
    A diferencia de catalogo.js e index.js, aqui NO se envuelve
    la llamada en un "if (typeof productos !== 'undefined')"
    porque esa misma comprobacion ya se hizo DENTRO de
    renderizarDetalle(), como primera linea de la funcion.
*/
renderizarDetalle();
