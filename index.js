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
      createPlantsElement();
    }
  }
  
  sunSelect.addEventListener('change', onSelect);
  waterSelect.addEventListener('change',onSelect);
  petSelect.addEventListener('change', onSelect);

  function createPlants () {
    return  `<div class="plants">
    ${plantList.map((plant) => {
      return `
      <div class="plant">
        <h1>${plant.name}</h1>
        
      </div>`
    })}
    </div>`
  }

  function createPlantsElement() {
    const plants = document.getElementById('plants-results');

    if(plantList.length > 0) {
      plants.innerHTML = createPlants();
    }
  }

  
}  
