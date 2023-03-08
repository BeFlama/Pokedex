let pokeCard = document.getElementById("pokeCard")
let pokeName = document.getElementById("pokeName")
let containerImg = document.getElementById("container_pokeImg")
let pokeImg = document.getElementById("pokeImg")
let pokeID = document.getElementById("pokeID")
let pokeTipo = document.getElementById("pokeTipo")
let pokeStats = document.getElementById("pokeStats")
let pokeLoader = document.getElementById("pokeballLoader")

const typeColors = {
    electric: '#F3D333',
    normal: '#AAA97D',
    fire: '#F07F2F',
    water: '#6F92F6',
    ice: '#98D8D8',
    rock: '#B7A038',
    flying: '#A890F0',
    grass: '#78C84F',
    psychic: '#F85888',
    ghost: '#705798',
    bug: '#A8B821',
    poison: '#A040A1',
    ground: '#E0C069',
    dragon: '#7038F9',
    steel: '#B8B8D0',
    fighting: '#C33029',
    default: '#EBEBEB',
}

const searchPoke = event => {
    event.preventDefault()
    const {value} = event.target.pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokeData(response))
}

const renderPokeData = data => {
    const sprite = data.sprites.front_default
    const { stats, types } = data
    pokeName.textContent = data.name
    pokeImg.setAttribute('src', sprite)
    pokeID.textContent = `N° ${data.id}`
    setCardColor(types)
    renderPokeTypes(types)
    renderPokeStats(stats)
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name]
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default
    pokeImg.style= `
    width: 15rem;
    border-style: inset;
    border-width: 10px;
    border-radius: 20%;
    border-color: ${colorOne} ${colorTwo};
    border-shadow: 2px 2px 5px;
    background-image: url(./assets/background.jpg);
    background-position: center;
    `
}

const renderPokeTypes = types => {
    pokeTipo.innerHTML = ''
    types.forEach(type => {
        const typeTextElement = document.createElement("div")
        typeTextElement.style.color = typeColors[type.type.name]
        typeTextElement.textContent = type.type.name
        pokeTipo.appendChild(typeTextElement)
    });
}

const renderPokeStats = stats => {
    pokeStats.innerHTML = ''
    stats.forEach(stat =>{
        const statElement = document.createElement("div")
        const statElementName = document.createElement("div")
        const statElementAmount = document.createElement("div")

        statElementName.textContent = stat.stat.name
        statElementAmount.textContent = stat.base_stat
        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)
    })
}

//eventos
/* setTimeout(()=>{
    pokeLoader.remove()
},1100) */