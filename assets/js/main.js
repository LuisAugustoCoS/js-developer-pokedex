const pokemonList = document.getElementById('pokemonList');
const loadmore = document.getElementById('loadMore');
const pokePrincipal = document.getElementById('pokemon-principal');
const limit = 3;
const maxRecords = 151;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newhtml = pokemons
      .map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
      `)
      .join('');
    pokemonList.insertAdjacentHTML('beforeend', newhtml);
  });
}

loadPokemonItems(offset, limit);

loadmore.addEventListener('click', () => {
  offset += limit;
  const qtdRecord = offset + limit;
  if (qtdRecord >= maxRecords) {
    const newLimit = qtdRecord - maxRecords;
    loadmore.parentElement.removeChild(loadmore);
    loadPokemonItems(offset, newLimit);
  } else {
    loadPokemonItems(offset, limit);
  }
});
