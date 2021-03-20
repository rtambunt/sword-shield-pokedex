'use strict';

const pokeContainer = document.getElementById('poke-container');
const numPokemon = 400; // 400 obtainable in the original Galar pokedex

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokedex/galar`; //
  const response = await fetch(url); // fetching data from url
  const pokedex = await response.json(); // produces js object from json file
  const pokeEntry = pokedex.pokemon_entries[id]; // pokemon.pokemon_entries[i] = desired pokemon (sword and shield exclusive pokemon)
  const pokeSpecies = pokeEntry.pokemon_species;
  // let pokeName = pokeSpecies.name;

  // if (pokeName === 'zacian' || pokeName === 'zamazenta') {
  //   pokeName = pokeName + '-hero';
  // }

  // const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  const pokeUrl = pokeSpecies.url.replace('-species', '').slice(0, -1);
  console.log(pokeUrl);
  const pokeResponse = await fetch(pokeUrl);
  const pokeInfo = await pokeResponse.json(); // Accesses info for one pokemon
  const pokeSprite = pokeInfo.sprites;

  createPokemonCard(pokeSpecies);
};

const fetchPokemon = async () => {
  for (let i = 0; i < numPokemon; i++) {
    await getPokemon(i);
  }
};
fetchPokemon();

const createPokemonCard = function (pokeSpecies) {
  const pokemonEl = document.createElement(`div`);
  pokemonEl.classList.add(`pokemon`);

  const pokeName =
    pokeSpecies.name[0].toUpperCase() + pokeSpecies.name.slice(1);

  const pokeInnerHTML = `<div class="img-container">
  <img src="">
  </div>${pokeName}`;

  pokemonEl.innerHTML = pokeInnerHTML;
  pokeContainer.appendChild(pokemonEl);
};
