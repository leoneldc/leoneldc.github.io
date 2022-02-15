const pokemonAlAzar = document.querySelector(".img");
const listaPokemon = document.querySelector(".contenedor");
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
};
function generaciones(gen) {
  const pokemonGen = {
    1: [0, 151],
    2: [152, 251],
    3: [252, 386],
  };
  const generacion = pokemonGen[gen] ;
  return generacion;
}
var busquedaInicio = 1;
async function listadoRandom(){
  const jsnCount = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await jsnCount.json()
  return data.count
}
function randomPokemon(){ 
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
randomPokemon();

const main_types = Object.keys(colors);
async function listadoPokemon(inicio, fin){
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${inicio}&limit=${fin}`;
  const jsn = await fetch(`${url}`);
  const dataJsn = await jsn.json();
  const pokemons = dataJsn.results;
  return pokemons;
}
function mostrarListas(inicio, fin) {
  listadoPokemon(inicio,fin).then(function (data) {
    data.map(async function (pokemon) {
      const jsn = await fetch(`${pokemon.url}`);
      const dataJsn = await jsn.json();

      const carta = document.createElement("div");
      var id = '';
      if (dataJsn.id < 10) id=`00${dataJsn.id}`;
      if (dataJsn.id >9 && dataJsn.id < 100) id = `0${dataJsn.id}`;
      if (dataJsn.id >99) id = `${dataJsn.id}`;
	    const poke_types = dataJsn.types.map((type) => type.type.name);
      const type = main_types.find((type) => poke_types.indexOf(type) > -1);
      const color = colors[type];
      var nombre = dataJsn.name.split("-").join(" ");
      carta.setAttribute("class", "carta");
      carta.style.backgroundColor = color;
      var mostrarPokemon = `<div class="imagen"><img src="${dataJsn.sprites.front_default}" alt="${nombre}"></div>
                              <div class="identificador">
                                <div class="id">${id}</div>
                                <img src="assets/pokeball.svg" alt="pokeball">
                                <div class="nombre">${nombre}</div>
                              </div>`;
      carta.innerHTML = mostrarPokemon;        
      listaPokemon.appendChild(carta);
    });
  });
}
let pokemonGeneration = generaciones(1);
mostrarListas(pokemonGeneration[0], pokemonGeneration[1]);