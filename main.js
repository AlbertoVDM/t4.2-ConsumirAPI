let paginaActual = 1; // Página actual


async function listarPersonajes(pagina) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los personajes:", error);
    }
}

async function mostrarPersonajes() {
    const data = await listarPersonajes(paginaActual);

    // Limpiar el contenido anterior
    document.querySelector("main").innerHTML = "";

    data.results.forEach(personaje => {
        const article = document.createRange().createContextualFragment(`
        <article>
          <div class="image-container">
            <img id="foto" src="${personaje.image}">
          </div>
          <h2 id="nombre">${personaje.name}</h2>
          <h5 id="estado">${personaje.status}</h5>
        </article>
      `);

        const main = document.querySelector("main");
        main.append(article);
    });
}

// Mostrar los personajes al cargar la página
mostrarPersonajes();


/* funciones de los botones para aumentar o disminuir el numero de pagina de personajes*/
async function siguiente() {
    if (paginaActual < 42) {
        paginaActual++;
        try {
            await mostrarPersonajes();
        } catch {
            console.error("Error al obtener los personajes:");
        }
    } else {
        alert("No hay mas paginas para mostrar");
    }
}

async function anterior() {
    if (paginaActual > 1) {
        paginaActual--;
        try {
            await mostrarPersonajes();
        } catch {
            console.error("Error al obtener los personajes:");
        }
    } else {
        alert("No hay mas paginas anteriores");
    }
};