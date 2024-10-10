const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Inserta el modal directamente en el documento desde el JavaScript


const modalHTML = `
<div id="imageModal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content-wrapper">
        <img class="modal-content" id="modalImage">
        <p>Mi nombre es</p>
        <h2 id="modalPokemonName"></h2>
    </div>
    <div id="caption"></div>
</div>`;


document.body.insertAdjacentHTML('beforeend', modalHTML); // Agregar el modal al final del body

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="" />
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-stats">
                <p class="stast">Altura: ${poke.height}mt</p>
                <p class="stast">Peso: ${poke.weight}kg</p>
            </div>
        </div>`;

    listaPokemon.append(div);

    // Agregar evento de clic en la imagen para abrir el modal
    const pokeImage = div.querySelector(".pokemon-imagen img");
    pokeImage.addEventListener("click", () => abrirModal(pokeImage, poke.name));
}

// Función para abrir el modal
function abrirModal(imageElement, pokemonName) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalPokemonName = document.getElementById("modalPokemonName");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imageElement.src;
    modalPokemonName.textContent = pokemonName; // Mostrar el nombre del Pokémon en el modal
    captionText.innerHTML = imageElement.alt;

    // Cerrar el modal al hacer clic en la "X"
    const closeBtn = document.querySelector(".close");
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
}

// Cerrar el modal al hacer clic fuera de la imagen
window.onclick = function (event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId ==="ver-todos"){
                    mostrarPokemon(data)
                }

                else{
                    const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);

                }
                }
                   
            })
        }
            

    
}))