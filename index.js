const noSunIcon = require('./images/icons/no-sun.svg');
const lowSunIcon = require('./images/icons/low-sun.svg');
const oneDropIcon = require('./images/icons/1-drop.svg');
const twoDropIcon = require('./images/icons/2-drops.svg');
const threeDropIcon = require('./images/icons/3-drops.svg');
const petIcon = require('./images/icons/pet.svg');
const toxicIcon = require('./images/icons/toxic.svg');

function generateSunsIcons(sunStatus) {
  if (sunStatus === 'low'){
    return lowSunIcon;
  } if (sunStatus === 'no') {
    return noSunIcon;
  }
}

function generateWaterIcon(waterStatus) {
  if (waterStatus === 'rarely'){
    return oneDropIcon;
  } if (waterStatus === 'daily') {
    return twoDropIcon;
  } else {
    return threeDropIcon;
  }
}

function createPlants (array) {
  return  `<div class="plants">
  ${array.map((plant) => {
    return `
    <div class="plant">
      ${plant.staff_favorite ? `<div class="staff"> Staff favorite </div>` : ``}
      <div>
        <img id="plant-img" src="${plant.url}" alt="${plant.name}">
        <h3>${plant.name}</h3>
        <div>
          <p>$${plant.price}</p>
          <img src="${plant.toxicity ? toxicIcon : petIcon  }" alt="${plant.toxicity ? "toxic": "not-toxic"}">
          <img src="${generateSunsIcons(plant.sun)}" alt="${plant.sun}">
          <img src="${generateWaterIcon(plant.water)}" alt="${plant.water}">
        </div>
      </div>
    </div>`
  }).join(' ')}
  </div>`
}

function invertDisplay() {
  const noresultPlants = document.getElementById('result-section-1');
  const resultPlants = document.getElementById('result-section-2');

  noresultPlants.style = 'display: none';
  resultPlants.style = 'display: block';
}

function revertDisplay() {
  const noresultPlants = document.getElementById('result-section-1');
  const resultPlants = document.getElementById('result-section-2');

  noresultPlants.style = 'display: flex';
  resultPlants.style = 'display: none';
}

function createPlantsElement(plantsarray) {
  const plants = document.getElementById('plants-results');

  if(plantsarray.length > 0) {
    plants.innerHTML = createPlants(plantsarray);
  }
  if(plantsarray.error) {
    revertDisplay();
  }
}

function fetchPlantsApi (sun, water, pet) {
  if(sun !== '' && water !== '' && pet !== '') {
    fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pet}`)
    .then(request => request.json())
    .then(response => createPlantsElement(response));

    window.scrollTo(0, document.body.scrollHeight);
    invertDisplay();
  }
}

window.onload = () => {

  const sunSelect = document.getElementById('sunlight');
  const waterSelect = document.getElementById('watering');
  const petSelect = document.getElementById('pets');
  
  function onSelectValue() {
    const sunValue =  sunSelect.value;
    const waterValue =  waterSelect.value;
    const petValue =  petSelect.value;

    fetchPlantsApi(sunValue, waterValue, petValue);
  }

  
  sunSelect.addEventListener('change', onSelectValue);
  waterSelect.addEventListener('change',onSelectValue);
  petSelect.addEventListener('change', onSelectValue);

  const pageUpButton = document.getElementById('page-up');

  function pageUp () {
    window.scrollTo(0, 0);
  }

  pageUpButton.addEventListener('click', pageUp)

}

