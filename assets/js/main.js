const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 5
let offset = 0

const maxRecords = 151

const OpenModal = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            detail = new PokemonModal
            const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
            const [mainType] = types

            const abilities = pokemon.abilities.map((abilit) => abilit.ability.name)
            const stats = pokemon.stats.map((stats) => [stats.stat.name, stats.base_stat])

            detail.number = pokemon.id
            detail.name = pokemon.name
            detail.types = types
            detail.mainType = mainType
            detail.photo = pokemon.sprites.other.dream_world.front_default
            detail.abilities = abilities
            detail.stats = stats

            return detail
        })
        .then(console.log)
}

function loadPokemoItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(pokemons => {
        const newHtml = pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                    </ol>
    
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}"
                        onclick="OpenModal(${pokemon.number})">
                </div>
            </li>
        `).join("")
        pokemonList.innerHTML += newHtml
    })
}

loadPokemoItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemoItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemoItens(offset, limit)
    }
})