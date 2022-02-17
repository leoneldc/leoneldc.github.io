const pokemonAlAzar = document.querySelector(".img");
const contenedorLista = document.querySelector(".lista_pokemon");

const colors = {
  fire: "#FFA05D",
  grass: "#8FD594",
  electric: "#FFE43B",
  water: "#7E97C0",
  ground: "#CAAC4D",
  rock: "#90642D",
  poison: "#9D5B9B",
  bug: "#EAFD71",
  dragon: "#97b3e6",
  psychic: "#FF96B5",
  flying: "#CDCDCD",
  fighting: "#FF5D5D",
  normal: "#FFFFFF",
  fairy: "#F2AFF8",
  ice: "#4AEFFE",
  steel: "#F2D2F5",
  dark: "#6F6F6F",
  ghost: "#6F6F6F",
};
const colorsLetras = {
  fire: "#000000",
  grass: "#000000",
  electric: "#000000",
  water: "#FFFFFF",
  ground: "#000000",
  rock: "#FFFFFF",
  poison: "#FFFFFF",
  bug: "#000000",
  dragon: "#000000",
  psychic: "#FFFFFF",
  flying: "#000000",
  fighting: "#000000",
  normal: "#000000",
  fairy: "#000000",
  ice: "#000000",
  steel: "#000000",
  dark: "#FFFFFF",
  ghost: "#FFFFFF",
};
function generaciones(gen) {
  const pokemonGen = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [493, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 898],
    9: [10001, 10228],
  };
  const generacion = pokemonGen[gen];
  return generacion;
}
const main_types = Object.keys(colors);

async function listadoRandom() {
  const jsnCount = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await jsnCount.json();
  return data.count;
}
function randomPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=`;
  listadoRandom()
    .then(async function (data) {
      const jsn = await fetch(`${url}${data}`);
      const dataJsn = await jsn.json();
      const pokemons = dataJsn.results;
      const random = Math.floor(Math.random() * pokemons.length);
      var urlRandom = pokemons[random].url;
      return urlRandom;
    })
    .then(async function (response) {
      pokemonAlAzar.innerHTML = "";
      const p = document.createElement("div");
      const jsn = await fetch(`${response}`);
      const dataJsn = await jsn.json();
      const nombre = dataJsn.name.split("-").join(" ");
      const urlImg = dataJsn.sprites.front_default;
      const urlShiny = dataJsn.sprites.front_shiny;
      if (urlImg != null) {
        var divImgs = `<div class="imagenes"><img src="${urlImg}" alt="${nombre}">`;
        if (urlShiny != null) {
          divImgs += `<img src="${urlShiny}" alt="${nombre}"></div>`;
        } else {
          divImgs += `</div>`;
        }
        p.innerHTML += `${divImgs}<h4>${nombre.toUpperCase()}</h4>`;
        pokemonAlAzar.appendChild(p);
      } else {
        randomPokemon();
      }
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
async function cargarURLS(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  const respuesta = await fetch(url)
  const pokemonData = await respuesta.json();

  const divCarta = document.createElement("div");
  const divImagen = document.createElement("div");
  const divDatos = document.createElement("div");
  const divTipos = document.createElement("div");
  const divDescripcion = document.createElement("div");
  const divContenedor = document.createElement("div");
  
  divContenedor.classList.add("contenedor");
  divCarta.classList.add("carta");
  divImagen.classList.add("imagen");
  divDatos.classList.add("datos");
  divTipos.classList.add("tipos");
  divDescripcion.classList.add("descripcion");

  var id = ''
  var nombre = pokemonData.name.split("-").join(" ");
  var imagen = ""
  var tipo = ""
  var descripcion = ''
  var datosFormato = ''

  if (pokemonData.id < 10) id = `00${pokemonData.id}`;
  if (pokemonData.id > 9 && pokemonData.id < 100) id = `0${pokemonData.id}`;
  if (pokemonData.id > 99) id = `${pokemonData.id}`;
  
  pokemonData.types.map((types) => {
    tipo += `<span style="background-color: ${colors[types.type.name]}; color: ${colorsLetras[types.type.name]};">
    ${types.type.name}</span>`;
  
    datosFormato = `<div style="color: ${colorsLetras[types.type.name]};"  class="nombre">${nombre.toUpperCase()}</div>
                      <div class="id">${id}</div>`;
    divDescripcion.style.color = colorsLetras[types.type.name];
  })

  const poke_types = pokemonData.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  divCarta.style.backgroundColor = color;
  
  cargarDescripcion(pokemonData.species.url).then((data) => {
    descripcion= `<p>${data.split("\n").join(" ")}</p>`;
    divDescripcion.innerHTML = descripcion;
  });
  if (pokemonData.sprites.other.dream_world.front_default===null) {
    imagen = `<img src="${pokemonData.sprites.front_default}" alt="${nombre}" class="img_pokemon">`;
  }else{
    imagen = `<img src="${pokemonData.sprites.other.dream_world.front_default}" alt="${nombre}" class="img_pokemon">`;
  }

  divDatos.innerHTML = `${datosFormato}`;
  divTipos.innerHTML = `${tipo}`;
  divImagen.innerHTML = `${imagen}`;
  divContenedor.appendChild(divImagen);
  divContenedor.appendChild(divDatos);
  divContenedor.appendChild(divTipos);
  divContenedor.appendChild(divDescripcion);
  divCarta.appendChild(divContenedor);
  contenedorLista.appendChild(divCarta);
}
function indicarURL(generacion) {
  for (let id = generacion[0]; id <= generacion[1]; id++) {
    cargarURLS(id);
  }
}


let pokemonGeneration = generaciones(1);
randomPokemon();
indicarURL(pokemonGeneration);