import { WritersSection } from "./writers-section";
import { useState } from "react";
import { Select } from "../../components/select";
import { adaptCountries } from "../../utils/adapters";
import { useGetCountries } from "../../hooks/graphql/use-get-countries";

export default function Writers() {
  const { data, error, loading } = useGetCountries();

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
