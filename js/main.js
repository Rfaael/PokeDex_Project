
async function getResponse(){

    for (let i = 1; i <= 150; i++) {
            try{
                const response = await main.fetchPokemons(i);
                const data = await response.json();

                main.Pokemons[i] = data;
            }catch(err) {
                console.log(err)
            }; 
    }; 

    main.generateLiPokemons();
};

let main = {
    Pokemons: new Array(150),
    fetchPokemons(_id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${_id}`);
    },
    generateLiPokemons() {
            const liPokemons = main.Pokemons.reduce((acumulator, pokemon) => {
                const pokeTypes = pokemon.types.map((typesInfo) => typesInfo.type.name);
                acumulator += `
                    <li class="card  ${pokeTypes[0]}" >
                        <img 
                            class =" card-image" 
                            alt="${pokemon.name}" 
                            src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" 
                        />
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p>${pokeTypes.join(" | ")}</p>
                    </li>`;
                
                return acumulator;
            }, '');
    
        const ul = document.querySelector(".pokedex");
        
        ul.innerHTML += liPokemons;
    },
};
console.log(main.Pokemons)

getResponse();
