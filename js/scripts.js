var pokemonRepository = (function() {
    var pokemonList = [
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
    ];

    return {
        getAll: function() {
            return pokemonList;
        },
        add: function(item) {
            pokemonList.push(item);
        }
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 4) {
        document.write('<p>' + pokemon.name + ' (height:' + pokemon.height + ') Wow, das ist riesig!</p>');
    } else {
        document.write('<p>' + pokemon.name + ' (height:' + pokemon.height + ')</p>');
    }
});
