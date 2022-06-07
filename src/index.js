import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import CountryApiService from './js/fetch-countries'
import './css/styles.css';


const DEBOUNCE_DELAY = 300;

const countryApiService = new CountryApiService();

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(handlerInputSearch, DEBOUNCE_DELAY));

function handlerInputSearch(e) {
  countryApiService.country = e.target.value.toLowerCase().trim();

  countryApiService.fetchCountries().then(appendCountriesMarkup).catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"))
}

function appendCountriesMarkup(data) {
  resetCountryList();

  if (data.length >= 2 && data.length <= 10) {
    markupCountryList(data)
  } else if (data.length === 1) {
    markupCountryInfo(data)
  } else {
    rejected
  }
}

function markupCountryList(array) {
  const markup = array.map(({ name, flags }) => `<li> <img class="img_flag" src="${flags.svg}" alt="${name.official}"> ${name.common}</li>`).join('');
    
  list.innerHTML = markup;
}

function markupCountryInfo(arr) {
  const markup = arr.map(({ name, flags, capital, population, languages }) => /*html*/ `
    <ul>
      <li><img class="img_flag" src="${flags.svg}" alt="${name.official}"> ${name.common}</li>
      <li>Capital: ${capital}</li>
      <li>Population: ${population}</li>
      <li>Languages: ${Object.values(languages)}</li>
    </ul>`).join('');
    
  countryInfo.innerHTML = markup;
}

function resetCountryList() {
  list.innerHTML = '';
  countryInfo.innerHTML = ''; 
}

Notiflix.Notify.init({
  timeout: 1000,
});