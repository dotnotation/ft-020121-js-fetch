function renderAllPokemon(pokemonArray) {
    return pokemonArray.map(renderPokemon).join('')
}
  
function renderPokemon(pokemon) {
    return (
        `<div class="pokemon-card">
            <div class="pokemon-frame">
                <h1 class="center-text">${pokemon.name}</h1>
                <div class="pokemon-image">
                    <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
                </div>
                <button data-action="delete" class="pokemon-delete-button">Delete</button><br>
                <form class="pokemon-update"><input type="text"><input type="submit"></form>
            </div>
        </div>`
    )
}