export default class CountryApiService {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`)
      .then(response => {
        if (!response.ok) {
         throw new Error(response.status);
        }
        return response.json()});
  }

  get country() {
    return this.name;
  }

  set country(newName) {
    this.name = newName;
  }
}
