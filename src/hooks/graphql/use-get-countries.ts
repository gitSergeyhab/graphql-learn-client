import { useQuery } from "@apollo/client";
import { Country } from "../../types/country";
import { GET_COUNTRIES } from "../../graphql/countries";

export const useGetCountries = () =>
  useQuery<{ countries: Country[] }>(GET_COUNTRIES);
