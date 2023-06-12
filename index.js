const pokemonNumberInput = document.getElementById("pokemonNumber");
const fetchButton = document.getElementById("fetchButton");
const pokemonContainer = document.getElementById("pokemonContainer");

const fetchPokemon = async (number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const renderPokemonCard = (pokemon) => {
  if (!pokemon) {
    pokemonContainer.innerHTML = `<p class="error">No se encontró ningún Pokémon</p>`;
    return;
  }

  const { name, types, height, weight, sprites } = pokemon;
  const typeNames = types.map((type) => type.type.name).join(",");
  const heightInMeters = height / 10;
  const weightInKilograms = weight / 10;

  const cardHTML = `
    <div class="card">
      <h3>${name}</h3>
      <p><strong>Tipo:</strong> ${typeNames}</p>
      <p><strong>Altura:</strong> ${heightInMeters} metros</p>
      <p><strong>Peso:</strong> ${weightInKilograms} kilogramos</p>
      <img src="${sprites.front_default}" alt="${name}">
    </div>
  `;
  pokemonContainer.innerHTML = cardHTML;
};

fetchButton.addEventListener("click", async () => {
  const pokemonNumber = pokemonNumberInput.value.trim();
  if (!pokemonNumber) {
    pokemonContainer.innerHTML = `<p class="error">Ingrese un número válido</p>`;
    return;
  }

  const pokemon = await fetchPokemon(pokemonNumber);
  renderPokemonCard(pokemon);
});