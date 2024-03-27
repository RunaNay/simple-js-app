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
        },
        addListItem: function(pokemon) {
            // Create a new list item element
            var listItem = document.createElement('li');

            // Create a button element with the Pokémon's name
            var button = document.createElement('button');
            button.innerText = pokemon.name;

            // Add a class to the button
            button.classList.add('pokemon-button');

            // Append the button to the list item
            listItem.appendChild(button);

            // Append the list item to the unordered list
            var pokemonListElement = document.querySelector('.pokemon-list');
            pokemonListElement.appendChild(listItem);

            // Add event listener to the button
            button.addEventListener('click', function() {
                showDetails(pokemon);
            });
        }
    };
})();

function showDetails(pokemon) {
    console.log(pokemon);
}

pokemonRepository.getAll().forEach(function(pokemon) {
    // Call the addListItem function and pass the Pokemon object
    pokemonRepository.addListItem(pokemon);
});

