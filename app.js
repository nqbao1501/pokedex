let searchBtn = document.getElementById('search-button');
let closeBtn = document.getElementById('close');
let modalContainer = document.getElementById('output');

const searchInput = document.getElementById("search-input");
const pokemon_name = document.getElementById("pokemon_name");
const pokemon_id = document.getElementById("pokemon_id");
const spriteContainerFront = document.getElementById("sprite_container_front");
const spriteContainerBack = document.getElementById("sprite_container_back");
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById("search-form")
//modal stuff

searchBtn.addEventListener('click',function(){
    resetDisplay();
    modalContainer.style.display = 'block';

});
closeBtn.addEventListener('click',function(){
    modalContainer.style.display = 'none';
    resetDisplay();
})
window.addEventListener('click',function(e){
    if (e.target === modalContainer)
    {
        modalContainer.style.display = 'none';
    }
})
searchForm.addEventListener('submit', e => {
    e.preventDefault();
});

const getSprite = (data, sprite_type, destination) =>
{
    var imgElement = document.createElement("img");
    // Set the src attribute (URL of the image)
    imgElement.setAttribute("src", data.sprites[sprite_type]);
    imgElement.setAttribute("class", "addedSprite");
    
    
    // Set other attributes (optional)
    imgElement.setAttribute("width", "100%");
    imgElement.setAttribute("height", "100%");
    imgElement.setAttribute("object-fit", "cover");
    imgElement.setAttribute("background-color", "#F2F2F2");


     // Set the width

     destination.appendChild(imgElement)

}
function addLeadingZeros(num) {
    return String(num).padStart(4, '0');
}
//logic stuff
const getPokemon = async () => {
    try {
      const pokemonNameOrId = searchInput.value.toLowerCase();
      console.log(pokemonNameOrId);
      const response = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
      );
      const data = await response.json();
      pokemon_name.textContent = `${data.name.toUpperCase()}`;
      num = addLeadingZeros(data.id);
      pokemon_id.textContent += ` #${num}`;
      getSprite(data,"front_default",spriteContainerFront);
      getSprite(data,"back_default",spriteContainerBack);
    
      hp.textContent = data.stats[0].base_stat;
      attack.textContent = data.stats[1].base_stat;
      defense.textContent = data.stats[2].base_stat;
      specialAttack.textContent = data.stats[3].base_stat;
      specialDefense.textContent = data.stats[4].base_stat;
      speed.textContent = data.stats[5].base_stat;

      weight.textContent += `Weight: ${data.weight}`;
      height.textContent += `Height: ${data.height}`;
  
      types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');
    }
catch(err)
{
    console.log(err);
}
};


document.addEventListener('DOMContentLoaded', function() {
    searchBtn.addEventListener('click', getPokemon);
});


const resetDisplay = () => {
    let sprite = document.getElementsByClassName("addedSprite")
    for (let i = 0; i < sprite.length; i++) {
        console.log(i);
        if (sprite[i]) sprite[i].remove();
    }
    // reset stats
    pokemon_name.textContent = '';
    pokemon_id.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
  };