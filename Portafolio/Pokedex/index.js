const contenedorPokemon = document.querySelector(".pokemon");
const button = document.getElementById("btnBuscar");
const parametro = document.getElementById("parametro");

const colors = {
  normal: "#FFFFFF",
  fire: "#FFA05D",
  water: "#7E97C0",
  grass: "#8FD594",
  bug: "#D4F2B9",
  electric: "#FFE43B",
  ice: "#4AEFFE",
  fighting: "#FF5D5D",
  poison: "#9D5B9B",
  ground: "#CAAC4D",
  flying: "#CDCDCD",
  psychic: "#FF96B5",
  rock: "#90642D",
  ghost: "#6F6F6F",
  dragon: "#97b3e6",
  dark: "#6F6F6F",
  steel: "#F2D2F5",
  fairy: "#F2AFF8",
};
const colorsLetras = {
  normal: "#000000",
  fire: "#000000",
  water: "#FFFFFF",
  grass: "#000000",
  electric: "#000000",
  ice: "#000000",
  fighting: "#000000",
  poison: "#FFFFFF",
  ground: "#000000",
  flying: "#000000",
  psychic: "#000000",
  bug: "#000000",
  rock: "#FFFFFF",
  ghost: "#FFFFFF",
  dragon: "#000000",
  dark: "#FFFFFF",
  steel: "#000000",
  fairy: "#000000",
};
const main_types = Object.keys(colors);

button.onclick = async function() {
    contenedorPokemon.innerHTML = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${parametro.value}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokedata) {
            const divCarta = document.createElement("div");
            const divImagen = document.createElement("div");
            const divInformacion = document.createElement("div");
            const divDatos = document.createElement("div");
            const divNombre = document.createElement("div");
            const divId = document.createElement("div");
            const divTipo = document.createElement("div");
            const divDescripcion = document.createElement("div");
            const divStats = document.createElement("div");

            divCarta.classList.add("carta");
            divImagen.classList.add("poke-imagen");
            divInformacion.classList.add("informacion");
            divDatos.classList.add("poke-datos");
            divNombre.classList.add("nombre");
            divId.classList.add("id");
            divTipo.classList.add("poke-tipos");
            divDescripcion.classList.add("poke-descripcion");
            divStats.classList.add("poke-stats");

            let nombre = `${pokedata.name.split("-").join(" ")}`;
            let id='';
            let imagen='';
            let tipo='';

            if (pokedata.sprites.other.dream_world.front_default !== null) {
              imagen = `<img src="${pokedata.sprites.other.dream_world.front_default}" alt="${nombre}" class="img_pokemon">`;
            } else if (pokedata.sprites.front_default !== null) {
              imagen = `<img src="${pokedata.sprites.front_default}" alt="${nombre}" class="img_pokemon">`;
            }

            if (pokedata.id < 10) id = `00${pokedata.id}`;
            if (pokedata.id > 9 && pokedata.id < 100) id = `0${pokedata.id}`;
            if (pokedata.id > 99) id = `${pokedata.id}`;

            const poke_types = pokedata.types.map((type) => type.type.name);
            const type = main_types.find((type) => poke_types.indexOf(type) > -1);

            pokedata.types.map((types) => {
                tipo += `<div class="tipo" style="background-color: ${colors[types.type.name]}; 
                color: ${colorsLetras[types.type.name]}; border: 2px solid ${colorsLetras[types.type.name]}; 
                box-shadow: 0 0 5px ${colorsLetras[type]};";>${types.type.name}</div>`;
            });
            

            divCarta.style.backgroundColor = colors[type];
            divNombre.style.backgroundColor = colors[type];
            divId.style.backgroundColor = colors[type];
            divNombre.style.color = colorsLetras[type];
            divId.style.color = colorsLetras[type];
            divNombre.style.border = `2px solid ${colorsLetras[type]}`;
            divId.style.border = `2px solid ${colorsLetras[type]}`;
            divNombre.style.boxShadow = `0 0 10px ${colorsLetras[type]}`;
            divId.style.boxShadow = `0 0 10px ${colorsLetras[type]}`;
            divDescripcion.style.color = colorsLetras[type];

            cargarDescripcion(pokedata.species.url).then((descripcion) => {
                divDescripcion.innerHTML = descripcion.split("\n").join(" ");
            });

            let randomVida = Math.floor(Math.random() * pokedata.stats[0].base_stat+1);
            let randomAtaque = Math.floor(Math.random() * pokedata.stats[1].base_stat+1);
            let randomDefensa = Math.floor(Math.random() * pokedata.stats[2].base_stat+1);
            let randomVelocidad = Math.floor(Math.random() * pokedata.stats[3].base_stat+1);
            let randomAtaqueEspecial = Math.floor(Math.random() * pokedata.stats[4].base_stat+1);
            let randomDefensaEspecial = Math.floor(Math.random() * pokedata.stats[5].base_stat+1);
            
            let stats = `<div class="grupoStats"><div class="stats"><p class="titulo-stat">VIDA:</p><p class="valor-stat">${randomVida} HP</p></div><progress max="250"  value="${randomVida}"></progress></div>
            <div class="grupoStats"><div class="stats"><p class="titulo-stat">ATAQUE:</p><p class="valor-stat">${randomAtaque} PA</p></div><progress max="150"  value="${randomAtaque}"></progress></div>
            <div class="grupoStats"><div class="stats"><p class="titulo-stat">DEFENSA:</p><p class="valor-stat">${randomDefensa} PD</p></div><progress max="250"  value="${randomDefensa}"></progress></div>
            <div class="grupoStats"><div class="stats"><p class="titulo-stat">VELOCIDAD:</p><p class="valor-stat">${randomVelocidad} PV</p></div><progress max="200"  value="${randomVelocidad}"></progress></div>
            <div class="grupoStats"><div class="stats"><p class="titulo-stat">ATAQUE ESP:</p><p class="valor-stat">${randomAtaqueEspecial} SPA</p></div><progress max="150"  value="${randomAtaqueEspecial}"></progress></div>
            <div class="grupoStats"><div class="stats"><p class="titulo-stat">DEFENSA ESP:</p><p class="valor-stat">${randomDefensaEspecial} SPD</p></div><progress max="200"  value="${randomDefensaEspecial}"></progress></div>`;
            divStats.style.color = colorsLetras[type];

            divImagen.innerHTML = `${imagen}`;
            divNombre.innerHTML = `${nombre.toUpperCase()}`;
            divId.innerHTML = `${id}`;
            divTipo.innerHTML = `${tipo}`;
            divStats.innerHTML = `${stats}`;
            divDatos.appendChild(divNombre);
            divDatos.appendChild(divId);
            divInformacion.appendChild(divDatos);
            divInformacion.appendChild(divTipo);
            divInformacion.appendChild(divDescripcion);
            divInformacion.appendChild(divStats);
            divCarta.appendChild(divImagen);
            divCarta.appendChild(divInformacion);
            contenedorPokemon.appendChild(divCarta);

        })
        .catch(function(error) {
            console.log(error);
        });
}


async function cargarDescripcion(url) {
  const respuesta = await fetch(url);
  const pokemonData = await respuesta.json();
  var descripciones = []
  pokemonData.flavor_text_entries.map((descripcion) => {
    if (descripcion.language.name == "es") {
      descripciones.push(descripcion.flavor_text);
    }
  });
  return descripciones[Math.floor(Math.random() * descripciones.length)];
}