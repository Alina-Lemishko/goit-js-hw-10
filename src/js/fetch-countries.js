const BASE_URL = 'https://restcountries.com';

export default class CountryApiService {
  constructor() {
    this.name = '';
  }

  async fetchCountries() {
    try {
      const response = await fetch(`${BASE_URL}/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`);
      const json = await response.json();
      if (!response.ok) {
         throw new Error(response.status);
       }
      return json;

    } catch (error) {
      console.log(error)
    }
  }

  get country() {
    return this.name;
  }

  set country(newName) {
    this.name = newName;
  }
}
