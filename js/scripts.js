// PokemonRepository Module
var pokemonRepository = (function() {
    var pokemonList = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    function addListItem(pokemon) {
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = pokemon.name; // Hier wird der Name des Pokémons als Text für die Schaltfläche festgelegt
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        var pokemonListElement = document.querySelector('.pokemon-list');
        pokemonListElement.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                json.results.forEach(function(item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function(error) {
                console.error('Error loading Pokemon list:', error);
            });
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function(error) {
                console.error('Error loading Pokemon details:', error);
            });
    }

    return {
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        getAll: getAll
    };
})();

// Load Pokemon list and render
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});