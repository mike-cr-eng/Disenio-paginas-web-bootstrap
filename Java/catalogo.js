const botonFiltros = document.querySelector("#abrir-filtros");
const panelFiltros = document.querySelector("#panel-filtros");

if (botonFiltros && panelFiltros) {
  botonFiltros.addEventListener("click", () => {
    const visible = panelFiltros.classList.toggle("visible");
    botonFiltros.setAttribute("aria-expanded", String(visible));

    const texto = botonFiltros.querySelector("span");
    if (texto) {
      texto.textContent = visible ? "Ocultar filtros" : "Mostrar filtros";
    }
  });
}
