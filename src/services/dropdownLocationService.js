import { Country, State, City } from "country-state-city";

export function getCountries() {
  let countries = Country.getAllCountries();
  return countries.map((country) => ({
    _id: country.isoCode,
    name: country.name,
  }));
}

export function getStatesOfCountry(country) {
  if (country) {
    let selectedCountry = Country.getAllCountries().filter(
      (c) => c.name === country
    );
    if (selectedCountry.length > 0) {
      let states = State.getStatesOfCountry(selectedCountry[0].isoCode);
      return states.map((country) => ({
        _id: country.isoCode,
        name: country.name,
      }));
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export function getCitiesOfState(state) {
  if (state) {
    let selectedState = State.getAllStates().filter((s) => s.name === state);
    if (selectedState.length > 0) {
      let cities = City.getCitiesOfState(
        selectedState[0].countryCode,
        selectedState[0].isoCode
      );
      //@ts-ignore
      cities = cities.map((state, i) => ({
        _id: i.toString(),
        name: state.name,
      }));
      return cities;
    } else {
      return [];
    }
  } else {
    return [];
  }
}
