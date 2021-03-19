'use strict';

const pokeContainer = document.getElementById('poke-container');
const numPokemon = 400; // 400 obtainable in the original Galar pokedex

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokedex/galar/`;
  const response = await fetch(url); // fetching data from url
  const pokemon = await response.json(); // produces js object from json file
  // pokemon.pokemon_entries[i] = desired pokemon
  createPokemonCard(pokemon.pokemon_entries[id]);
};

const fetchPokemon = async () => {
  for (let i = 0; i < numPokemon; i++) {
    await getPokemon(i);
  }
};
fetchPokemon();

const createPokemonCard = function (pokemon) {
  const pokemonEl = document.createElement(`div`);
  pokemonEl.classList.add(`pokemon`);

  const pokemonName =
    pokemon.pokemon_species.name[0].toUpperCase() +
    pokemon.pokemon_species.name.slice(1);

  const pokeInnerHTML = `${pokemon.entry_number}. ${pokemonName}`;

  pokemonEl.innerHTML = pokeInnerHTML;
  pokeContainer.appendChild(pokemonEl);
};
