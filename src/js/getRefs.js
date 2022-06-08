export default function getRefs() {
  return {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };
}