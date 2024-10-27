import { useQuery } from "@apollo/client";
import { WritersSection } from "./writers-section";
import { GET_COUNTRIES } from "../../graphql/countries";
import { Country } from "../../types/country";
import { useState } from "react";
import { Select } from "../../components/select";
import { adaptCountries } from "../../utils/adapters";

export default function Writers() {
  const { data, error, loading } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );

  const [country, setCountry] = useState<string>();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  const options = [
    { value: "", label: "All" },
    ...adaptCountries(data.countries),
  ];

  return (
    <>
      <h1>Authors</h1>
      <Select onSelect={setCountry} options={options} />
      <WritersSection country={country} />
    </>
  );
}
