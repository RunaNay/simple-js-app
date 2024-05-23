let pokemonRepository = (function () {
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
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(item) {
        pokemonList.push(item);
    }

    function getAll () {
        return pokemonList;
    }

    function showDetails (pokemon) {
        console.log(pokemon);
    }

    function addListItem (pokemon) {
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
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    return {
        loadDetails: loadDetails,
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});