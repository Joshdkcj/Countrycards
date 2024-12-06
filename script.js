// Model
const state = {
countries: [],
neighbors: [],
};

  

//Controller
const loadCountries = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((Response)=> Response.ok? Response.json() : null)
    .then((date)=>{
        if(date){        
            state.countries=date;
            renderView(state);}

    })
};


  
const loadBoardersByCountryCode=(countryCode) => {
    const targetCountry=state.countries.find(country=>country.cca3===countryCode);
    if(targetCountry && targetCountry.borders){
        loadNeighbors(targetCountry.borders);
    }
};


  

const loadNeighbors=(code)=>{
    const codesStr=code.join(',');
    fetch(`https://restcountries.com/v3.1/alpha?codes=${codesStr}`)
    .then((resp)=>resp.ok? resp.json() : null)
    .then((date)=>{
    state.neighbors=date;
    renderView(state);
});
};


  

//View
const createCountryNode=(country)=>{
    const countryContainer=document.createElement('div');
    countryContainer.className='country';
    countryContainer.id=country.cca3;

    countryContainer.innerHTML = `      
    <img class="country__img" src="${country.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${country.population}</p>
        <p class="country__row"><span>🗣️</span>LANG</p>
        <p class="country__row"><span>💰</span>CUR</p>
      </div>`;
      return countryContainer;
};


const renderView=(state)=>{
    const countriesContainer = document.querySelector('.countries');
    countriesContainer.innerHTML= '';

    state.countries.forEach((country)=>{
    const node = createCountryNode(country);
    countriesContainer.append(node);
    });

    const neighborsContainer=document.querySelector('.neighbors');
    neighborsContainer.innerHTML=' ';

    state.neighbors.forEach((neighbors)=>{
    const node=createCountryNode(neighbors);
    neighborsContainer.append(node);
    });
};



//event Binding
const searchInput=document.querySelector('#input');
const searchBtn=document.querySelector('.search');

searchBtn.addEventListener('click', ()=>{
    const name=searchInput.value;
    loadCountries(name);
});





const countriesContainer=document.querySelector('.countries');

countriesContainer.addEventListener('click',(e)=>{
const countriesContainer=e.target.closest('.country');
if (countriesContainer)
{ const countryCode=countriesContainer.id;
    loadBoardersByCountryCode(countryCode);
}
});









