//Imports
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import CountryApiService from './js/fetch-countries'
import getRefs from './js/getRefs';
import './css/styles.css';

// Variables
const refs = getRefs();
const DEBOUNCE_DELAY = 300;
const countryApiService = new CountryApiService();

// Listener
refs.input.addEventListener('input', debounce(handlerInputSearch, DEBOUNCE_DELAY));


// Functions
async function handlerInputSearch(e) {
  countryApiService.country = e.target.value.toLowerCase().trim();
  
  if (!countryApiService.country) resetCountryList();
  
  try {
    const getCountries = await countryApiService.fetchCountries();
    const appendMarkup = await appendCountriesMarkup(getCountries)
    return appendMarkup;    
  } catch (error) {
    Notiflix.Notify.failure("Oops, there is no country with that name")
  }
    
    // .then(appendCountriesMarkup).catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"))
}

function appendCountriesMarkup(data) {
  resetCountryList();

   if (data.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
   }
  
  if (data.length >= 2 && data.length <= 10) {
    markupCountryList(data)
  }
  
  if (data.length === 1) {
    markupCountryInfo(data)
  } 
}

function markupCountryList(array) {
  const markup = array.map(({ name, flags }) => `<li> <img class="img_flag" src="${flags.svg}" alt="${name.official}"> ${name.common}</li>`).join('');
    
  refs.list.innerHTML = markup;
}

function markupCountryInfo(arr) {
  const markup = arr.map(({ name, flags, capital, population, languages }) => /*html*/ `
    <ul>
      <li><img class="img_flag" src="${flags.svg}" alt="${name.official}"> ${name.common}</li>
      <li>Capital: ${capital}</li>
      <li>Population: ${population}</li>
      <li>Languages: ${Object.values(languages).join(', ')}</li>
    </ul>`).join('');
    
  refs.countryInfo.innerHTML = markup;
}

function resetCountryList() {
  refs.list.innerHTML = '';
  refs.countryInfo.innerHTML = ''; 
}

//Notify init
Notiflix.Notify.init({
  timeout: 2000,
});