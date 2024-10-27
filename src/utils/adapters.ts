import { Country } from "../types/country";
import { Option } from "../types/ui";

export const adaptCountry = (country: Country): Option => ({
  label: country.name,
  value: country.name,
});

export const adaptCountries = (countries: Country[]): Option[] =>
  countries.map(adaptCountry);
