let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);
    }
  
    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          // Add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types.map(typeInfo => typeInfo.type.name);
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon.name, `Height: ${pokemon.height / 10}m`, pokemon.imageUrl); // Height is in decimeters
      });
    }
  
    function showModal(title, text, imageUrl) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;
  
      let imageElement = document.createElement('img');
      imageElement.classList.add('pokemon-image');
      imageElement.src = imageUrl;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  
    // Close modal on ESC key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.querySelector('#modal-container').classList.contains('is-visible')) {
        hideModal();
      }
    });
  
    // Close modal on clicking outside of it
    document.querySelector('#modal-container').addEventListener('click', (e) => {
      if (e.target === document.querySelector('#modal-container')) {
        hideModal();
      }
    });
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });