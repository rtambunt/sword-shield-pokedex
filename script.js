'use strict';

const pokeContainer = document.getElementById('poke-container');
const numPokemon = 400; // 400 obtainable in the original Galar pokedex

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokedex/galar`; //
  const response = await fetch(url); // fetching data from url
  const pokedex = await response.json(); // produces js object from json file
  const pokeEntry = pokedex.pokemon_entries[id]; // pokemon.pokemon_entries[i] = desired pokemon (sword and shield exclusive pokemon)
  const pokeSpecies = pokeEntry.pokemon_species;
  const entryNum = pokeEntry.entry_number;

  const pokeUrl = pokeSpecies.url.replace('-species', '').slice(0, -1) + '/';
  const pokeResponse = await fetch(pokeUrl);
  const pokeInfo = await pokeResponse.json(); // Accesses info for one pokemon

  createPokemonCard(entryNum, pokeInfo);
};

const fetchPokemon = async () => {
  for (let i = 0; i < numPokemon; i++) {
    await getPokemon(i);
  }
};
fetchPokemon();

const createPokemonCard = function (entryNum, pokeInfo) {
  // Creating pokemon Element
  const pokemonEl = document.createElement(`div`);
  pokemonEl.classList.add(`pokemon`);

  const pokeName = pokeInfo.name[0].toUpperCase() + pokeInfo.name.slice(1);
  const pokeSprite = pokeInfo.sprites.front_default;

  const pokeInnerHTML = `
    <div class="pokemon__checkbox"></div>
    <div class="pokemon__img-container">
      <img src="${pokeSprite}"/> 
    </div> 
    <div class="pokemon__info">
      <span class="pokemon__info--number">No. ${String(entryNum).padStart(
        3,
        0
      )}</span> 
      <h2 class="pokemon__info--pokeName">${pokeName}<h2> 
    </div>`; // FIX ME Later!!

  pokemonEl.innerHTML = pokeInnerHTML;
  pokemonEl.addEventListener('click', function (e) {
    const checkbox = e.target;
    // Guard Clause
    if (!checkbox.classList.contains('pokemon__checkbox')) return;

    // Change background color
    if (checkbox.style.backgroundColor !== 'red')
      checkbox.style.backgroundColor = 'red';
    else checkbox.style.backgroundColor = 'rgb(212, 212, 212)';
  });
  pokeContainer.appendChild(pokemonEl);
};
