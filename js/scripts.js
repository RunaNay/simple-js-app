let pokemonRepository = (function() {
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');
  
    function add(pokemon) {
      repository.push(pokemon);
    }
  
    function getAll() {
      return repository;
    }
  
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button'); // Klasse hinzufügen
      button.addEventListener('click', () => {
        showDetails(pokemon);
      });
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
    }
  
    function loadList() {
      return fetch(apiUrl).then(response => response.json()).then(json => {
        json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(e => {
        console.error(e);
      });
    }
  
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(response => response.json()).then(details => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
      }).catch(e => {
        console.error(e);
      });
    }
  
    function showModal(title, text, imgSrc) {
      console.log("Showing modal with title: " + title); // Debugging
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
      imageElement.src = imgSrc;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      console.log("Hiding modal"); // Debugging
      modalContainer.classList.remove('is-visible');
    }
  
    function showDetails(pokemon) {
      console.log("Showing details for: " + pokemon.name); // Debugging
      loadDetails(pokemon).then(() => {
        showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
      });
    }
  
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
  
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });