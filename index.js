const noSunIcon = require('./images/icons/no-sun.svg');
const lowSunIcon = require('./images/icons/low-sun.svg');
const oneDropIcon = require('./images/icons/1-drop.svg');
const twoDropIcon = require('./images/icons/2-drops.svg');
const threeDropIcon = require('./images/icons/3-drops.svg');
const petIcon = require('./images/icons/pet.svg');
const toxicIcon = require('./images/icons/toxic.svg');

let plantList = [];

function fetchFromAPi(sun, water, havePet) {
  fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${havePet}`)
  .then(request => request.json())
  .then(response => plantList = response);
}

window.onload = () => {
  console.log(plantList)
  const sunSelect = document.getElementById('sunlight');
  const waterSelect = document.getElementById('watering');
  const petSelect = document.getElementById('pets');
  
  function onSelect() {
    const sunValue = sunSelect.value;
    const waterValue = waterSelect.value;
    const petValue = petSelect.value;
    if(sunValue !== '' && waterValue !== '' && petValue !== '') {
      fetchFromAPi(sunValue, waterValue, petValue);
      plantList.join(' ')
      createPlantsElement();
    }
  }
  
  sunSelect.addEventListener('change', onSelect);
  waterSelect.addEventListener('change',onSelect);
  petSelect.addEventListener('change', onSelect);

  function sunsIcons(sunStatus) {
    if(sunStatus === 'low'){
      return lowSunIcon;
    } if(sunStatus === 'no') {
      return noSunIcon;
    }
  }

  function waterIcon(waterStatus) {
    if(waterStatus === 'rarely'){
      return oneDropIcon;
    } if(waterStatus === 'daily') {
      return twoDropIcon;
    } else{
      return threeDropIcon;
    }
  }

  function createPlants () {

    return  `<div class="plants">
    ${plantList.map((plant) => {
      return `
      <div class="plant">
        ${plant.staff_favorite ? `<div> Staff favorite </div>` : ``}
        <div>
          <img src="${plant.url}" alt="${plant.name}">
          <h3>${plant.name}</h3>
          <p>$${plant.price}</p>
        </div>
        <div>
          <img src="${plant.toxicity ? petIcon : toxicIcon}" alt="${plant.toxicity}">
          <img src="${sunsIcons(plant.sun)}" alt="${plant.sun}">
          <img src="${waterIcon(plant.water)}" alt="${plant.water}">
        </div>
      </div>`
    }).join(' ')}
    </div>`
  }


  function createPlantsElement() {
    const plants = document.getElementById('plants-results');

    if(plantList.length > 0) {
      plants.innerHTML = createPlants();
    }
  }

}

