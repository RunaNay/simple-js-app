
let pokemonList = [
    { name: 'Pikachu', height: 0.4 },
    { name: 'Bulbasor', height: 2.04 },
    { name: 'Wartortle', height: 3.03 },
    { name: 'Vulpix', height: 2.00 },
    { name: 'Metapod', height: 2.04 },
    { name: 'Kakuna', height: 2.00 },
    { name: 'Zubat', height: 2.07 },
    { name: 'Beedrill', height: 3.03 },
    { name: 'Nidorina', height: 2.07 },
    { name: 'Venomoth', height: 4.11 }
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 4) {
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height + ') Wow, that is huge!</p>');
    } else {
        document.write('<p>' + pokemonList[i].name + ' (height:' + pokemonList[i].height + ')</p>');
    }
}
